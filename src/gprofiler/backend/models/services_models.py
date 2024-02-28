

from datetime import datetime
from typing import Optional

from backend.models import CamelModel
from backend.models.common import ServiceName


class Service(CamelModel):
    create_date: datetime
    has_data: bool
    name: ServiceName
    env_type: Optional[str]
    service_id: int
