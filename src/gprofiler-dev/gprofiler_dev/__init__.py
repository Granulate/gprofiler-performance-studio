

from functools import lru_cache

from gprofiler_dev.s3_profile_dal import S3ProfileDal


@lru_cache(maxsize=1)
def get_s3_profile_dal(logger):
    return S3ProfileDal(logger)
