

from logging import getLogger

from app.schemas.common import Status
from fastapi import APIRouter

logger = getLogger(__name__)
router = APIRouter()


@router.get("", response_model=Status)
async def health_check():
    return Status(status="ok")
