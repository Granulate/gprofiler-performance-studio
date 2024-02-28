

from collections import OrderedDict
from typing import Optional, TypeVar

T = TypeVar("T")


class LRUCache:
    def __init__(self, capacity: int):
        self.cache: OrderedDict = OrderedDict()
        self.capacity = capacity

    def __len__(self):
        return len(self.cache)

    def get(self, key: T) -> Optional[T]:
        if key not in self.cache:
            return None
        else:
            self.cache.move_to_end(key)
            return self.cache[key]

    def put(self, key: T, value: T) -> None:
        self.cache[key] = value
        self.cache.move_to_end(key)
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
