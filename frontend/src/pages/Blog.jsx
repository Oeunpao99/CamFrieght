import { Calendar, User, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const posts = [
  {
    title: 'Why Cam Freight Services?',
    category: 'Uncategorized',
    author: 'admin',
    date: '2 Jun, 2025',
    excerpt: 'At Cam Freight Services, we believe logistics is more than moving cargo — it\'s about moving businesses forward. Discover what makes us different.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    img: 'https://placehold.co/600x400/1e40af/ffffff?text=Cam+Freight',
  },
  {
    title: 'The Guide On How to Ship Oversize Loads',
    category: 'Freight',
    author: 'admin',
    date: '27 Dec, 2024',
    excerpt: 'Shipping oversized loads requires careful planning, specialized equipment, and expert knowledge. Here\'s your complete guide.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    img: 'https://placehold.co/600x400/2563eb/ffffff?text=Oversize+Loads',
  },
  {
    title: 'Need from our Transport Tracking specialists',
    category: 'Project',
    author: 'admin',
    date: '27 Dec, 2024',
    excerpt: 'Real-time tracking gives you total visibility into your shipment\'s journey. Our specialists ensure you\'re always in the know.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    img: 'https://placehold.co/600x400/1e3a8a/ffffff?text=Tracking',
  },
]

export default function Blog() {
  return (
    <>
      <div className="relative bg-gradient-to-br from-blue-900 to-blue-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Blog</h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Insights, guides, and news from the Cam Freight Services team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <article key={p.slug} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
              <div className="relative h-52 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {p.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {p.date}</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">{p.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{p.excerpt}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 group/link"
                >
                  Read More <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
