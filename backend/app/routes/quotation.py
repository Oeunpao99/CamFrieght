import secrets

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models.quotation import QuotationRequest
from app.schemas.quotation import QuotationCreate
from app.services.quotation import save_quotation

router = APIRouter(prefix="/api/quotation", tags=["quotation"])
# auto_error=False + no WWW-Authenticate header on failure: this auth is consumed by our
# own React login form via fetch(), not a browser navigation. Sending a Basic challenge
# header makes Chromium pop its native login dialog on a 401, which hangs any fetch()-based
# login flow (no dialog to dismiss). Returning a plain 401 lets our JS handle it normally.
security = HTTPBasic(auto_error=False)


def verify_admin(credentials: HTTPBasicCredentials | None = Depends(security)) -> str:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing credentials")
    valid_username = secrets.compare_digest(credentials.username, settings.ADMIN_USERNAME)
    valid_password = secrets.compare_digest(credentials.password, settings.ADMIN_PASSWORD)
    if not (valid_username and valid_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return credentials.username


@router.get("")
def list_quotations(db: Session = Depends(get_db), admin: str = Depends(verify_admin)):
    quotations = db.execute(
        select(QuotationRequest).order_by(QuotationRequest.created_at.desc())
    ).scalars().all()
    return quotations


@router.post("")
def create_quotation(payload: QuotationCreate, db: Session = Depends(get_db)):
    quotation = save_quotation(db, payload.model_dump(exclude={"session_id"}), payload.session_id)
    return {"id": quotation.id, "status": "success"}
