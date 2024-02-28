

import os

import setuptools
from pkg_resources import parse_requirements

with open(os.path.join(os.path.dirname(__file__), "requirements.txt"), "r") as requirements_txt:
    requirements = [str(requirement) for requirement in parse_requirements(requirements_txt)]

with open(os.path.join(os.path.dirname(__file__), "postgres_requirements.txt"), "r") as requirements_txt:
    postgres_requirements = [str(requirement) for requirement in parse_requirements(requirements_txt)]

setuptools.setup(
    name="gprofiler_dev",
    version="0.0.1",
    author="gprofiler",
    description="gProfiler main development python package",
    include_package_data=True,
    packages=setuptools.find_packages(),
    classifiers=["Programming Language :: Python :: 3", "Operating System :: OS Independent"],
    install_requires=requirements,
    extras_require={"postgres": postgres_requirements},
)
