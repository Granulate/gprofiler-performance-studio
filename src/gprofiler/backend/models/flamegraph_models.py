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

from datetime import datetime
from typing import Dict, List, Optional

from backend.models import CamelModel
from backend.models.common import ServiceName
from backend.models.filters_models import RQLFilter
from pydantic import BaseModel


class FGDateTimeDataRange(CamelModel):
    first_date_time: datetime
    last_date_time: datetime


class FGParamsBaseModel(BaseModel):
    service_name: ServiceName
    start_time: datetime
    end_time: datetime
    filter: Optional[RQLFilter] = None
    function_name: Optional[str] = None


class FGParamsModel(FGParamsBaseModel):
    enrichment: List[str]
    stacks_count: int


class FlameGraph(BaseModel):
    test: str
    value: int
    children: List[Dict]
    exec_time: float
    olap_time: float
    percentiles: Dict
