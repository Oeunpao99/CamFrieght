from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.blog import BlogPost

router = APIRouter(prefix="/api/blog", tags=["blog"])


@router.get("/posts")
def list_posts(
    category: str | None = None,
    limit: int = Query(default=10, le=50),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
):
    query = select(BlogPost).where(BlogPost.is_published == True).order_by(BlogPost.created_at.desc())
    if category:
        query = query.where(BlogPost.category == category)
    posts = db.execute(query.offset(offset).limit(limit)).scalars().all()
    return posts


@router.get("/posts/{slug}")
def get_post(slug: str, db: Session = Depends(get_db)):
    post = db.execute(
        select(BlogPost).where(BlogPost.slug == slug)
    ).scalar_one_or_none()
    return post
