import { Card } from '@/components/ui/card'
import { Smartphone, Zap, CheckSquare, BarChart3 } from 'lucide-react'
import Image from 'next/image'

export function MobileAppSection() {
  const features = [
    {
      icon: Zap,
      title: 'Instant Push Alerts',
      description: 'Speed-to-lead notifications and one-tap follow-up make sure no prospect falls through the cracks.'
    },
    {
      icon: CheckSquare,
      title: 'Daily Habits Screen',
      description: 'Prioritized to-do lists and daily sales tracking help agents stay productive from anywhere.'
    },
    {
      icon: BarChart3,
      title: 'Sales Tracker',
      description: 'Monitor goals and pipeline performance on the go with real-time dashboards.'
    }
  ]

  return (
    <section className="bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3 ring-1 ring-primary/20">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Mobile App
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Take your business anywhere with our powerful mobile app designed for agents on the move.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
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
