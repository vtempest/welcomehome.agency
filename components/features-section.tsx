import { Card } from '@/components/ui/card'
import { Brain, TrendingUp, Users, MessageSquare, Target, LineChart } from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'

export function FeaturesSection() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Price Tracking & Market Intelligence',
      description: 'Real-time monitoring of 650+ MLS markets with 95%+ price prediction accuracy. Automated alerts on price movements and market opportunities.',
      stats: '<2 min latency',
    },
    {
      icon: MessageSquare,
      title: '24/7 Conversational AI Assistant',
      description: 'Natural language chatbot handling 80-85% of routine inquiries autonomously. Multi-channel support across web, SMS, email, and social media.',
      stats: '391% conversion boost',
    },
    {
      icon: Users,
      title: 'Lead Nurturing & Follow-Up',
      description: 'Intelligent lead scoring and automated nurturing workflows. Predictive timeline analysis and personalized re-engagement campaigns.',
      stats: '70% conversion lift',
    },
    {
      icon: Brain,
      title: 'Property Recommendation Engine',
      description: 'AI-powered matching using collaborative filtering and content-based algorithms. Real-time searches across 650+ markets with 85%+ accuracy.',
      stats: '<2 sec matching',
    },
    {
      icon: Target,
      title: 'Predictive Lead Generation',
      description: 'Identifies high-probability buyers and sellers before they actively search. 72% accuracy predicting homeowners likely to list within 6-12 months.',
      stats: '72% accuracy',
    },
    {
      icon: LineChart,
      title: 'Market Forecasting Agent',
      description: 'Time-series prediction models for 3, 6, and 12-month horizons. Investment opportunity detection and risk assessment modeling.',
      stats: '3-12 month forecasts',
    },
  ]

  return (
    <section id="features" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
            <span className="text-sm font-medium">Comprehensive AI Ecosystem</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything you need to automate real estate operations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Our AI agents work together seamlessly to handle every aspect of your real estate business, from market intelligence to client engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-border bg-card relative">
                <BorderBeam 
                  size={250} 
                  duration={18} 
                  delay={index * 2}
                  colorFrom="#3b82f6"
                  colorTo="#06b6d4"
                />
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-primary">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {feature.stats}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
