

from logging import getLogger
from typing import List

from backend.models.overview_models import Overview, OverviewAgents, OverviewService
from fastapi import APIRouter
from gprofiler_dev.postgres.db_manager import DBManager

logger = getLogger(__name__)
router = APIRouter()


@router.get("", response_model=Overview)
def get_overview():
    db_manager = DBManager()
    return db_manager.get_overview_summary()


@router.get(
    "/services",
    response_model=List[OverviewService],
    responses={204: {"description": "Good request, just has no data"}},
)
def get_overview_services():
    db_manager = DBManager()
    return db_manager.get_services_overview_summary()  # type: ignore


@router.get("/services/{service_name}", response_model=List[OverviewAgents])
def get_overview_service(service_name: str):
    db_manager = DBManager()
    service_id = db_manager.get_service_id_by_name(service_name)
    return db_manager.get_agents(service_id)
