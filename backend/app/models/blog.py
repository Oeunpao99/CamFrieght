from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean

from app.database import Base


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    slug = Column(String(300), unique=True, nullable=False)
    excerpt = Column(Text)
    content = Column(Text)
    category = Column(String(100))
    author = Column(String(100), default="admin")
    image_url = Column(String(500))
    is_published = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
