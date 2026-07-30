import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft } from 'lucide-react'

const posts = [
  {
    id: 1,
    title: 'Why Cam Freight Services?',
    slug: 'why-cam-freight-services',
    category: 'Uncategorized',
    author: 'admin',
    date: '2 Jun, 2025',
    excerpt: 'At Cam Freight Services, we believe logistics is more than moving cargo — it\'s about moving businesses forward.',
    content: `At Cam Freight Services, we believe logistics is more than moving cargo — it's about moving businesses forward. Founded to elevate Cambodia's freight standards, we deliver trust, reliability, and results. Backed by local expertise and global reach, we go beyond shipping — we move businesses forward. More than a freight forwarder, we're your logistics partner in growth.

Logistics is the part of supply chain management that deals with the efficient forward and reverse flow of goods, services, and related information from the point of origin to the point of consumption according to the needs of customers.

Logistics management is a component that holds the supply chain together. Logistics deals with the movements of materials or products from one facility to another. Logistics occupies a significant amount of operational cost of an organisation or country.`,
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
  {
    id: 2,
    title: 'The Guide On How to Ship Oversize Loads',
    slug: 'guide-ship-oversize-loads',
    category: 'Freight',
    author: 'admin',
    date: '27 Dec, 2024',
    excerpt: 'Shipping oversized loads requires careful planning, specialized equipment, and expert knowledge.',
    content: `Shipping oversized loads requires careful planning, specialized equipment, and expert knowledge. Here's your complete guide to shipping oversize cargo with confidence.

Logistic regression is a data analysis technique that uses mathematics to find the relationships between two data factors, then uses this relationship to predict the value of one of those factors based on the other.

For example, let's say you want to guess if your website visitor will click the checkout button in their shopping cart or not. Logistic regression analysis looks at past visitor behavior, such as time spent on the website and the number of items in the cart.

"I actually think it's better I started by being close to customers. That foundation early on helped me later I went into logistics & other kinds of management."

Negotiate with several carriers. Logistics is the part of supply chain management that deals with the efficient forward and reverse flow of goods, services, and related information from the point of origin to the point of consumption according to the needs of customers.

Function of understanding stock mix of a company and the different demands on that stock. Legal demand by a shipper or consignee against a carrier in respect of damage or loss to a shipment. Performance based logistics Defense acquisition strategy for cost-effective weapon system support.

Order processing, inventory management, and freight transportation are key components. Traditionally, order processing was a time-consuming activity that could take up to 70% of the order-cycle time.`,
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
  },
  {
    id: 3,
    title: 'Need from our Transport Tracking specialists',
    slug: 'transport-tracking-specialists',
    category: 'Project',
    author: 'admin',
    date: '27 Dec, 2024',
    excerpt: 'Real-time tracking gives you total visibility into your shipment\'s journey.',
    content: `Real-time tracking gives you total visibility into your shipment's journey. Our specialists ensure you're always in the know with accurate, up-to-the-minute updates on your cargo.

Logistics management is a component that holds the supply chain together. Logistics deals with the movements of materials or products from one facility to another. Logistics occupies a significant amount of operational cost of an organisation or country.

Sales territory: Geographic area or customer group managed by a sales representative. Order processing, inventory management, and freight transportation are key functions. Traditionally, order processing was a time-consuming activity that could take up to 70% of the order-cycle time. With modern tracking technology and the availability of stocks, everything can be checked in real time.`,
    img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80',
  },
]

const categories = ['Freight', 'Logistics', 'Manufacturing', 'Production', 'Strategy', 'Transportation', 'Uncategorized']

const recentPosts = [
  { title: 'Why Cam Freight Services?', date: 'June 2, 2025', slug: 'why-cam-freight-services' },
  { title: 'The Guide On How to Ship Oversize Loads', date: 'December 27, 2024', slug: 'guide-ship-oversize-loads' },
  { title: 'Need from our Transport Tracking specialists', date: 'December 27, 2024', slug: 'transport-tracking-specialists' },
]

export default function BlogDetail() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">Post not found.</div>

  const idx = posts.indexOf(post)
  const prev = idx > 0 ? posts[idx - 1] : null
  const next = idx < posts.length - 1 ? posts[idx + 1] : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-500 mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <article className="lg:col-span-2">
          <div className="h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">{post.category}</span>
            <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> by {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4">
            {post.content.split('\n\n').map((p, i) => {
              if (p.startsWith('"')) return <blockquote key={i} className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">{p}</blockquote>
              return <p key={i}>{p}</p>
            })}
          </div>

          <div className="border-t pt-8 mt-12 flex items-center justify-between">
            <div className="flex gap-4">
              {prev ? (
                <Link to={`/blog/${prev.slug}`} className="text-sm text-gray-600 hover:text-blue-600">
                  &larr; {prev.title}
                </Link>
              ) : <span />}
              {next ? (
                <Link to={`/blog/${next.slug}`} className="text-sm text-gray-600 hover:text-blue-600">
                  {next.title} &rarr;
                </Link>
              ) : <span />}
            </div>
          </div>

          <div className="border-t mt-8 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Leave a Reply</h3>
            <p className="text-sm text-gray-500 mb-4">Your email address will not be published. Required fields are marked *</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <textarea placeholder="Enter your comment here..." rows="4" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input placeholder="Name *" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input placeholder="Email *" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input placeholder="Website" className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-500 transition">Post Comment</button>
            </form>
          </div>
        </article>

        <aside className="space-y-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Search</h3>
            <div className="relative">
              <input placeholder="Search ..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((c) => (
                <div key={c} className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                  <span>{c}</span>
                  <span className="text-gray-400">({Math.floor(Math.random() * 5) + 1})</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {recentPosts.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="block group">
                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition">{p.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{p.date}</div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Tag Cloud</h3>
            <div className="flex flex-wrap gap-2">
              {['#businessowners', '#camfreightservices', 'Cargo', 'Carriers', 'Cartoon', 'Delivery', 'Industry', 'Machinery', 'Moving', 'Tricks'].map((t) => (
                <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition">{t}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
