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

from backend.models.services_models import Service
from fastapi import APIRouter
from fastapi.responses import Response
from gprofiler_dev.postgres.db_manager import DBManager

logger = getLogger(__name__)
router = APIRouter()


@router.get("", response_model=List[Service], responses={204: {"description": "Good request, just has no data"}})
def get_services():
    db_manager = DBManager()
    services_list = db_manager.get_services_with_data_indication()
    if not services_list:
        return Response(status_code=204)
    return services_list
