import { Award, MessageCircle, ClipboardList } from 'lucide-react'
import useInView from '../hooks/useInView'

const stats = [
  { icon: Award, value: '245K', label: 'Successful Project Completion' },
  { icon: MessageCircle, value: '30K', label: 'Proactive Communications' },
  { icon: ClipboardList, value: '89M', label: 'Careful Planning & Resource Management' },
]

export default function StatsSection() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-900/90 to-blue-950/95" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div
              key={label}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-10 hover:bg-white/10 transition-colors opacity-0 ${inView ? 'animate-slide-up' : ''}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-400/10 border border-blue-300/20 mb-5">
                <Icon className="h-5 w-5 text-blue-200" />
              </div>
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-200 to-cyan-200 text-transparent bg-clip-text">{value}</div>
              <div className="h-0.5 w-12 bg-blue-400/50 mx-auto mb-3" />
              <div className="text-blue-100/80">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
