

from datetime import datetime
from io import BytesIO
from logging import getLogger

from backend.models.filters_models import RQLFilter
from backend.models.flamegraph_models import FGDateTimeDataRange, FGParamsBaseModel, FGParamsModel, FlameGraph
from backend.utils.flamegraph_utils import get_file_name, get_svg_file
from backend.utils.json_param import json_param
from backend.utils.request_utils import flamegraph_request_params, get_flamegraph_response, get_query_response
from dateutil.relativedelta import relativedelta
from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse

logger = getLogger(__name__)
router = APIRouter()
CHUNK_SIZE = 1024 * 100


@router.get(
    "/datetime_with_data",
    response_model=FGDateTimeDataRange,
    responses={204: {"description": "Good request, just has no data"}},
)
def get_datetime_with_data(
    service_name: str = Query(None, alias="serviceName"),
    fg_filter: RQLFilter = json_param("filter", RQLFilter, description="RQL format filter", default=None),
):
    end_time = datetime.utcnow()
    start_time = end_time - relativedelta(years=1)
    fg_params = FGParamsBaseModel(service_name=service_name, start_time=start_time, end_time=end_time, filter=fg_filter)
    result = get_query_response(fg_params, lookup_for="time_range")
    return FGDateTimeDataRange(
        first_date_time=result[0] if result else None, last_date_time=result[-1] if result else None
    )


# TODO: response model here is only for documentation purposes (there is no guarantee that it will be the model),
# TODO: but also i can't validate it will be extremely not efficient not the best practice, need to decide if keep it
@router.get(
    "",
    response_model=FlameGraph,
    responses={200: {"content": {"text/plain": {}}}, 204: {"description": "Good request, just has no data"}},
)
def get_flamegraph(fg_params: FGParamsModel = Depends(flamegraph_request_params)):
    response = get_flamegraph_response(fg_params)
    json_file = BytesIO(response.content)
    return StreamingResponse(json_file, media_type="text/plain")


@router.get(
    "/download_svg",
    responses={
        200: {"content": {"application/octet-stream": {}}},
        204: {"description": "Good request, just has no data"},
    },
)
def get_flamegraph_svg(
    fg_params: FGParamsModel = Depends(flamegraph_request_params),
):
    mimetype = "application/octet-stream"  # We want this to be downloaded and not displayed

    svg_file_name = get_file_name(fg_params.start_time, fg_params.end_time, fg_params.service_name)
    response = get_flamegraph_response(fg_params, file_type="collapsed_file")
    svg_flamegraph = get_svg_file(response.text)
    return StreamingResponse(
        svg_flamegraph, media_type=mimetype, headers={"Content-Disposition": f"attachment; filename={svg_file_name}"}
    )
