# Intro
gProfiler flamedb rest is a service
that handles communication with ClickHouse to build flamegraphs.


# Build notes
To build the application, please use the following command:

```shell
make build
```

To build a docker image type:

```shell
make docker-build
```

# Run flamedb rest
To run flamedb rest locally, you need a running clickhouse on port 9000.


Now you can run flamedb rest:

```shell
./rest-flamedb
```
