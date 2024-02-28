

import csv
from io import StringIO


def prepare_csv(data):
    buf = StringIO()
    writer = csv.writer(buf)
    writer.writerows(data)
    buf.seek(0)
    return buf
