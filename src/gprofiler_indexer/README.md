# Intro
Continuous Profiler indexer is a data ingestion service, which ingests callstacks
to the FlameDB.

# Build notes
To build the application, please use the following command:

```shell
make build
```

To build a docker image type:

```shell
make docker-build
```

# Create FlameDB Schema
To create FlameDB schema in ClickHouse, please use the following command: 

```
cat sql/create_ch_schema.sql | clickhouse client -mn
```

# Run indexer
To run indexer locally, you need localstack running, please use the following command:

You may ues localstack to emulate AWS services. To run localstack, please use the following command:


Configure AWS CLI to use localstack:
Add the following to ~/.aws/config:

```
[profile localstack]
region=us-east-1
output=json
endpoint_url = http://localhost:4566
```

Then run localstack:

```shell
docker run --rm -d -p 4566:4566 -e SERVICES=s3,sqs,sqs-query localstack/localstack
```
Also, you need to create sqs queue and s3 bucket. To create sqs queue, please use the following command:

```shell
aws sqs create-queue --queue-name test-queue --endpoint-url=http://localhost:4566 --profile localstack
```

To create s3 bucket, please use the following command:

```shell
aws s3api create-bucket --bucket test --endpoint-url=http://localhost:4566 --profile localstack
```

Now you can run indexer:

```shell
./indexer -sqs-queue test-queue -s3-bucket test -aws-endpoint http://localhost:4566 -aws-region us-east-1 
```

# Run tests

```shell
./run_tests.sh
```

# Notes
Use replace.yaml to define merge rules for callstacks. 
