

from logging import getLogger

from backend.models.minesweeper_models import Frame, Snapshot, SnapshotFromUI
from fastapi import APIRouter
from gprofiler_dev.postgres.db_manager import DBManager

logger = getLogger(__name__)
router = APIRouter()


@router.get("/{snapshot_id}", response_model=Snapshot)
def get_snapshot(snapshot_id: int):
    db_manager = DBManager()
    snapshot_frames_list = db_manager.get_snapshot(snapshot_id)
    snapshot = Snapshot()
    if snapshot_frames_list:
        snapshot = Snapshot(
            id=snapshot_id,
            start_time=snapshot_frames_list[0].get("start_time"),
            end_time=snapshot_frames_list[0].get("end_time"),
            filter=snapshot_frames_list[0].get("filter_content"),
        )
        snapshot.frames = []

        for snapshot_frame in snapshot_frames_list:
            frame = Frame(
                level=snapshot_frame.get("level"),
                start=snapshot_frame.get("start"),
                duration=snapshot_frame.get("duration"),
            )
            snapshot.frames.append(frame)
    return snapshot


@router.post("", response_model=int, status_code=201)
def create_snapshot(snapshot: SnapshotFromUI):
    db_manager = DBManager()
    service_id = db_manager.get_service_id_by_name(snapshot.service_name)
    filter_content = snapshot.filter.json() if snapshot.filter is not None else None
    return db_manager.create_snapshot(
        service_id,
        filter_content,
        snapshot.start_time,
        snapshot.end_time,
        snapshot.frames,
    )
