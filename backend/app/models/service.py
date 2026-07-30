from sqlalchemy import Column, Integer, String, Text, Boolean

from app.database import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False)
    short_description = Column(String(300))
    description = Column(Text)
    icon = Column(String(100))
    image_url = Column(String(500))
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)
