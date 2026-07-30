from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.contact import ContactInquiry

router = APIRouter(prefix="/api/contact", tags=["contact"])


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    company: str | None = None
    service_interest: str | None = None
    message: str


@router.post("/inquiry")
def submit_inquiry(form: ContactForm, db: Session = Depends(get_db)):
    inquiry = ContactInquiry(**form.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return {"message": "Inquiry submitted successfully", "id": inquiry.id}
