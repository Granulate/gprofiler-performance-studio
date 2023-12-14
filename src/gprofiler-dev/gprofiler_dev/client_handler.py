# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

from __future__ import annotations

import logging

from gprofiler_dev.s3_profile_dal import S3ProfileDal


logger = logging.getLogger(__name__)


class ClientHandler:

    def __init__(
        self,
        service_name: str,
        service_id: int,
        profile_dal: S3ProfileDal = None,
        **kwargs,
    ):
        self.service_name = service_name
        self.service_id = service_id
        self.profile_dal = S3ProfileDal(**kwargs) if profile_dal is None else profile_dal

    def get_input_dir(self) -> str:
        return self.profile_dal.get_input_dir(self.service_name)

    def register_new_service(self, service_name):
        logger.info(f"new service registered: {service_name}")
        pass
        # track here new service installation

    def join_path(self, *parts) -> str:
        return self.profile_dal.join_path(*parts)

    def download_file(self, src_file_path: str, dest_file_path: str) -> None:
        return self.profile_dal.download_file(src_file_path, dest_file_path)

    def write_file(self, file_path: str, content: bytes) -> None:
        return self.profile_dal.write_file(file_path, content)

    def upload_file(self, local_path: str, dest_path: str) -> None:
        self.profile_dal.upload_file(local_path, dest_path)
