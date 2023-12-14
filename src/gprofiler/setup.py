# INTEL CONFIDENTIAL
# Copyright (C) 2023 Intel Corporation
# This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
# This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

import os

import setuptools
from pkg_resources import parse_requirements

with open(os.path.join(os.path.dirname(__file__), "requirements.txt"), "r") as requirements_txt:
    requirements = [str(requirement) for requirement in parse_requirements(requirements_txt)]

setuptools.setup(
    name="gprofiler",
    version="1.0.0",
    author="gprofiler",
    description="Performance Studio GProfiler",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "Operating System :: OS Independent",
    ],
    install_requires=requirements,
)
