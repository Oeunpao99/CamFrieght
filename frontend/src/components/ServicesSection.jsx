import { Link } from 'react-router-dom'
import { Truck, Plane, Ship, Package, ClipboardCheck, Globe, ArrowUpRight, MapPin, Phone } from 'lucide-react'

const services = [
  {
    name: 'Land Freight',
    icon: Truck,
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
  },
  {
    name: 'Air Freight',
    icon: Plane,
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
  },
  {
    name: 'Ocean Freight',
    icon: Ship,
    img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80',
  },
  {
    name: 'Project Cargo Handling',
    icon: Package,
    img: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=600&q=80',
    badge: 'Project Cargo Handling',
  },
  {
    name: 'Customs Brokerage',
    icon: ClipboardCheck,
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    badge: 'Custom Broker',
  },
  {
    name: 'Cross-Border Freight',
    icon: Globe,
    img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80',
    badge: 'Cross - Border Freight',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Comprehensive logistics solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.name}
                to="/services"
                className="group relative block h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                {s.badge && (
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                    {s.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-blue-600 group-hover:bg-blue-500 text-white rounded-full p-2 shadow-lg transition">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 text-center">
            <div className="bg-white rounded-2xl px-6 py-8 w-full flex flex-col items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                Cam <span className="text-blue-600">Freight</span>
              </span>
              <span className="text-xs text-gray-500 tracking-widest">SERVICES</span>
            </div>
            <div className="text-blue-100 text-sm leading-relaxed flex flex-col items-center gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>No 85c, 313 Street, Phnom Penh, 12152, Cambodia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+855 88 983 9999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
