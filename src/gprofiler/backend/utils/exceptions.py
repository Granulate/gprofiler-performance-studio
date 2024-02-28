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


class StillCollectingError(Exception):
    def __init__(self):
        super().__init__("Collecting profiling data...")


class NotAvailableYetError(Exception):
    def __init__(self, timespan):
        super().__init__(f"Last {timespan} flamegraph is only available after at least an hour of profiling.")


class NoFgFoundAndSwitchError(Exception):
    def __init__(self, timespan):
        super().__init__(
            f"No flamegraph was found for the last {timespan}."
            f" Please resume profiling to display, or switch time selection to show historical data."
        )


class NoFgFoundError(Exception):
    def __init__(self, timespan):
        super().__init__(f"No flamegraph was found for the last {timespan}. Please resume profiling to display.")
