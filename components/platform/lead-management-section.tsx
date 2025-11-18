import { Card } from '@/components/ui/card'
import { Database, Target, Star, BarChart2 } from 'lucide-react'

export function LeadManagementSection() {
  const features = [
    {
      icon: Database,
      title: 'Lead Aggregation',
      description: 'Supports importing and aggregating leads from over 30 third-party services into one unified system.'
    },
    {
      icon: Target,
      title: 'Automated Nurturing',
      description: 'Personalized, behavior-driven outreach keeps leads engaged over time without manual effort.'
    },
    {
      icon: Star,
      title: 'Lead Scoring',
      description: 'Prioritizes high-intent leads with activity-based insights so you focus on what matters most.'
    },
    {
      icon: BarChart2,
      title: 'Performance Tracking',
      description: 'Real-time dashboards analyze campaign, lead source, and revenue metrics for data-driven decisions.'
    }
  ]

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lead Management & Intelligence
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Convert more leads with intelligent automation and data-driven prioritization.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
