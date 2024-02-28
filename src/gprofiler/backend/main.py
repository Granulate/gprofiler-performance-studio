

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
