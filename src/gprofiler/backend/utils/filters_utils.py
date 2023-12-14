# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

from typing import List, Optional

from backend.models.filters_models import FilterTypes, RQLCompareOperators, RQLFilter
from gprofiler_dev.tags import FilterTags


def get_filter_tag_names(filter_tags: FilterTags, service: str) -> List[str]:
    filter_tags_list = filter_tags.list(service)
    return list(set(t[0] for t in filter_tags_list))


def is_filter_tag_exist(filter_tags: FilterTags, filter_name: str, service_name: str) -> bool:
    return filter_name in get_filter_tag_names(filter_tags, service_name)


def get_rql_first_eq_key(rql_filter: Optional[RQLFilter], key: FilterTypes):
    if rql_filter is None:
        return None
    for log_op in rql_filter.filter.values():
        for filter_type in log_op:
            if key.value in filter_type:
                if RQLCompareOperators.eq_op in filter_type[key]:
                    return filter_type[key][RQLCompareOperators.eq_op]


def get_rql_only_for_one_key(rql_filter: Optional[RQLFilter], key: FilterTypes) -> Optional[RQLFilter]:
    if rql_filter is None:
        return None
    new_rql_filter: Optional[RQLFilter] = None
    for log_op, values in rql_filter.filter.items():
        for filter_type in values:
            if key.value in filter_type:
                if new_rql_filter is None:
                    new_rql_filter = RQLFilter(filter={log_op: [filter_type]})
                else:
                    if log_op in new_rql_filter.filter:
                        new_rql_filter.filter[log_op].append(filter_type)
                    else:
                        new_rql_filter.filter[log_op] = [filter_type]
    return new_rql_filter
