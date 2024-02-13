# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

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
