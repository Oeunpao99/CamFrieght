# Cam Freight Services

Logistics company website rebuilt with React + Tailwind CSS frontend, FastAPI Python backend, and AI chatbot integration.

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS + React Router
- **Backend**: Python FastAPI + SQLAlchemy + Alembic
- **AI**: OpenAI API-powered chatbot widget
- **Database**: PostgreSQL + Redis
- **Infrastructure**: Docker Compose

## Quick Start (Development)

### 1. Start infrastructure services (PostgreSQL, Redis, pgAdmin)

```bash
docker compose -f docker-compose-dev.yml up -d
```

### 2. Set up backend

```bash
cd backend
cp .env.example .env
# Edit .env with your OPENAI_API_KEY
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

### 3. Set up frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173, API at http://localhost:8000.

### 4. Access pgAdmin

http://localhost:5050 (admin@camfreight.com / admin)

## Production Deployment

```bash
docker compose up -d --build
```

The application will be available at http://localhost:80.

## Project Structure

```
CamFight/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app entry point
│   │   ├── config.py        # Settings / env config
│   │   ├── database.py      # SQLAlchemy setup
│   │   ├── models/          # DB models (service, blog, contact, chat)
│   │   ├── routes/          # API routes (services, blog, contact, chat)
│   │   ├── services/        # Business logic (AI chat service)
│   │   └── schemas/         # Pydantic schemas
│   ├── alembic/             # Database migrations
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages (Home, About, Services, Blog, Contact)
│   │   ├── App.jsx          # Router setup
│   │   └── main.jsx         # Entry point
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml       # Production stack
└── docker-compose-dev.yml   # Dev infrastructure (db, redis, pgadmin)
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |
| `OPENAI_API_KEY` | OpenAI API key for AI chatbot |
| `OPENAI_MODEL` | OpenAI model name (default: gpt-4o-mini) |
| `CORS_ORIGINS` | Comma-separated allowed origins |
