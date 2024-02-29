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
