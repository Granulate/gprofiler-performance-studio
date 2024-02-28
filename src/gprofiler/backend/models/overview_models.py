

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
