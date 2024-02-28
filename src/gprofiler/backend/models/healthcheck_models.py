

from pydantic import BaseModel


class HealthCheck(BaseModel):
    message: str = "ok"
