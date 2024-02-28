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



import io
from http.client import HTTPException

import yaml
from backend.models.installation_models import FileType
from backend.utils.download_external import get_k8s_template, get_template
from fastapi.responses import StreamingResponse
from gprofiler_dev.postgres.db_manager import DBManager


def get_installation_file_download(file_type: FileType, service_name: str):
    try:
        db_manager = DBManager()
        token = db_manager.get_profiler_token()
        template_file = None

        match file_type:
            case FileType.ecs:
                template_file = get_template(FileType.ecs, {"<TOKEN>": token, "<SERVICE NAME>": service_name})
            case FileType.ansible:
                template_file = get_template(FileType.ansible, {})
            case FileType.docker_compose:
                template_file = get_template(
                    FileType.docker_compose, {"<TOKEN>": token, "<SERVICE NAME>": service_name}
                )
            case FileType.helm:
                template_file = get_k8s_template(token=token, service_name=service_name)
                full_daemon_set = yaml.dump_all([template_file.namespace, template_file.gprofiler])
                daemon_set_stream = io.BytesIO(full_daemon_set.encode("utf-8"))
                return StreamingResponse(
                    daemon_set_stream,
                    media_type="text/yaml",
                    headers={"Content-Disposition": "attachment; filename=gprofiler.yml"},
                )

        stream = io.BytesIO(template_file.encode("utf-8"))
        return StreamingResponse(
            stream,
            media_type="text/plain",
            headers={"Content-Disposition": "attachment"},
        )

    except Exception:
        msg = f"Failed to get {file_type} template"
        raise HTTPException(502, msg)
