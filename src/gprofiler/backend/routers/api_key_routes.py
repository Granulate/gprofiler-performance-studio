# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

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
