from openai import AzureOpenAI
from sqlalchemy import select

from app.config import settings
from app.models.service import Service
from app.models.blog import BlogPost

client = AzureOpenAI(
    api_key=settings.AZURE_OPENAI_API_KEY,
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
    api_version=settings.AZURE_OPENAI_API_VERSION,
)

BASE_PROMPT = """You are a helpful customer support assistant for Cam Freight Services, a logistics and freight forwarding company in Cambodia.

Company info:
- Address: No 85c, 313 Street, Phnom Penh, 12152, Cambodia
- Phone: +855 88 983 9999
- Email: info@camfreight.com

Services offered:
- Land Freight (Road Transport): Delivery across Cambodia and to neighboring countries
- Air Freight: Fast shipping for urgent or time-sensitive cargo
- Ocean Freight: Sea freight for containers and bulk cargo
- Cross-Border Freight: Trucking and transport across borders with documentation support
- Customs Brokerage: Customs clearance, permits, and shipping documents
- Project Cargo Handling: Oversized/heavy/complex cargo handling and coordination

Response rules:
1. First greeting: "Hello! How can Cam Freight Services help you today? We can assist with: - Land, air, and ocean freight - Cross-border trucking - Customs clearance/documentation - Project/oversized cargo handling If you share your shipment details (origin, destination, cargo type/weight/volume, and preferred mode), I can guide you or help you request a quote."
2. Follow-up greeting: "Hello! How can I help you today with Cam Freight Services? If you'd like a quick quote, please share: - Pickup location & destination - Cargo type and weight/volume - Ready date and preferred mode (land/air/ocean) You can also reach us at **+855 88 983 9999** or **info@camfreight.com**."
3. When listing services, list them inline without blank lines between items.
4. Keep answers concise, friendly, and always mention contact info when appropriate.
5. Use bold (**text**) for emphasis on important terms.
6. If additional database context is provided below, use it to supplement your answers. If not, rely on the services listed above.
"""


def build_context(db) -> str:
    parts = []

    services = db.execute(select(Service).where(Service.is_active == True)).scalars().all()
    if services:
        lines = []
        for s in services:
            name = s.name
            desc = s.short_description or s.description or ""
            lines.append(f"- **{name}:** {desc}")
        parts.append("Services from database:\n" + "\n".join(lines))

    posts = db.execute(
        select(BlogPost).where(BlogPost.is_published == True).order_by(BlogPost.created_at.desc()).limit(5)
    ).scalars().all()
    if posts:
        lines = []
        for p in posts:
            lines.append(f"- **{p.title}** ({p.category}): {p.excerpt or ''}")
        parts.append("Recent blog posts:\n" + "\n".join(lines))

    return "\n\n".join(parts) if parts else ""


def get_ai_response(user_message: str, history: list, db=None) -> str:
    if not settings.AZURE_OPENAI_API_KEY:
        return "Thank you for your message. Our team will get back to you shortly. For immediate assistance, please call +855 88 983 9999."

    context = build_context(db) if db else ""
    system_content = BASE_PROMPT
    if context:
        system_content += "\n\nHere is the current data from our database — use this to answer questions:\n" + context

    messages = [{"role": "system", "content": system_content}]
    for msg in history[-10:]:
        messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": user_message})

    response = client.chat.completions.create(
        model=settings.AZURE_OPENAI_DEPLOYMENT,
        messages=messages,
        max_completion_tokens=500,
        temperature=0.7,
    )
    return response.choices[0].message.content
