import { useState, useEffect } from 'react'
import { Lock, LogOut, RefreshCw, Package, MapPin, User, Truck, ChevronDown, CheckCircle2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChatWidget from '../components/ChatWidget'

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

function StatusBadge({ status }) {
  const color = status === 'new'
    ? 'bg-blue-50 text-blue-600 border-blue-200'
    : status === 'quoted'
      ? 'bg-green-50 text-green-600 border-green-200'
      : 'bg-gray-50 text-gray-500 border-gray-200'
  return (
    <span className={`inline-block text-xs font-medium rounded-full px-2.5 py-0.5 border ${color}`}>
      {status || 'new'}
    </span>
  )
}

function QuoteRow({ q, authHeader, onUpdated }) {
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [saving, setSaving] = useState(false)
  const quoted = q.status === 'quoted'
  const route = [q.pickup_country, q.delivery_country].filter(Boolean).join(' → ') || '—'
  const cargo = [q.commodity, q.gross_weight_kg ? `${q.gross_weight_kg} kg` : null].filter(Boolean).join(' · ') || '—'

  async function handleMarkQuoted() {
    setSaving(true)
    try {
      const res = await fetch(`/api/quotation/${q.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: authHeader },
        body: JSON.stringify({ status: 'quoted' }),
      })
      if (!res.ok) throw new Error('Request failed')
      const updated = await res.json()
      onUpdated(updated)
      setConfirming(false)
    } catch {
      alert('Could not update this quote. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <tr
        onClick={() => setOpen(!open)}
        className={`cursor-pointer transition border-b border-gray-200 ${quoted ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
      >
        <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${quoted ? 'text-gray-400' : 'text-gray-900'}`}>#{q.id}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500">{formatDate(q.created_at)}</td>
        <td className="px-4 py-3">
          <div className={`text-sm font-semibold truncate max-w-[180px] ${quoted ? 'text-gray-400' : 'text-gray-900'}`}>{q.contact_person || 'Unknown contact'}</div>
          {q.company_name && <div className="text-xs font-medium text-gray-500 truncate max-w-[180px]">{q.company_name}</div>}
        </td>
        <td className={`px-4 py-3 text-sm font-medium ${quoted ? 'text-gray-400' : 'text-gray-700'}`}>{q.shipment_type || '—'}</td>
        <td className={`px-4 py-3 text-sm font-medium ${quoted ? 'text-gray-400' : 'text-gray-700'}`}>{route}</td>
        <td className={`px-4 py-3 text-sm font-medium ${quoted ? 'text-gray-400' : 'text-gray-700'}`}>{cargo}</td>
        <td className="px-4 py-3"><StatusBadge status={q.status} /></td>
        <td className="px-4 py-3 text-right">
          <ChevronDown className={`h-4 w-4 text-gray-400 inline transition-transform duration-300 ${open ? 'rotate-0' : '-rotate-90'}`} />
        </td>
      </tr>

      <tr className={`transition-colors duration-300 ${open ? 'bg-gray-50/70' : 'bg-transparent'}`}>
        <td colSpan={8} className="p-0">
          <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <div className={`px-4 py-4 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className={`flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 ${quoted ? 'bg-gray-100' : 'bg-gray-50'}`}>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quotation #{q.id}</span>
                    {quoted ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Marked as quoted
                      </span>
                    ) : (
                      <button
                        onClick={() => setConfirming(true)}
                        disabled={saving}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-600 text-white rounded-lg px-3 py-1.5 hover:bg-green-500 transition disabled:opacity-50"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> {saving ? 'Marking...' : 'Mark as quoted'}
                      </button>
                    )}
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50" onClick={() => setConfirming(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-base font-semibold text-gray-900">Confirm quote #{q.id}</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Marking this quote as <span className="font-semibold text-gray-900">quoted</span> means the sales team has
              already processed it. Are you sure you want to proceed?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirming(false)}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleMarkQuoted}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-green-600 text-white hover:bg-green-500 transition disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" /> {saving ? 'Marking...' : 'Mark as quoted'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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

  async function fetchQuotes(header, { silent = false } = {}) {
    if (!silent) setLoading(true)
    if (!silent) setError('')
    try {
      const res = await fetch('/api/quotation', { headers: { Authorization: header } })
      if (res.status === 401) {
        if (!silent) setError('Invalid username or password.')
        setAuthed(false)
        return
      }
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setQuotes(data)
      setAuthed(true)
    } catch {
      if (!silent) setError('Could not load quote requests. Please try again.')
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    if (!authed || !authHeader) return
    const poll = setInterval(() => fetchQuotes(authHeader, { silent: true }), 8000)
    return () => clearInterval(poll)
  }, [authed, authHeader])

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

  function handleQuoteUpdated(updated) {
    setQuotes((prev) => prev.map((q) => (q.id === updated.id ? updated : q)))
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <form onSubmit={handleLogin} className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Lock className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Admin Login</h1>
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
        </main>
        <Footer />
        <ChatWidget />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quote Requests</h1>
              <p className="text-sm text-gray-500 mt-1">
                {quotes.length} request{quotes.length === 1 ? '' : 's'} submitted via the chat assistant and quotation form
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-50 transition"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
              <button
                onClick={() => fetchQuotes(authHeader)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl px-3 py-2 hover:bg-gray-50 transition disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          {quotes.length === 0 ? (
            <div className="text-center text-gray-500 py-16 border border-dashed border-gray-200 rounded-2xl bg-white">
              No quote requests yet.
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Submitted</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Shipment Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Route</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Cargo</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q) => (
                    <QuoteRow key={q.id} q={q} authHeader={authHeader} onUpdated={handleQuoteUpdated} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
