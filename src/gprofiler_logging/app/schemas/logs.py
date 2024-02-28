

from datetime import datetime

from pydantic import BaseModel, Field


class LogMetadata(BaseModel):
    env: str
    service_name: str
    hostname: str
    public_ip: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
