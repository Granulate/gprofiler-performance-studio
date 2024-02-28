

from backend.routers import (
    api_key_routes,
    filters_routes,
    flamegraph_routes,
    healthcheck_routes,
    installations_routes,
    metrics_routes,
    minesweeper_routes,
    overview_routes,
    profiles_routes,
    services_routes,
)
from fastapi import APIRouter


router = APIRouter()
router.include_router(healthcheck_routes.router, prefix="/v1/health_check", tags=["agent"])
router.include_router(healthcheck_routes.router, prefix="/v2/health_check", tags=["agent"])
router.include_router(flamegraph_routes.router, prefix="/flamegraph", tags=["flamegraph"])
router.include_router(metrics_routes.router, prefix="/metrics", tags=["metrics"])
router.include_router(installations_routes.router, prefix="/installations", tags=["app"])
router.include_router(api_key_routes.router, prefix="/api_key", tags=["auth"])
router.include_router(profiles_routes.router, prefix="/v2/profiles", tags=["agent"])
router.include_router(services_routes.router, prefix="/services", tags=["app"])
router.include_router(filters_routes.router, prefix="/v1/filters", tags=["filters"])
router.include_router(overview_routes.router, prefix="/overview", tags=["overview"])
router.include_router(minesweeper_routes.router, prefix="/snapshots", tags=["snapshots"])
