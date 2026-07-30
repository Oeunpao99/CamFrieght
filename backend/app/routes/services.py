from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.service import Service

router = APIRouter(prefix="/api/services", tags=["services"])


@router.get("")
def list_services(db: Session = Depends(get_db)):
    services = db.execute(
        select(Service).where(Service.is_active == True).order_by(Service.order)
    ).scalars().all()
    return services


@router.get("/{slug}")
def get_service(slug: str, db: Session = Depends(get_db)):
    service = db.execute(
        select(Service).where(Service.slug == slug)
    ).scalar_one_or_none()
    return service
