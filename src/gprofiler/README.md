# Performance studio backend and frontend

## Running the backend locally
### Pre-requisites
- Python 3.12 or higher is installed on your machine.
- Running `deploy/docker-compose.yml` without the webapp service - that way you will be covered with all the dependencies, like databases and other services.

Now we need to install the dependencies:
```shell
cd src/gprofiler
pip install -e ../gprofiler-dev[postgres]
pip install -e .
```

### Running the backend
To run the backend, you need to set the following environment variables:
- `BUCKET_NAME` - S3 bucket name
- `QUERY_API_BASE_URL` - running `src/gprofiler_flamedb_rest` http://localhost:8080
- `SQS_INDEXER_QUEUE_URL` - SQS queue name
- `GPROFILER_POSTGRES_DB_NAME`
- `GPROFILER_POSTGRES_PORT`
- `GPROFILER_POSTGRES_HOST`
- `GPROFILER_POSTGRES_USERNAME`
- `GPROFILER_POSTGRES_PASSWORD`
- `APP_LOG_FILE_PATH` - path to the application log file
- `APP_LOG_LEVEL`
- `AWS_METADATA_SERVICE_NUM_ATTEMPTS` - number of attempts to get the AWS credentials
- `REDIRECT_DOMAIN` - domain name for the installation instruction generation in UI
- `SQS_ENDPOINT_URL` - SQS endpoint URL, by default `https://sqs.${AWS_REGION}.amazonaws.com`
- `AWS_ACCESS_KEY_ID` - AWS credentials, if empty is taken from the metadata service
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`

Now you can run the backend:
```shell
python3 -m uvicorn backend.main:app --reload --port 8000
```

## Running the frontend locally
```shell
cd src/gprofiler/frontend
yarn install
yarn start
```