from sqlalchemy import select

from app.models.quotation import QuotationRequest

QUOTATION_FIELDS = [
    "company_name", "contact_person", "mobile_whatsapp", "email",
    "shipment_type", "pickup_address", "pickup_city", "pickup_country", "ready_date",
    "delivery_address", "delivery_city", "delivery_country",
    "commodity", "num_packages", "gross_weight_kg", "dimensions", "total_volume_cbm",
    "hs_code", "cargo_value", "incoterm",
    "export_customs_clearance", "import_customs_clearance",
    "special_requirements", "additional_info",
]


def save_quotation(db, args: dict, session_id: str) -> QuotationRequest:
    shipment_type = args.get("shipment_type") or []
    if isinstance(shipment_type, list):
        shipment_type = ", ".join(shipment_type)

    special_requirements = args.get("special_requirements") or []
    if isinstance(special_requirements, list):
        special_requirements = ", ".join(special_requirements)

    fields = {key: args.get(key) for key in QUOTATION_FIELDS}
    fields["shipment_type"] = shipment_type
    fields["special_requirements"] = special_requirements

    quotation = None
    if session_id:
        quotation = db.execute(
            select(QuotationRequest).where(QuotationRequest.session_id == session_id)
        ).scalar_one_or_none()

    if quotation:
        # Merge: keep prior values for anything this call didn't provide, so a later
        # follow-up call (chat or form) can't accidentally erase details captured earlier.
        for key, value in fields.items():
            if value not in (None, "", []):
                setattr(quotation, key, value)
    else:
        quotation = QuotationRequest(session_id=session_id, **fields)
        db.add(quotation)

    db.commit()
    db.refresh(quotation)
    return quotation
