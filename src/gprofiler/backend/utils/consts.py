# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

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
