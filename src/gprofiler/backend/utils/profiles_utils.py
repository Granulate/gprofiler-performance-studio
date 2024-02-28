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



import gzip
import os
import uuid
from datetime import datetime
from typing import Callable

from fastapi import HTTPException, Request, Response
from fastapi.routing import APIRoute
from gprofiler_dev.tags import get_hash_filter_tag
from starlette import status

CONFIG_MAX_CONTENT_LEN = int(os.environ.get("CONFIG_MAX_CONTENT_LEN", 4 * 1024 * 1024))  # Place a max limit of 4MB


class GzipRequest(Request):
    async def body(self) -> bytes:
        if not hasattr(self, "_body"):
            body = await super().body()
            if "gzip" in self.headers.getlist("Content-Encoding"):
                body = gzip.decompress(body)
            self._body = body
        return self._body


class GzipRoute(APIRoute):
    def get_route_handler(self) -> Callable:
        original_route_handler = super().get_route_handler()

        async def custom_route_handler(request: Request) -> Response:
            # Content length check is done first thing.
            # Specifically, before `request.json` which reads everything.
            # TODO probably won't prevent an attacker from sending a valid Content-Length header
            #  and a body bigger than what your app can take
            if "content-length" not in request.headers:
                raise HTTPException(status.HTTP_411_LENGTH_REQUIRED)
            content_length = int(request.headers["content-length"])
            if content_length > CONFIG_MAX_CONTENT_LEN:
                raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE)
            request = GzipRequest(request.scope, request.receive)
            return await original_route_handler(request)

        return custom_route_handler


def get_profile_file_name(profile_start_time: datetime, hostname: str = None, is_gz: bool = False) -> str:
    start_time_iso_format = profile_start_time.replace(microsecond=0).isoformat()
    random_suffix = uuid.uuid4().hex

    if hostname is not None:
        hostname_hash = get_hash_filter_tag(hostname)
        return f'{start_time_iso_format}_{random_suffix}_{hostname_hash}{".gz" if is_gz else ""}'

    return f'{start_time_iso_format}_{random_suffix}{".gz" if is_gz else ""}'
