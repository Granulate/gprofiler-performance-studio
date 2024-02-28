

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
