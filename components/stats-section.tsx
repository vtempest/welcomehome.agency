export function StatsSection() {
  const stats = [
    {
      value: '10-15 hours',
      label: 'saved per week',
      subtext: 'per agent',
    },
    {
      value: '30-50%',
      label: 'conversion improvement',
      subtext: 'over manual management',
    },
    {
      value: '85%',
      label: 'workflow automation',
      subtext: 'of operational tasks',
    },
    {
      value: '<5 min',
      label: 'response time',
      subtext: '78% choose first responder',
    },
  ]

  return (
    <section className="bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center lg:text-left">
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
