import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Truck } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold text-white">Cam Freight</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your trusted logistics partner in Cambodia. We deliver reliability,
              speed, and results across every mile.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block hover:text-blue-400">About Us</Link>
              <Link to="/services" className="block hover:text-blue-400">Services</Link>
              <Link to="/blog" className="block hover:text-blue-400">Blog</Link>
              <Link to="/contact" className="block hover:text-blue-400">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <div className="space-y-2 text-sm">
              <Link to="/services" className="block hover:text-blue-400">Land Freight</Link>
              <Link to="/services" className="block hover:text-blue-400">Air Freight</Link>
              <Link to="/services" className="block hover:text-blue-400">Ocean Freight</Link>
              <Link to="/services" className="block hover:text-blue-400">Customs Brokerage</Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>No 85c, 313 Street, Phnom Penh, 12152, Cambodia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+855 88 983 9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@camfreight.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Cam Freight Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>No 85c, 313 Street, Phnom Penh</span>
            <span className="hidden sm:inline">|</span>
            <span>+855 88 983 9999</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
