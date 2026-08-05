from pydantic import BaseModel


class QuotationCreate(BaseModel):
    session_id: str

    company_name: str | None = None
    contact_person: str
    mobile_whatsapp: str
    email: str | None = None

    shipment_type: list[str] = []

    pickup_address: str | None = None
    pickup_city: str | None = None
    pickup_country: str
    ready_date: str | None = None

    delivery_address: str | None = None
    delivery_city: str | None = None
    delivery_country: str

    commodity: str
    num_packages: str | None = None
    gross_weight_kg: str | None = None
    dimensions: str | None = None
    total_volume_cbm: str | None = None
    hs_code: str | None = None
    cargo_value: str | None = None

    incoterm: str | None = None

    export_customs_clearance: bool | None = None
    import_customs_clearance: bool | None = None

    special_requirements: list[str] = []
    additional_info: str | None = None


class QuotationStatusUpdate(BaseModel):
    status: str
