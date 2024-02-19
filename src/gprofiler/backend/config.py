# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

import os

CONFIG_PROFILES_ROOTDIR = os.getenv("CONFIG_PROFILES_ROOTDIR", "/data/profiles")
TEMP_DIR = os.getenv("TEMP_FILES_DIR", "/data/temp")
FLAMEGRAPH_PATH = os.getenv("FLAMEGRAPH_PATH", "./FlameGraph")

GPROFILER_API_KEY = "GPROFILER-API-KEY"
GPROFILER_SERVICE_NAME = "GPROFILER-SERVICE-NAME"

APP_LOG_FILE_PATH = os.getenv("APP_LOG_FILE_PATH", "backend-logs/log.log")
APP_LOG_LEVEL = os.getenv("APP_LOG_LEVEL", "DEBUG")

SQS_INDEXER_QUEUE_URL = os.getenv("SQS_INDEXER_QUEUE_URL", "")
# boto3 uses as a default sqs url https://queue.amazonaws.com/
# it's a legacy url and doesn't work with private interface for example, this parameter can control the exact url
SQS_ENDPOINT_URL = os.getenv("SQS_ENDPOINT_URL", None)
QUERY_API_BASE_URL = os.getenv("QUERY_API_BASE_URL")

AWS_DEFAULT_REGION = os.getenv("AWS_DEFAULT_REGION", "us-east-1")
STACKS_COUNT_DEFAULT = int(os.getenv("STACKS_COUNT_DEFAULT", 10000))

REST_VERIFY_TLS = os.getenv("REST_VERIFY_TLS", "TRUE").upper() not in ["FALSE", "0"]
REST_CERTIFICATE_PATH = os.getenv("REST_CERTIFICATE_PATH", REST_VERIFY_TLS)
REST_USERNAME = os.getenv("REST_USERNAME", "")
REST_PASSWORD = os.getenv("REST_PASSWORD", "")

BACKEND_ROOT = os.path.dirname(os.path.realpath(__file__))
