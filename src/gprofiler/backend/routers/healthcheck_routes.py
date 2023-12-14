# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

from logging import getLogger

from backend.models.healthcheck_models import HealthCheck
from fastapi import APIRouter, Header, HTTPException
from gprofiler_dev.api_key import get_service_by_api_key

logger = getLogger(__name__)
router = APIRouter()


@router.get("", response_model=HealthCheck)
def get_check(gprofiler_api_key: str = Header(None), gprofiler_service_name: str = Header(None)):
    if gprofiler_api_key and gprofiler_service_name:
        parsed_token, service_name = get_service_by_api_key(gprofiler_api_key, gprofiler_service_name)
        if parsed_token is None:
            raise HTTPException(400, {"message": "Invalid API key"})
    return HealthCheck()


@router.get("/webapp", response_model=HealthCheck)
def get_check_webapp():
    return HealthCheck()
