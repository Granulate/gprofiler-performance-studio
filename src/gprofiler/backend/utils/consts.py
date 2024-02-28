

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
