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
