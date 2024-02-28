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
