

from app.routers import health_check, logs
from fastapi import APIRouter

router = APIRouter()
router.include_router(logs.router, prefix="/logs")
router.include_router(health_check.router, prefix="/health_check")
