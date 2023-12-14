# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

from logging import getLogger

from app.schemas.common import Status
from fastapi import APIRouter

logger = getLogger(__name__)
router = APIRouter()


@router.get("", response_model=Status)
async def health_check():
    return Status(status="ok")
