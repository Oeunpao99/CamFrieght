import { useState } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'

const SHIPMENT_TYPES = ['Air Freight', 'Sea Freight', 'Cross Border Trucking', 'Customs Clearance', 'Project Cargo']
const INCOTERMS = ['EXW', 'FOB', 'FCA', 'CIF', 'CFR', 'DAP', 'DDP', 'Other']
const SPECIAL_REQUIREMENTS = ['Urgent Shipment', 'Dangerous Goods (DG)', 'Temperature Controlled', 'Oversized / Project Cargo', 'Insurance Required']

const initialState = {
  company_name: '',
  contact_person: '',
  mobile_whatsapp: '',
  email: '',
  shipment_type: [],
  pickup_address: '',
  pickup_city: '',
  pickup_country: '',
  ready_date: '',
  delivery_address: '',
  delivery_city: '',
  delivery_country: '',
  commodity: '',
  num_packages: '',
  gross_weight_kg: '',
  dimensions: '',
  total_volume_cbm: '',
  hs_code: '',
  cargo_value: '',
  incoterm: '',
  incoterm_other: '',
  export_customs_clearance: null,
  import_customs_clearance: null,
  special_requirements: [],
  special_other: '',
  additional_info: '',
}

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
    </div>
  )
}

function Field({ label, required, full, children }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="block text-xs text-gray-500 mb-1">
        {label}{required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

function toggle(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export default function QuotationForm({ sessionId, onSubmitted }) {
  const [form, setForm] = useState(initialState)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const missing = []
  if (!form.contact_person.trim()) missing.push('Contact person')
  if (!form.mobile_whatsapp.trim()) missing.push('Mobile/WhatsApp')
  if (form.shipment_type.length === 0) missing.push('Shipment type')
  if (!form.pickup_country.trim()) missing.push('Pickup country')
  if (!form.delivery_country.trim()) missing.push('Delivery country')
  if (!form.commodity.trim()) missing.push('Commodity')

  async function handleSubmit(e) {
    e.preventDefault()
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(', ')}`)
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const incoterm = form.incoterm === 'Other' ? form.incoterm_other : form.incoterm
      const special_requirements = form.special_other
        ? [...form.special_requirements, form.special_other]
        : form.special_requirements

      const res = await fetch('/api/quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          company_name: form.company_name || null,
          contact_person: form.contact_person,
          mobile_whatsapp: form.mobile_whatsapp,
          email: form.email || null,
          shipment_type: form.shipment_type,
          pickup_address: form.pickup_address || null,
          pickup_city: form.pickup_city || null,
          pickup_country: form.pickup_country,
          ready_date: form.ready_date || null,
          delivery_address: form.delivery_address || null,
          delivery_city: form.delivery_city || null,
          delivery_country: form.delivery_country,
          commodity: form.commodity,
          num_packages: form.num_packages || null,
          gross_weight_kg: form.gross_weight_kg || null,
          dimensions: form.dimensions || null,
          total_volume_cbm: form.total_volume_cbm || null,
          hs_code: form.hs_code || null,
          cargo_value: form.cargo_value || null,
          incoterm: incoterm || null,
          export_customs_clearance: form.export_customs_clearance,
          import_customs_clearance: form.import_customs_clearance,
          special_requirements,
          additional_info: form.additional_info || null,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      onSubmitted(data.id)
    } catch {
      setError('Something went wrong submitting your request. Please try again or call +855 93 688 688.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-5 shadow-sm">
      <div>
        <h3 className="text-sm font-semibold text-gray-900">Quotation Request Form</h3>
        <p className="text-xs text-gray-500 mt-0.5">Fields marked * are required — fill in what you know.</p>
      </div>

      <Section title="1. Customer Information">
        <Field label="Company Name"><input className={inputClass} value={form.company_name} onChange={(e) => set('company_name', e.target.value)} /></Field>
        <Field label="Contact Person" required><input className={inputClass} value={form.contact_person} onChange={(e) => set('contact_person', e.target.value)} /></Field>
        <Field label="Mobile / WhatsApp" required><input className={inputClass} value={form.mobile_whatsapp} onChange={(e) => set('mobile_whatsapp', e.target.value)} /></Field>
        <Field label="Email"><input type="email" className={inputClass} value={form.email} onChange={(e) => set('email', e.target.value)} /></Field>
      </Section>

      <Section title="2. Shipment Type">
        <div className="sm:col-span-2 flex flex-wrap gap-2">
          {SHIPMENT_TYPES.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => set('shipment_type', toggle(form.shipment_type, t))}
              className={`text-xs rounded-full px-3 py-1.5 border transition ${
                form.shipment_type.includes(t)
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>

      <Section title="3. Pickup Information">
        <Field label="Pickup Address" full><input className={inputClass} value={form.pickup_address} onChange={(e) => set('pickup_address', e.target.value)} /></Field>
        <Field label="City"><input className={inputClass} value={form.pickup_city} onChange={(e) => set('pickup_city', e.target.value)} /></Field>
        <Field label="Country" required><input className={inputClass} value={form.pickup_country} onChange={(e) => set('pickup_country', e.target.value)} /></Field>
        <Field label="Ready Date"><input type="date" className={inputClass} value={form.ready_date} onChange={(e) => set('ready_date', e.target.value)} /></Field>
      </Section>

      <Section title="4. Delivery Information">
        <Field label="Delivery Address" full><input className={inputClass} value={form.delivery_address} onChange={(e) => set('delivery_address', e.target.value)} /></Field>
        <Field label="City"><input className={inputClass} value={form.delivery_city} onChange={(e) => set('delivery_city', e.target.value)} /></Field>
        <Field label="Country" required><input className={inputClass} value={form.delivery_country} onChange={(e) => set('delivery_country', e.target.value)} /></Field>
      </Section>

      <Section title="5. Cargo Information">
        <Field label="Commodity" required full><input className={inputClass} value={form.commodity} onChange={(e) => set('commodity', e.target.value)} /></Field>
        <Field label="Number of Packages"><input className={inputClass} value={form.num_packages} onChange={(e) => set('num_packages', e.target.value)} /></Field>
        <Field label="Gross Weight (kg)"><input className={inputClass} value={form.gross_weight_kg} onChange={(e) => set('gross_weight_kg', e.target.value)} /></Field>
        <Field label="Dimensions (L x W x H)"><input className={inputClass} value={form.dimensions} onChange={(e) => set('dimensions', e.target.value)} /></Field>
        <Field label="Total Volume (CBM)"><input className={inputClass} value={form.total_volume_cbm} onChange={(e) => set('total_volume_cbm', e.target.value)} /></Field>
        <Field label="HS Code (if available)"><input className={inputClass} value={form.hs_code} onChange={(e) => set('hs_code', e.target.value)} /></Field>
        <Field label="Cargo Value"><input className={inputClass} value={form.cargo_value} onChange={(e) => set('cargo_value', e.target.value)} /></Field>
      </Section>

      <Section title="6. Incoterms">
        <Field label="Incoterm">
          <select className={inputClass} value={form.incoterm} onChange={(e) => set('incoterm', e.target.value)}>
            <option value="">Select...</option>
            {INCOTERMS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        {form.incoterm === 'Other' && (
          <Field label="Specify Incoterm"><input className={inputClass} value={form.incoterm_other} onChange={(e) => set('incoterm_other', e.target.value)} /></Field>
        )}
      </Section>

      <Section title="7. Customs Requirements">
        <Field label="Export Customs Clearance">
          <select className={inputClass} value={form.export_customs_clearance === null ? '' : String(form.export_customs_clearance)} onChange={(e) => set('export_customs_clearance', e.target.value === '' ? null : e.target.value === 'true')}>
            <option value="">Not sure</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </Field>
        <Field label="Import Customs Clearance">
          <select className={inputClass} value={form.import_customs_clearance === null ? '' : String(form.import_customs_clearance)} onChange={(e) => set('import_customs_clearance', e.target.value === '' ? null : e.target.value === 'true')}>
            <option value="">Not sure</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </Field>
      </Section>

      <Section title="8. Special Requirements">
        <div className="sm:col-span-2 flex flex-wrap gap-2">
          {SPECIAL_REQUIREMENTS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => set('special_requirements', toggle(form.special_requirements, t))}
              className={`text-xs rounded-full px-3 py-1.5 border transition ${
                form.special_requirements.includes(t)
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <Field label="Other (specify)" full><input className={inputClass} value={form.special_other} onChange={(e) => set('special_other', e.target.value)} /></Field>
      </Section>

      <Section title="9. Additional Information">
        <Field label="Notes" full>
          <textarea rows={3} className={inputClass} value={form.additional_info} onChange={(e) => set('additional_info', e.target.value)} />
        </Field>
      </Section>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-500 transition disabled:opacity-50"
      >
        {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><CheckCircle2 className="h-4 w-4" /> Submit Quotation Request</>}
      </button>
    </form>
  )
}
