

from datetime import datetime
from typing import Union

from pydantic import BaseModel


class AgentData(BaseModel):
    start_time: datetime
    profile: str
    gpid: Union[str, int]


class ProfileResponse(BaseModel):
    message: str
    gpid: Union[str, int]
