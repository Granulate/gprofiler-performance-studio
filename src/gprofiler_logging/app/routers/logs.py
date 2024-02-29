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

import orjson
from app import config, get_logs_handler
from app.schemas.common import Status
from app.schemas.logs import LogMetadata
from app.utils.gzip_router import GzipRoute
from app.utils.logs_handler import LogsHandler
from fastapi import APIRouter, Depends, Header, HTTPException, Request
from gprofiler_dev.api_key import get_service_by_api_key

logger = getLogger(__name__)
router = APIRouter()
# handle all the gzip stuff, including length check and parsing
router.route_class = GzipRoute


@router.post("", status_code=201, response_model=Status)
async def save_logs(
    logs_request: Request,
    logs_handler: LogsHandler = Depends(get_logs_handler),
    gprofiler_api_key: str = Header(None),
    gprofiler_service_name: str = Header(None),
):

    logs = await logs_request.body()
    logs_dict = orjson.loads(logs)
    if "metadata" in logs_dict:
        await logs_handler.write_log(logs_dict["logs"], logs_dict["metadata"])
        return Status(status="ok")
    service_name = get_service_by_api_key(gprofiler_api_key, gprofiler_service_name)

    if not service_name:
        message = f"Invalid GPROFILER_SERVICE_NAME header {gprofiler_service_name}"
        logger.warning(message)
        raise HTTPException(400, message)

    metadata = LogMetadata(
        env=config.env,
        service_name=service_name,
        hostname=logs_request.query_params.get("hostname", ""),
        public_ip=logs_request.headers.get("X-Forwarded-For", logs_request.client.host if logs_request.client else ""),
    )
    await logs_handler.write_log(logs_dict, metadata.dict())
    return Status(status="ok")
