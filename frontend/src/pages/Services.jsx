import { Truck, Plane, Ship, Package, ClipboardCheck, Globe, ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import useInView from '../hooks/useInView'

const services = [
  {
    name: 'Land Freight',
    icon: Truck,
    desc: 'Comprehensive road transportation solutions for cargo across Cambodia and neighboring countries.',
    detail: 'Our land freight service covers all major routes in Cambodia, Vietnam, Thailand, and Laos. We maintain a modern fleet with real-time tracking and provide door-to-door delivery with full insurance coverage.',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
    features: ['Full truckload & LTL', 'Real-time GPS tracking', 'Door-to-door delivery', 'Insurance coverage'],
  },
  {
    name: 'Air Freight',
    icon: Plane,
    desc: 'Fast and reliable air cargo solutions for time-sensitive shipments worldwide.',
    detail: 'We partner with major airlines to offer competitive rates and expedited handling. From express deliveries to consolidated air freight, we ensure your cargo reaches its destination quickly and safely.',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    features: ['Express & economy options', 'Airline partnerships', 'Consolidation services', 'Temperature-controlled'],
  },
  {
    name: 'Ocean Freight',
    icon: Ship,
    desc: 'Sea freight services for bulk and containerized cargo with flexible sailing schedules.',
    detail: 'Whether you need full container load (FCL) or less than container load (LCL), our ocean freight service provides cost-effective solutions for international shipping across all major routes.',
    img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80',
    features: ['FCL & LCL options', 'Port-to-port & door-to-door', 'Bulk cargo handling', 'Flexible schedules'],
  },
  {
    name: 'Project Cargo Handling',
    icon: Package,
    desc: 'Specialized handling for oversized, heavy, and complex cargo requiring custom logistics solutions.',
    detail: 'Our project cargo team has extensive experience managing complex logistics for industrial equipment, machinery, and construction materials with end-to-end project management.',
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    features: ['Oversized cargo specialists', 'Custom logistics planning', 'Heavy lift equipment', 'End-to-end management'],
  },
  {
    name: 'Customs Brokerage',
    icon: ClipboardCheck,
    desc: 'Professional customs clearance and documentation services for smooth border crossings.',
    detail: 'Our licensed customs brokers handle all documentation, tariffs, and regulatory compliance, saving you time and ensuring your shipments clear customs without delays.',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    features: ['Licensed brokers', 'Documentation handling', 'Tariff classification', 'Compliance management'],
  },
  {
    name: 'Cross-Border Freight',
    icon: Globe,
    desc: 'Seamless cross-border transportation connecting Cambodia with neighboring countries.',
    detail: 'We specialize in cross-border logistics, managing customs requirements and regulations for seamless transportation between Cambodia and its regional trading partners.',
    img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    features: ['Regional network', 'Customs pre-clearance', 'Multi-modal solutions', 'Real-time tracking'],
  },
]

export default function Services() {
  const [heroRef, heroInView] = useInView()
  const [ctaRef, ctaInView] = useInView()
  return (
    <>
      <div ref={heroRef} className="relative bg-gradient-to-br from-blue-900 to-blue-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold text-white mb-4 opacity-0 ${heroInView ? 'animate-slide-up' : ''}`}>Our Services</h1>
          <p className={`text-blue-200 max-w-2xl mx-auto opacity-0 ${heroInView ? 'animate-slide-up' : ''}`} style={{ animationDelay: '150ms' }}>
            Comprehensive logistics solutions tailored to your business needs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {services.map((s, i) => {
          const [ref, inView] = useInView()
          return (
            <div
              key={s.name}
              ref={ref}
              className={`flex flex-col ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-10 items-center opacity-0 ${inView ? 'animate-slide-up' : ''}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <s.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{s.name}</h2>
                </div>
                <p className="text-gray-700 text-lg mb-3">{s.desc}</p>
                <p className="text-gray-500 leading-relaxed mb-6">{s.detail}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {s.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div ref={ctaRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className={`relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-center overflow-hidden opacity-0 ${ctaInView ? 'animate-slide-up' : ''}`}>
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing?</h2>
            <p className="text-blue-200 mb-8 max-w-xl mx-auto">
              Our logistics specialists are ready to help you find the right solution for your cargo.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
            >
              Contact Us <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
