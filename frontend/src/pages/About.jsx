import { Truck, Target, Award, Globe } from 'lucide-react'

export default function About() {
  return (
    <>
      <div className="relative h-[40vh] overflow-hidden">
        <img
          src="https://placehold.co/1920x600/1e3a8a/ffffff?text=About+Us"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/80 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Story</h1>
            <p className="text-blue-200 text-lg max-w-xl">Two decades of moving Cambodia forward.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Since 2000</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our History</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Founded to elevate Cambodia&apos;s freight standards, we deliver trust, reliability, and
              results. Backed by local expertise and global reach, we go beyond shipping — we move
              businesses forward.
            </p>
            <p className="text-gray-500 leading-relaxed">
              More than a freight forwarder, we&apos;re your logistics partner in growth. For over two
              decades, we have been at the forefront of Cambodia&apos;s logistics industry, continuously
              evolving to meet the changing needs of global trade.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://placehold.co/800x600/2563eb/ffffff?text=Our+History"
                alt=""
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white rounded-2xl p-6 shadow-lg hidden lg:block">
              <div className="text-3xl font-bold">2000</div>
              <div className="text-blue-200 text-sm">Founded</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-5">
              <Truck className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To provide seamless, reliable logistics solutions that empower businesses to grow
              beyond borders with confidence.
            </p>
          </div>
          <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-5">
              <Target className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To be Cambodia&apos;s most trusted logistics partner, known for innovation, integrity,
              and excellence in freight forwarding.
            </p>
          </div>
          <div className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-5">
              <Award className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Our Values</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Trust, reliability, proactive communication, and careful planning — the foundations
              of everything we do.
            </p>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="https://placehold.co/1920x600/1e3a8a/ffffff?text=Global+Network" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative">
            <Globe className="h-12 w-12 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Worldwide Network Ready To Serve You</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              With a global network of partners and our deep local knowledge, we ensure your cargo
              reaches its destination safely and on time, wherever that may be.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
