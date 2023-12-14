# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

from datetime import datetime
from typing import Optional

from backend.models import CamelModel
from backend.models.common import ServiceName


class Overview(CamelModel):
    cores: Optional[int]
    instances: Optional[int]
    services: Optional[int]


class OverviewService(CamelModel):
    agent_version_lowest: Optional[str]
    cores: int
    nodes: int
    create_date: datetime
    env_type: Optional[str]
    last_updated: datetime
    service_id: int
    service_name: ServiceName


class OverviewAgents(CamelModel):
    mac: str
    hostname: str
    processors: int
    version: str
    last_seen: datetime
