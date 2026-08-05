import { useState } from 'react'
import { Lock, LogOut, RefreshCw, Package, MapPin, User } from 'lucide-react'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function Field({ label, value }) {
  if (!value && value !== false) return null
  return (
    <div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm text-gray-800">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</div>
    </div>
  )
}

function QuoteCard({ q }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex flex-wrap items-center gap-4 justify-between p-4 text-left hover:bg-gray-50 transition">
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-blue-50 text-blue-600 rounded-lg p-2 shrink-0">
            <Package className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-gray-900 truncate">
              #{q.id} — {q.contact_person || 'Unknown contact'} {q.company_name ? `(${q.company_name})` : ''}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {q.shipment_type || 'Shipment type not set'} · {q.pickup_country || '?'} → {q.delivery_country || '?'} · {formatDate(q.created_at)}
            </div>
          </div>
        </div>
        <span className="text-xs font-medium text-blue-600 shrink-0">{open ? 'Hide details' : 'View details'}</span>
      </button>

      {open && (
        <div className="border-t border-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-3 flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <User className="h-3.5 w-3.5" /> Customer
          </div>
          <Field label="Company" value={q.company_name} />
          <Field label="Contact person" value={q.contact_person} />
          <Field label="Mobile / WhatsApp" value={q.mobile_whatsapp} />
          <Field label="Email" value={q.email} />

          <div className="lg:col-span-3 flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mt-2">
            <MapPin className="h-3.5 w-3.5" /> Route
          </div>
          <Field label="Shipment type" value={q.shipment_type} />
          <Field label="Ready date" value={q.ready_date} />
          <Field label="Pickup" value={[q.pickup_address, q.pickup_city, q.pickup_country].filter(Boolean).join(', ')} />
          <Field label="Delivery" value={[q.delivery_address, q.delivery_city, q.delivery_country].filter(Boolean).join(', ')} />

          <div className="lg:col-span-3 flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mt-2">
            <Package className="h-3.5 w-3.5" /> Cargo
          </div>
          <Field label="Commodity" value={q.commodity} />
          <Field label="Packages" value={q.num_packages} />
          <Field label="Gross weight (kg)" value={q.gross_weight_kg} />
          <Field label="Dimensions" value={q.dimensions} />
          <Field label="Volume (CBM)" value={q.total_volume_cbm} />
          <Field label="HS code" value={q.hs_code} />
          <Field label="Cargo value" value={q.cargo_value} />
          <Field label="Incoterm" value={q.incoterm} />
          <Field label="Export customs clearance" value={q.export_customs_clearance} />
          <Field label="Import customs clearance" value={q.import_customs_clearance} />
          <Field label="Special requirements" value={q.special_requirements} />
          <div className="lg:col-span-3">
            <Field label="Additional info" value={q.additional_info} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function QuoteRequests() {
  const [authed, setAuthed] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authHeader, setAuthHeader] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [quotes, setQuotes] = useState([])

  async function fetchQuotes(header) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/quotation', { headers: { Authorization: header } })
      if (res.status === 401) {
        setError('Invalid username or password.')
        setAuthed(false)
        return
      }
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setQuotes(data)
      setAuthed(true)
    } catch {
      setError('Could not load quote requests. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleLogin(e) {
    e.preventDefault()
    const header = 'Basic ' + btoa(`${username}:${password}`)
    setAuthHeader(header)
    fetchQuotes(header)
  }

  function handleLogout() {
    setAuthed(false)
    setUsername('')
    setPassword('')
    setAuthHeader('')
    setQuotes([])
  }

  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Lock className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">Quote Requests — Admin Login</h1>
          </div>

          <label className="block text-sm text-gray-600 mb-1">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="username"
          />

          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="current-password"
          />

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
          <p className="text-sm text-gray-500 mt-1">{quotes.length} request{quotes.length === 1 ? '' : 's'} submitted via the chat assistant</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchQuotes(authHeader)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-50 transition"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-50 transition"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {quotes.length === 0 ? (
        <div className="text-center text-gray-500 py-16 border border-dashed border-gray-200 rounded-2xl">
          No quote requests yet.
        </div>
      ) : (
        <div className="space-y-3">
          {quotes.map((q) => (
            <QuoteCard key={q.id} q={q} />
          ))}
        </div>
      )}
    </div>
  )
}
