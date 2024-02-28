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
