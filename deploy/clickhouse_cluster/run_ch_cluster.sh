#!/bin/bash

kind create cluster --config kind.yml
kubectl apply -f clickhouse_operator.yaml
kubectl apply -f zookeeper-1-node.yaml
kubectl apply -f clickhouse_server_deploy.yaml

echo "Waiting for at least 3 ClickHouse pods to be in Running state..."
namespace="default"
labelSelector="clickhouse.altinity.com/chi=flame-db-01"
timeout="600"

echo "Namespace: $namespace"
echo "Label Selector: $labelSelector"
echo "Timeout: $timeout seconds"

# Timeout in seconds
end=$((SECONDS+timeout))


while [ $SECONDS -lt $end ]; do
    # Get the status of pods
    pods=$(kubectl get pods -n "$namespace" -l "$labelSelector" -o jsonpath='{.items[*].status.phase}')
    podCount=$(echo $pods | wc -w) # Count the number of pods

    if [ "$podCount" -lt 3 ]; then
        echo "Less than 3 ClickHouse pods are present. Found $podCount pods."
        sleep 5
        continue
    fi

    allReady=true

    for status in $pods; do
        if [ "$status" != "Running" ]; then
            allReady=false
            break
        fi
    done

    if [ "$allReady" = true ]; then
        echo "All ClickHouse pods are running."
        break
    else
        echo "Waiting for all pods to become Running..."
        sleep 5
    fi
done

if [ "$allReady" = false ]; then
    echo "Not all ClickHouse pods are in Running state after $timeout seconds."
    exit 1
fi

kubectl port-forward services/chi-flame-db-01-flame-db-0-0 9000:9000 8123:8123 > /dev/null 2>&1 &
echo "kubectl port forwarding pid = $!"
clickhouse client -u dbuser --password simplePassword --multiquery < ../../src/gprofiler_indexer/sql/create_ch_schema_cluster_mode.sql
