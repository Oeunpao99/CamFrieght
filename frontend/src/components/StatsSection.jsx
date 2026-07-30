export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/90" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="animate-fade-in">
            <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-200 to-cyan-200 text-transparent bg-clip-text">245K</div>
            <div className="h-0.5 w-12 bg-blue-400/50 mx-auto mb-3" />
            <div className="text-blue-100/80">Successful Project Completion</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
            <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-200 to-cyan-200 text-transparent bg-clip-text">30K</div>
            <div className="h-0.5 w-12 bg-blue-400/50 mx-auto mb-3" />
            <div className="text-blue-100/80">Proactive Communications</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-200 to-cyan-200 text-transparent bg-clip-text">89M</div>
            <div className="h-0.5 w-12 bg-blue-400/50 mx-auto mb-3" />
            <div className="text-blue-100/80">Careful Planning &amp; Resource Management</div>
          </div>
        </div>
      </div>
    </section>
  )
}
