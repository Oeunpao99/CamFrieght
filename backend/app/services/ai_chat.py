import json

from openai import AzureOpenAI
from sqlalchemy import select

from app.config import settings
from app.models.service import Service
from app.models.blog import BlogPost
from app.services.quotation import save_quotation

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
- You CAN collect a formal quotation request from a customer and submit it for them — see "Quotation requests" below.
- You cannot track a specific shipment in real time or access order/account data — direct those requests to the contact info above.
- If asked "what can you help me with" or similar, briefly summarize the above in your own words rather than reciting it verbatim.

Quotation requests:
- When a customer wants a shipping quote, gather details conversationally using our intake form as a guide — ask a couple of related fields at a time, never dump the whole form as one giant question.
- Fields to collect: company name, contact person, mobile/WhatsApp number, email, shipment type(s) (Air Freight / Sea Freight / Cross Border Trucking / Customs Clearance / Project Cargo), pickup address/city/country, cargo ready date, delivery address/city/country, commodity, number of packages, gross weight (kg), dimensions (L x W x H), total volume (CBM), HS code (if known), cargo value, Incoterm (EXW/FOB/FCA/CIF/CFR/DAP/DDP/Other), whether export and/or import customs clearance is needed, and any special requirements (urgent shipment, dangerous goods, temperature controlled, oversized/project cargo, insurance required, or other).
- Minimum needed before you submit: contact person, a mobile/WhatsApp number, at least one shipment type, pickup country, delivery country, and the commodity. Everything else should be asked for, but don't block submission if the customer doesn't know or wants to skip it — a partial lead is still useful to our sales team.
- Once you have at least the minimum, call the submit_quotation_request function with everything gathered so far.
- After the function result comes back, confirm to the customer what was submitted in a friendly, well-formatted way, let them know our team will follow up, and give them this direct line for quotation follow-ups: **+855 93 688 688** or **ceo@camfreight.com** (www.camfreight.com).

Response rules:
1. First greeting: "Hello! How can Cam Freight Services help you today? We can assist with:\n- Land, air, and ocean freight\n- Cross-border trucking\n- Customs clearance/documentation\n- Project/oversized cargo handling\n\nIf you share your shipment details (origin, destination, cargo type/weight/volume, and preferred mode), I can guide you or help you request a quote."
2. Follow-up greeting: "Hello! How can I help you today with Cam Freight Services? If you'd like a quick quote, please share:\n- Pickup location & destination\n- Cargo type and weight/volume\n- Ready date and preferred mode (land/air/ocean)\n\nYou can also reach us at **+855 88 983 9999** or **info@camfreight.com**."
3. When listing multiple items (services, requirements, steps, etc.), put each item on its own line starting with "- ". Never run list items together inline in one sentence.
   - If you need to group items under a section title (e.g. "Best for", "What we handle"), put the title alone on its own line in **bold** with NO leading dash, then list its items on the following lines each starting with "- ". Leave a blank line between one section and the next. Never prefix a section title itself with "-" — only actual list items get a leading dash.
4. Keep answers concise, friendly, and always mention contact info when appropriate.
5. Use bold (**text**) for emphasis on important terms.
6. The database context below is the source of truth — it can include full service descriptions and full blog post content, not just summaries. Read all of it and use it to answer specific, detailed questions (e.g. what a particular blog post covers, or the full details of a service), not just the high-level list above. Only say you don't have a detail if it's genuinely absent from both the list above and the database context.
"""

QUOTATION_TOOL = {
    "type": "function",
    "function": {
        "name": "submit_quotation_request",
        "description": "Submit a logistics quotation request once the customer has provided at least the minimum required details (contact person, mobile/WhatsApp, shipment type, pickup country, delivery country, commodity). Include every other field the customer has mentioned so far.",
        "parameters": {
            "type": "object",
            "properties": {
                "company_name": {"type": "string"},
                "contact_person": {"type": "string"},
                "mobile_whatsapp": {"type": "string"},
                "email": {"type": "string"},
                "shipment_type": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "enum": ["Air Freight", "Sea Freight", "Cross Border Trucking", "Customs Clearance", "Project Cargo"],
                    },
                },
                "pickup_address": {"type": "string"},
                "pickup_city": {"type": "string"},
                "pickup_country": {"type": "string"},
                "ready_date": {"type": "string", "description": "Cargo ready date, in whatever format the customer gave"},
                "delivery_address": {"type": "string"},
                "delivery_city": {"type": "string"},
                "delivery_country": {"type": "string"},
                "commodity": {"type": "string", "description": "Description of the goods being shipped"},
                "num_packages": {"type": "string"},
                "gross_weight_kg": {"type": "string"},
                "dimensions": {"type": "string", "description": "L x W x H, with units"},
                "total_volume_cbm": {"type": "string"},
                "hs_code": {"type": "string"},
                "cargo_value": {"type": "string"},
                "incoterm": {"type": "string", "description": "EXW, FOB, FCA, CIF, CFR, DAP, DDP, or a custom value"},
                "export_customs_clearance": {"type": "boolean"},
                "import_customs_clearance": {"type": "boolean"},
                "special_requirements": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "e.g. Urgent Shipment, Dangerous Goods (DG), Temperature Controlled, Oversized / Project Cargo, Insurance Required, or a custom note",
                },
                "additional_info": {"type": "string"},
            },
            "required": ["contact_person", "mobile_whatsapp", "shipment_type", "pickup_country", "delivery_country", "commodity"],
        },
    },
}


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


def _run_tool_calls(tool_calls, db, session_id: str) -> list:
    results = []
    for tool_call in tool_calls:
        if tool_call.function.name == "submit_quotation_request" and db is not None:
            try:
                args = json.loads(tool_call.function.arguments or "{}")
            except json.JSONDecodeError:
                args = {}
            quotation = save_quotation(db, args, session_id)
            result = {"status": "success", "quotation_id": quotation.id}
        else:
            result = {"status": "error", "message": "Unknown tool"}
        results.append({
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": json.dumps(result),
        })
    return results


def get_ai_response(user_message: str, history: list, db=None, session_id: str = "") -> str:
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
        tools=[QUOTATION_TOOL],
        max_completion_tokens=600,
        temperature=0.7,
    )
    choice = response.choices[0].message

    if choice.tool_calls:
        messages.append({
            "role": "assistant",
            "content": choice.content,
            "tool_calls": [
                {
                    "id": tc.id,
                    "type": "function",
                    "function": {"name": tc.function.name, "arguments": tc.function.arguments},
                }
                for tc in choice.tool_calls
            ],
        })
        messages.extend(_run_tool_calls(choice.tool_calls, db, session_id))

        follow_up = client.chat.completions.create(
            model=settings.AZURE_OPENAI_DEPLOYMENT,
            messages=messages,
            max_completion_tokens=500,
            temperature=0.7,
        )
        return follow_up.choices[0].message.content

    return choice.content
