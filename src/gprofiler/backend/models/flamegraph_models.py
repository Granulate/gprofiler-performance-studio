

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
