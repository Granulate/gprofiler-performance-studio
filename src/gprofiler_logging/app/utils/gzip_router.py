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



import asyncio
import gzip
import os
from typing import Callable

from fastapi import HTTPException, Request, Response
from fastapi.routing import APIRoute
from starlette import status

CONFIG_MAX_CONTENT_LEN = int(os.environ.get("CONFIG_MAX_CONTENT_LEN", 4 * 1024 * 1024))  # Place a max limit of 4MB


class GzipRequest(Request):
    async def body(self) -> bytes:
        event_loop = asyncio.get_running_loop()
        if not hasattr(self, "_body"):
            body = await super().body()
            if "gzip" in self.headers.getlist("Content-Encoding"):
                body = await event_loop.run_in_executor(None, gzip.decompress, body)
            self._body = body
        return self._body


class GzipRoute(APIRoute):
    def get_route_handler(self) -> Callable:
        original_route_handler = super().get_route_handler()

        async def custom_route_handler(request: Request) -> Response:
            # Content length check is done first thing.
            # Specifically, before `request.json` which reads everything.
            if "content-length" not in request.headers:
                raise HTTPException(status.HTTP_411_LENGTH_REQUIRED)
            content_length = int(request.headers["content-length"])
            if content_length > CONFIG_MAX_CONTENT_LEN:
                raise HTTPException(status.HTTP_413_REQUEST_ENTITY_TOO_LARGE)
            request = GzipRequest(request.scope, request.receive)
            return await original_route_handler(request)

        return custom_route_handler
