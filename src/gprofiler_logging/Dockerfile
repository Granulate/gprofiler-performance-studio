FROM python:3.12.3

WORKDIR /app
EXPOSE 80

# install dependencies
RUN apt-get update && apt-get install -y bc

# copy minimum requirements for pip
COPY gprofiler-dev/requirements.txt gprofiler-dev/requirements.txt
COPY gprofiler-dev/requirements.txt gprofiler-dev/postgres_requirements.txt
COPY gprofiler-dev/setup.py gprofiler-dev/setup.py
COPY gprofiler_logging/requirements.txt requirements.txt

# run pip
RUN pip install -e ./gprofiler-dev[postgres]
RUN pip install -r requirements.txt
RUN pip install psycopg2==2.9.9

# copy all files
COPY gprofiler-dev gprofiler-dev
COPY gprofiler_logging/app app
COPY gprofiler_logging/run.sh run.sh


RUN useradd -m -s /bin/bash -u 888 non_root && \
    chown -R non_root:non_root /app

USER non_root

CMD ["./run.sh"]
