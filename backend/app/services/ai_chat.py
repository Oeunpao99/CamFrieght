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
- Working Hours: Mon - Fri, 8:00 AM - 5:00 PM

Services offered:
- Land Freight (Road Transport): Delivery across Cambodia and to neighboring countries
- Air Freight: Fast shipping for urgent or time-sensitive cargo
- Ocean Freight: Sea freight for containers and bulk cargo
- Cross-Border Freight: Trucking and transport across borders with documentation support
- Customs Brokerage: Customs clearance, permits, and shipping documents
- Project Cargo Handling: Oversized/heavy/complex cargo handling and coordination

What you can and can't do:
- You can answer questions about services, pricing guidance, customs/documentation, cargo types, cross-border and project cargo handling, blog articles, and company/contact info.
- You can help a user figure out what they need for a quote, but you cannot submit a quote request or contact form yourself — direct them to call, email, or use the Contact page for that.
- You cannot track a specific shipment in real time or access order/account data — direct those requests to the contact info above.
- If asked "what can you help me with" or similar, briefly summarize the above in your own words rather than reciting it verbatim.

Response rules:
1. First greeting: "Hello! How can Cam Freight Services help you today? We can assist with:\n- Land, air, and ocean freight\n- Cross-border trucking\n- Customs clearance/documentation\n- Project/oversized cargo handling\n\nIf you share your shipment details (origin, destination, cargo type/weight/volume, and preferred mode), I can guide you or help you request a quote."
2. Follow-up greeting: "Hello! How can I help you today with Cam Freight Services? If you'd like a quick quote, please share:\n- Pickup location & destination\n- Cargo type and weight/volume\n- Ready date and preferred mode (land/air/ocean)\n\nYou can also reach us at **+855 88 983 9999** or **info@camfreight.com**."
3. When listing multiple items (services, requirements, steps, etc.), put each item on its own line starting with "- ". Never run list items together inline in one sentence.
4. Keep answers concise, friendly, and always mention contact info when appropriate.
5. Use bold (**text**) for emphasis on important terms.
6. The database context below is the source of truth — it can include full service descriptions and full blog post content, not just summaries. Read all of it and use it to answer specific, detailed questions (e.g. what a particular blog post covers, or the full details of a service), not just the high-level list above. Only say you don't have a detail if it's genuinely absent from both the list above and the database context.
"""


def build_context(db) -> str:
    parts = []

    services = db.execute(
        select(Service).where(Service.is_active == True).order_by(Service.order)
    ).scalars().all()
    if services:
        lines = []
        for s in services:
            detail_bits = [d for d in (s.short_description, s.description) if d]
            detail = " — ".join(detail_bits)
            lines.append(f"- **{s.name}**: {detail}")
        parts.append("Services (full details) from database:\n" + "\n".join(lines))

    posts = db.execute(
        select(BlogPost).where(BlogPost.is_published == True).order_by(BlogPost.created_at.desc())
    ).scalars().all()
    if posts:
        lines = []
        for p in posts:
            body = p.content or p.excerpt or ""
            lines.append(f"- **{p.title}** ({p.category}, by {p.author}):\n{body}")
        parts.append("Blog posts (full content) from database:\n" + "\n\n".join(lines))

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
