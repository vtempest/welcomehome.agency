import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity, BarChart3, Zap, Shield } from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'

export function AgentCardsSection() {
  const agents = [
    {
      icon: Activity,
      category: 'Price Intelligence',
      title: 'Automated Price Monitoring Agent',
      features: [
        'Real-time MLS monitoring across 650+ markets',
        'Price change detection with anomaly identification',
        'Machine learning price predictions (95%+ accuracy)',
        'Automated alert generation on market shifts',
      ],
      badge: 'Real-time',
    },
    {
      icon: BarChart3,
      category: 'Market Analytics',
      title: 'Market Forecasting Agent',
      features: [
        '3, 6, and 12-month price predictions',
        'Investment opportunity detection',
        'Seasonal pattern recognition',
        'Risk assessment and volatility modeling',
      ],
      badge: 'Predictive',
    },
    {
      icon: Zap,
      category: 'Sales Operations',
      title: 'Sales Operations Agent',
      features: [
        'End-to-end transaction automation (70% reduction)',
        'Automated pipeline tracking from offer to closing',
        'Document processing via OCR',
        'Multi-party coordination and compliance monitoring',
      ],
      badge: 'Automation',
    },
    {
      icon: Shield,
      category: 'Performance',
      title: 'Performance Analytics & Coaching',
      features: [
        'Real-time performance monitoring',
        'Automated coaching recommendations',
        'Pipeline health monitoring',
        'Revenue forecasting based on current pipeline',
      ],
      badge: 'Intelligence',
    },
  ]

  return (
    <section id="agents" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent-foreground mb-6">
            <span className="text-sm font-medium">Specialized AI Agents</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Meet your AI team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Each AI agent is specialized for specific tasks, working together to create a comprehensive real estate intelligence platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {agents.map((agent, index) => {
            const Icon = agent.icon
            return (
              <Card key={index} className="p-8 hover:shadow-xl transition-all border-border bg-card group relative">
                <BorderBeam 
                  size={400} 
                  duration={15} 
                  delay={index * 3}
                  colorFrom="#60a5fa"
                  colorTo="#06b6d4"
                />
                <div className="flex items-start justify-between mb-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {agent.badge}
                  </Badge>
                </div>
                
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {agent.category}
                </div>
                
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  {agent.title}
                </h3>
                
                <ul className="space-y-3">
                  {agent.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
