#
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
#

from backend.utils import exceptions
from dateutil.relativedelta import relativedelta

CUSTOM_TIME_RANGE_KEY = "custom"
HOURLY_TIME_RANGE_KEY = "hourly"
DAILY_TIME_RANGE_KEY = "daily"
WEEKLY_TIME_RANGE_KEY = "weekly"

TIME_RANGE_MAPPING = {
    "hourly": {
        "delta": relativedelta(hours=1, minutes=45),
        "no_files_exception": exceptions.StillCollectingError(),
        "no_updated_file_exception": exceptions.NoFgFoundAndSwitchError("hour"),
    },
    "daily": {
        "delta": relativedelta(hours=24, minutes=45),
        "no_files_exception": exceptions.NotAvailableYetError("day"),
        "no_updated_file_exception": exceptions.NoFgFoundAndSwitchError("day"),
    },
    "weekly": {
        "delta": relativedelta(weeks=1, minutes=45),
        "no_files_exception": exceptions.NotAvailableYetError("week"),
        "no_updated_file_exception": exceptions.NoFgFoundError("week"),
    },
}

JSON_SUFFIX = ".json"
