# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

from logging import getLogger
from typing import List

from backend.models.filters_models import FilterTag, FilterTypes, GetRQLFilter, PutRQLFilter, RQLFilter
from backend.models.flamegraph_models import FGParamsBaseModel
from backend.utils.filters_utils import get_filter_tag_names
from backend.utils.request_utils import flamegraph_base_request_params, get_query_response
from fastapi import APIRouter, Depends, Query
from gprofiler_dev.postgres.db_manager import DBManager
from gprofiler_dev.tags import FilterTags

logger = getLogger(__name__)
router = APIRouter()


@router.get("/service/{service_name}", response_model=List[GetRQLFilter])
def get_filters_list_for_service(service_name: str):
    db_manager = DBManager()
    service_id = db_manager.get_service(service_name)
    filters_res = db_manager.get_filters(service_id)
    return [{"id": filter_res["id"], "filter": filter_res["filter_content"]["filter"]} for filter_res in filters_res]


@router.get("", response_model=List[str])
def get_filters_list(service_name: str = Query(..., alias="serviceName")):
    return get_filter_tag_names(FilterTags(), service_name)


@router.post("/service/{service_name}", response_model=int, status_code=201)
def add_filter(service_name: str, rql_filter: RQLFilter):
    db_manager = DBManager()
    service_id = db_manager.get_service(service_name)  # type: ignore
    return db_manager.add_filter(service_id, rql_filter.json())  # type: ignore


@router.put("", status_code=201)
def edit_filter(rql_filter: PutRQLFilter):
    db_manager = DBManager()
    return db_manager.update_filter(rql_filter.id, rql_filter.json())  # type: ignore


@router.delete("/{filter_id}", status_code=204, responses={204: {"description": "Good request, just has no data"}})
def delete_filter(filter_id: int):
    db_manager = DBManager()
    return db_manager.delete_filter(filter_id)  # type: ignore


@router.get("/tags/{filter_type}", response_model=List[FilterTag])
def get_filter_type_values(
    filter_type: FilterTypes,
    fg_params: FGParamsBaseModel = Depends(flamegraph_base_request_params),
):
    return get_query_response(fg_params, lookup_for=filter_type.value)
