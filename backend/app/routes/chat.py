from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.chat import ChatMessage
from app.services.ai_chat import get_ai_response

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    reply: str
    session_id: str


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    db.add(ChatMessage(session_id=request.session_id, role="user", content=request.message))
    db.commit()

    history = (
        db.query(ChatMessage)
        .where(ChatMessage.session_id == request.session_id)
        .order_by(ChatMessage.created_at)
        .limit(20)
        .all()
    )

    reply = get_ai_response(request.message, history, db=db, session_id=request.session_id)

    db.add(ChatMessage(session_id=request.session_id, role="assistant", content=reply))
    db.commit()

    return ChatResponse(reply=reply, session_id=request.session_id)


@router.get("/history/{session_id}")
def get_history(session_id: str, db: Session = Depends(get_db)):
    messages = (
        db.query(ChatMessage)
        .where(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at)
        .all()
    )
    return messages
