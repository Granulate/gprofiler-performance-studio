

from logging import getLogger

from backend.models.api_key_models import ApiKey
from fastapi import APIRouter
from gprofiler_dev.postgres.db_manager import DBManager

logger = getLogger(__name__)
router = APIRouter()


@router.get("", response_model=ApiKey)
def get_api_key():
    db_manager = DBManager()
    token = db_manager.get_profiler_token()
    return ApiKey(api_key=token)
