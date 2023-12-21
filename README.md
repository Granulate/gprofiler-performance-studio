# gProfiler Performance studio 

This project offers a backend and user interface for the [gProfiler agent](https://github.com/Granulate/gprofiler),
featuring advanced flamegraph analysis tools.

For more detailed information, please refer to our [documentation](https://docs.gprofiler.io/).

## Table of Contents

- [System Overview](#system-overview)
- [Usage](#usage)
- [Managing the stack](#managing-the-stack)
- [Local running and development](#local-running-and-development)


## System Overview
![system_overview.png](system_overview.png)
The gProfiler Performance Studio is structured around several key microservices,
each playing a vital role in its functionality:

- `src/gprofiler/backend` - This is the web application backend. It exposes all APIs to the frontend or API users and is responsible for collecting data from agents.
- `src/gprofiler/frontend` - The User Interface of gProfiler, facilitating interaction with the backend.
- `src/gprofiler_indexer` - This service is tasked with collecting raw profiling data from S3 storage and indexing it for ClickHouse, a database management system.
- `src/gprofiler_flamedb_rest` - Handles communication with ClickHouse for the purpose of constructing flamegraphs.
- `src/gprofiler_logging` - Dedicated to collecting logs from agents, ensuring a comprehensive logging system.

This architecture allows for efficient handling and analysis of profiling data, providing users with an intuitive and powerful tool for performance analysis.

### External Dependencies: AWS Services
The gProfiler Performance Studio incorporates specific AWS services as essential components.
These dependencies are:

- Amazon S3 (Simple Storage Service): Used extensively for storing profiling data.

- Amazon SQS (Simple Queue Service): Integral for managing message queues between backend and indexer services.

You are welcome to replace those services with other similar which implement the same API,
like Minio for S3 and RabbitMQ for SQS.

## Usage

### Pre-requisites
Before using the gProfiler Performance Studio, ensure the following:
- You have an AWS account and configure your credentials, as the project utilizes AWS SQS and S3.
- You'll also need to create an SQS queue and an S3 bucket.
- You have Docker and docker-compose installed on your machine.

### Running the stack
To run the entire stack built from source, use the docker-compose project located in the `deploy` directory.

The deploy directory contains:

- `docker-compose.yml` - The Docker compose file.
- `.env` - The environment file where you set your AWS credentials, SQS/S3 names, and AWS region.
- `nginx.conf` - Nginx configuration file used as an entrypoint load balancer.
- `diagnostics.sh`- A script for testing connectivity between services and printing useful information.

To launch the stack, run the following commands in the `deploy` directory:
```shell
cd deploy
docker-compose up -d --build
```

Check that all services are running:
```shell
docker-compose ps
```

You should see something like this
```shell
NAME                               IMAGE                                      COMMAND                  SERVICE               CREATED             STATUS              PORTS       
gprofiler-ps-agents-logs-backend   deploy-agents-logs-backend                 "./run.sh"               agents-logs-backend   17 seconds ago      Up 14 seconds       80/tcp
gprofiler-ps-ch-indexer            deploy-ch-indexer                          "/indexer"               ch-indexer            17 seconds ago      Up 15 seconds       
gprofiler-ps-ch-rest-service       deploy-ch-rest-service                     "/usr/local/bin/app"     ch-rest-service       17 seconds ago      Up 5 seconds        8080/tcp
gprofiler-ps-clickhouse            clickhouse/clickhouse-server:22.8          "/entrypoint.sh"         db_clickhouse         17 seconds ago      Up 14 seconds       0.0.0.0:8123->8123/tcp, 0.0.0.0:9000->9000/tcp, 0.0.0.0:9009->9009/tcp
gprofiler-ps-nginx-load-balancer   nginx:1.23.3                               "/docker-entrypoint.…"   nginx-load-balancer   17 seconds ago      Up 14 seconds       0.0.0.0:8888->80/tcp
gprofiler-ps-postgres              postgres:15.1                              "docker-entrypoint.s…"   db_postgres           17 seconds ago      Up 14 seconds       0.0.0.0:54321->5432/tcp
gprofiler-ps-webapp                deploy-webapp                              "./run.sh"               webapp                17 seconds ago      Up 14 seconds       80/tcp
```

Now You can access the UI by navigating to http://localhost:8888 in your browser
(8888 is the default port, configurable in the docker-compose.yml file).

### SSL Configuration
When accessing the gprofiler UI through the web,
it is important to set up HTTPS to ensure the communication between gprofiler and the end user is encrypted.

Besides the security aspect, this is also required
for the browser to allow the use of some UI features that are blocked by browsers for non-HTTPS connections.


To enable SSL, you need to use the `deploy/https_nginx.conf` file instead of `deploy/nginx.conf`.
In addition, you need to provide the following files:
- `deploy/ssl/cert.pem` - SSL certificate
- `deploy/ssl/key.pem` - SSL key

_See [Self-signed certificate](#self-signed-certificate) for more details._

Here is how it should look in the `deploy/docker-compose.yml` file:
```shell
nginx-load-balancer:
  image: nginx:1.23.3
  container_name: gprofiler-ps-nginx-load-balancer
  restart: always
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - ./https_nginx.conf:/etc/nginx/nginx.conf
    - ./ssl:/etc/nginx/ssl
  depends_on:
    - agents-logs-backend
    - webapp
```

#### Self-signed certificate
If you don't have a certificate, you can generate a self-signed certificate using the following command:
```shell
cd deploy
mkdir -p ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/key.pem -out ssl/cert.pem
```
Pay attention, self-signed certificates are not trusted by browsers and will require you to add an exception.

:bangbang: IMPORTANT: If you are using a self-signed certificate,
you need the agent to trust it,
or to disable the SSL verification by adding `--no-verify` flag to the agent configuration.

For example,
that will run a docker installation agent with self-signed certificate
(that will communicate from docker network to host network):
```shell
docker run --name granulate-gprofiler --restart=always -d --pid=host --userns=host --privileged granulate/gprofiler:latest -cu --token="<token from api or ui>" --service-name="my-super-service" --server-host "https://host.docker.internal" --glogger-server "https://host.docker.internal" --no-verify
```



### Diagnostics
If a service is restarted or stops, run the diagnostics.sh script to check service connectivity:
```shell
./diagnostics.sh
```

If all OK there, take a look at the logs of the service that is not working properly.

For example:
```shell
docker-compose logs --tail=100 nginx-load-balancer
```

Logs are centralized in the `/logs` directory (configurable in `.env`), containing both service and agent logs.

To copy logs to your host:
```shell
docker cp gprofiler-ps-agents-logs-backend:/logs ./logs_from_container
```

### Clustered clickhouse (advanced)
To handle large amounts of data, you can use a clustered ClickHouse setup.

Cluster mode schema is located in `src/gprofiler_indexer/sql/create_ch_schema_cluster_mode.sql` file.

For setting up a ClickHouse cluster, you can choose from several methods.

1. **Basic Cluster Deployment**: [ClickHouse Official Documentation](https://clickhouse.com/docs/en/engines/table-engines/special/distributed/)
2. **Kubernetes Deployment**: [ClickHouse on Kubernetes](https://docs.altinity.com/altinity-clickhouse-operator/quick-start-guide/)
3. **Cloud solutions**

After setting up the cluster,
you need to remove db_clickhouse service from the `deploy/docker-compose.yml` file
and changing `CLICKHOUSE_HOST` in the `.env` file to the cluster address.


## Managing the stack
### Downsampling
If your service becomes overloaded with gProfiler agent requests and struggles to handle the load,
you may need to activate downsampling. 

This can be done at the service level by updating the relevant column in Postgres.

Use the following command
to enable downsampling with a `profiler_sample_threshold` of `0.1` for the service `some-service-name`,
resulting in approximately 10% of service data being dropped.

```shell
source .env  # or export POSTGRES_PASSWORD=<password>
docker exec -t -e PGPASSWORD=$POSTGRES_PASSWORD gprofiler-ps-postgres psql -U $POSTGRES_USER $POSTGRES_DB -c "UPDATE services SET profiler_sample_threshold=0.1 WHERE services.name = 'some-service-name'"
```
Adjust the value to control the amount of data to drop (e.g., setting to 0.5 drops 50% of data).


### Changing ClickHouse Data Retention Policy

To modify the data retention policy in ClickHouse, for instance, changing from the default 30 days to 7 days,
create a file named `ttl_modify.sql` with the following SQL script:
```sql
ALTER TABLE flamedb.samples
    MODIFY TTL "Timestamp" + INTERVAL 7 DAY;

ALTER TABLE flamedb.samples_1hour
    MODIFY TTL "Timestamp" + INTERVAL 7 DAY;

ALTER TABLE flamedb.samples_1hour_all
    MODIFY TTL "Timestamp" + INTERVAL 7 DAY;

ALTER TABLE flamedb.samples_1day_all
    MODIFY TTL "Timestamp" + INTERVAL 7 DAY;

ALTER TABLE flamedb.samples_1day
   MODIFY TTL "Timestamp" + INTERVAL 7 DAY;
```

Then, copy this file to the Docker container and execute it:
```shell
docker cp ttl_modify.sql gprofiler-ps-clickhouse:/ttl_modify.sql
docker exec gprofiler-ps-clickhouse bash -c "cat /ttl_modify.sql | clickhouse-client -mn"
```
Note: Applying new TTL settings may take some time,
as ClickHouse needs to rewrite TTL information for all involved partitions.
This operation is synchronous.

## Local running and development

To develop the project, it may be useful to run each component locally, see relevant README in each service
- [webapp (backend and frontend)](src/gprofiler/README.md)
- [gprofiler_flamedb_rest](src/gprofiler_flamedb_rest/README.md)
- [gprofiler_indexer](src/gprofiler_indexer/README.md)
