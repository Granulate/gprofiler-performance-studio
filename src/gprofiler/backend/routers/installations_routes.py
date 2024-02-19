# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

import io
from logging import getLogger

import yaml
from backend.models.installation_models import FileType
from backend.utils.download_external import get_daemon_set_template
from backend.utils.installation_utils import get_installation_file_download
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import StreamingResponse
from gprofiler_dev.postgres.db_manager import DBManager

logger = getLogger(__name__)

router = APIRouter()


@router.get("/daemon_set/file", responses={"200": {"content": {"text/yaml": {}}}})
def get_daemon_set(
    namespace: str,
    service_name: str = Query(..., alias="serviceName"),
):
    db_manager = DBManager()
    token = db_manager.get_profiler_token()
    try:
        daemon_set_config = get_daemon_set_template(token=token, service_name=service_name)
    except Exception:
        msg = "Failed to get DaemonSet template"
        logger.exception(msg)
        raise HTTPException(502, msg)
    try:
        daemon_set_config.gprofiler["metadata"]["namespace"] = namespace
        daemon_set_config.namespace["metadata"]["name"] = namespace
        full_daemon_set = yaml.dump_all([daemon_set_config.namespace, daemon_set_config.gprofiler])
        daemon_set_stream = io.BytesIO(full_daemon_set.encode("utf-8"))
    except Exception:
        msg = "DaemonSet template bad format"
        logger.exception("DaemonSet template bad format")
        raise HTTPException(502, msg)
    return StreamingResponse(
        daemon_set_stream,
        media_type="text/yaml",
        headers={"Content-Disposition": "attachment; filename=gprofilerDaemonSet.yml"},
    )


@router.get("/{file_type}/file", responses={"200": {"content": {"text/plain": {}}}})
def get_installation_file(file_type: FileType, service_name: str = Query(..., alias="serviceName")):
    return get_installation_file_download(file_type, service_name)
