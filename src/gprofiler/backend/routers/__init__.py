# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

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

# TODO in original API there is a prefixes mismatch, the agent use /api/v1, and frontend /api

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
