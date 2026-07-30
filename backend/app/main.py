from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine
from app.routes import services, blog, contact, chat

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Cam Freight Services API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(services.router)
app.include_router(blog.router)
app.include_router(contact.router)
app.include_router(chat.router)


@app.get("/api/health")
def health():
    return {"status": "ok"}
