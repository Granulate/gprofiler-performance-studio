# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

# source: https://gist.github.com/imankulov/cef71dd5a01f9a27caeb66f7bedaf241
# this module is used due to the fact that FastAPI doesn't support json query validation against model

from typing import Any

import pydantic
from fastapi import Depends, HTTPException, Query
from pydantic import Json, ValidationError


def json_param(param_name: str, model: Any, **query_kwargs):
    """Parse JSON-encoded query parameters as pydantic models.
    The function returns a `Depends()` instance that takes the JSON-encoded value from
    the query parameter `param_name` and converts it to a Pydantic model, defined
    by the `model` attribute.
    """

    def get_parsed_object(value: Json = Query(alias=param_name, **query_kwargs)):
        if value is None:
            return None
        try:
            return pydantic.parse_obj_as(model, value)
        except ValidationError as err:
            raise HTTPException(400, detail=err.errors())

    return Depends(get_parsed_object)
