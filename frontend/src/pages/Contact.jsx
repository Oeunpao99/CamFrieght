import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import useInView from '../hooks/useInView'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service_interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [heroRef, heroInView] = useInView()
  const [formRef, formInView] = useInView()
  const [infoRef, infoInView] = useInView()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div ref={heroRef} className="relative bg-gradient-to-br from-blue-900 to-blue-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 opacity-0 ${heroInView ? 'animate-slide-up' : ''}`}>Contact Us</h1>
          <p className={`text-blue-200 max-w-2xl mx-auto opacity-0 ${heroInView ? 'animate-slide-up' : ''}`} style={{ animationDelay: '150ms' }}>
            Get in touch with our team. We&apos;re here to help with all your logistics needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div ref={formRef} className={`lg:col-span-3 opacity-0 ${formInView ? 'animate-slide-up' : ''}`}>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700">
                  Your inquiry has been submitted. We&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Send us a message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input name="company" value={form.company} onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Interest</label>
                  <select name="service_interest" value={form.service_interest} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    <option value="">Select a service</option>
                    <option value="land-freight">Land Freight</option>
                    <option value="air-freight">Air Freight</option>
                    <option value="ocean-freight">Ocean Freight</option>
                    <option value="project-cargo">Project Cargo Handling</option>
                    <option value="customs-brokerage">Customs Brokerage</option>
                    <option value="cross-border">Cross-Border Freight</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea name="message" required rows="5" value={form.message} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-blue-500 transition disabled:opacity-50 shadow-lg shadow-blue-500/25">
                  <Send className="h-4 w-4" /> {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div ref={infoRef} className={`lg:col-span-2 space-y-6 opacity-0 ${infoInView ? 'animate-slide-left' : ''}`}>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Our Office</h3>
              <div className="space-y-5 text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Address</div>
                    <span className="text-sm">No 85c, 313 Street, Phnom Penh, 12152, Cambodia</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <span className="text-sm">+855 88 983 9999</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <span className="text-sm">info@camfreight.com</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Working Hours</div>
                    <span className="text-sm">Mon - Fri: 8:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-3">Chat With Us</h3>
              <p className="text-blue-200 text-sm mb-5">
                Need a quick answer? Use our AI chat assistant for instant support.
              </p>
              <div className="border-t border-blue-500/30 pt-5">
                <p className="text-blue-200 text-sm">
                  Or call us directly at <strong className="text-white">+855 88 983 9999</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
