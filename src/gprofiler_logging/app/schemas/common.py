

from pydantic import BaseModel


class Status(BaseModel):
    status: str = "ok"
