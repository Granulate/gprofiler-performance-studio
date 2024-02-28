


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
