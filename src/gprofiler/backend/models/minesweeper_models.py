

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
