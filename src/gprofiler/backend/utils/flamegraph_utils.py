

import subprocess
import tempfile
from datetime import datetime
from io import BytesIO
from typing import Optional

from backend.config import FLAMEGRAPH_PATH
from backend.models.filters_models import RQLFilter

TIME_RANGE_MAP = {
    24 * 60 * 60: "daily",
    24 * 60 * 60 * 7: "weekly",
    6 * 60 * 60: "6hour",
    60 * 60: "hourly",
    30 * 60: "30min",
    15 * 60: "15min",
}


def get_svg_file(collapsed_file_data: str):
    _, temp_collapsed_file = tempfile.mkstemp()
    with open(temp_collapsed_file, "w") as file:
        file.write(collapsed_file_data)
    cmd = [f"{FLAMEGRAPH_PATH}/flamegraph.pl --inverted --colors=combined", temp_collapsed_file]
    output = subprocess.check_output(f"{' '.join(cmd)}", shell=True)
    return BytesIO(output)


def get_file_name(
    start_time: datetime,
    end_time: datetime,
    service_name: str,
    suffix: str = "svg",
    rql_filter: Optional[RQLFilter] = None,
):
    delta_in_seconds = int((end_time - start_time).total_seconds())
    file_time_range_name = TIME_RANGE_MAP.get(delta_in_seconds, "custom")
    filter_str = ""
    if rql_filter:
        filter_str = f"_{rql_filter.get_formatted_filter()}"
    file_name = f"{service_name}_{file_time_range_name}{filter_str}.{suffix}"
    return file_name
