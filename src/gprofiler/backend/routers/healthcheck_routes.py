#
# Copyright (C) 2023 Intel Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

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
