import { Link } from 'react-router-dom'
import { Calendar, User } from 'lucide-react'

const posts = [
  {
    title: 'Why Cam Freight Services?',
    category: 'Uncategorized',
    author: 'admin',
    date: '2 Jun, 2025',
    slug: 'why-cam-freight-services',
    img: 'https://placehold.co/600x400/1e40af/ffffff?text=Cam+Freight',
  },
  {
    title: 'The Guide On How to Ship Oversize Loads',
    category: 'Freight',
    author: 'admin',
    date: '27 Dec, 2024',
    slug: 'guide-ship-oversize-loads',
    img: 'https://placehold.co/600x400/2563eb/ffffff?text=Oversize+Loads',
  },
  {
    title: 'Need from our Transport Tracking specialists',
    category: 'Project',
    author: 'admin',
    date: '27 Dec, 2024',
    slug: 'transport-tracking-specialists',
    img: 'https://placehold.co/600x400/1e3a8a/ffffff?text=Tracking',
  },
]

export default function BlogSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Blog</h2>
          <p className="mt-4 text-gray-600">Latest news and insights from Cam Freight Services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article
              key={p.slug}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {p.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {p.date}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition">{p.title}</h3>
                <Link
                  to="/blog"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Read More &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
