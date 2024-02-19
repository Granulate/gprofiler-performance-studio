# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.


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
