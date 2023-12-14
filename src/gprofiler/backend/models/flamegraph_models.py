# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

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
