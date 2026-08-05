from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean

from app.database import Base


class QuotationRequest(Base):
    __tablename__ = "quotation_requests"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), index=True)

    # 1. Customer Information
    company_name = Column(String(200))
    contact_person = Column(String(200))
    mobile_whatsapp = Column(String(50))
    email = Column(String(200))

    # 2. Shipment Details
    shipment_type = Column(String(200))

    # 3. Pickup Information
    pickup_address = Column(String(300))
    pickup_city = Column(String(100))
    pickup_country = Column(String(100))
    ready_date = Column(String(50))

    # 4. Delivery Information
    delivery_address = Column(String(300))
    delivery_city = Column(String(100))
    delivery_country = Column(String(100))

    # 5. Cargo Information
    commodity = Column(String(300))
    num_packages = Column(String(50))
    gross_weight_kg = Column(String(50))
    dimensions = Column(String(100))
    total_volume_cbm = Column(String(50))
    hs_code = Column(String(50))
    cargo_value = Column(String(100))

    # 6. Incoterms
    incoterm = Column(String(50))

    # 7. Customs Requirements
    export_customs_clearance = Column(Boolean)
    import_customs_clearance = Column(Boolean)

    # 8. Special Requirements
    special_requirements = Column(String(300))

    # 9. Additional Information
    additional_info = Column(Text)

    status = Column(String(30), default="new")
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
