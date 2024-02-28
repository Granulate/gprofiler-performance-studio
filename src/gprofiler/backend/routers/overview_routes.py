#
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
#

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
