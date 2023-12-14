# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

from datetime import datetime

from backend import routers
from fastapi import FastAPI
from fastapi.responses import JSONResponse, Response
from pydantic.json import ENCODERS_BY_TYPE
from starlette.exceptions import HTTPException as StarletteHTTPException


def format_time(dt: datetime):
    iso_format = dt.isoformat()
    if "+" in iso_format:
        return iso_format.replace("+00:00", "Z") if "+00:00" in iso_format else iso_format
    return iso_format + "Z"


ENCODERS_BY_TYPE[datetime] = lambda dt: format_time(dt)
app = FastAPI(openapi_url="/api/v1/openapi.json", docs_url="/api/v1/docs")


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(_, exc):
    if exc.status_code == 204:
        return Response(status_code=204)
    return JSONResponse(exc.detail, status_code=exc.status_code)


app.include_router(routers.router, prefix="/api")
