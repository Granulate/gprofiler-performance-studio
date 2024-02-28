

from enum import Enum


class FileType(str, Enum):
    ecs = "ecs"
    ansible = "ansible"
    helm = "helm"
    docker_compose = "docker_compose"
