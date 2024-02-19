# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

from datetime import datetime
from typing import Optional

from backend.models import CamelModel
from backend.models.filters_models import RQLFilter


class Frame(CamelModel):
    level: int
    start: int
    duration: int


class Snapshot(CamelModel):
    start_time: Optional[datetime]
    end_time: Optional[datetime]
    frames: Optional[list[Frame]]
    filter: Optional[RQLFilter]


class SnapshotFromUI(Snapshot):
    start_time: datetime
    end_time: datetime
    frames: list[Frame]
    service_name: str
