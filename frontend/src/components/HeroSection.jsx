import { ArrowRight, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/90 to-blue-950/80" />
      </div>

      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-300/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-blue-200 mb-8 shadow-sm shadow-blue-500/10">
            <Shield className="h-4 w-4" />
            Trusted Logistics Partner Since 2000
          </div>
          <h1 className="text-4xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-balance">
            Moving Your Business
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
              Across Borders
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 mb-10 leading-relaxed max-w-2xl">
            At Cam Freight Services, we believe logistics is more than moving cargo — it&apos;s
            about moving businesses forward. Backed by local expertise and global reach.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-400/40 hover:-translate-y-0.5"
            >
              Our Services <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/50 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl font-semibold transition-all backdrop-blur-sm hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
