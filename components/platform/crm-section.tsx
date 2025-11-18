import { Card } from '@/components/ui/card'
import { Users, Calendar, MessageSquare, Settings } from 'lucide-react'

export function CRMSection() {
  const features = [
    {
      icon: Users,
      title: 'Unified Contact Records',
      description: 'Shows a live timeline of all prospect and client activity in one centralized location.'
    },
    {
      icon: Calendar,
      title: 'Next Steps & Reminders',
      description: 'Built-in reminders and follow-up scheduling keep agents organized and on track.'
    },
    {
      icon: MessageSquare,
      title: 'Communication Tools',
      description: 'Initiate calls, texts, and emails directly from the CRM or mobile app for seamless client engagement.'
    },
    {
      icon: Settings,
      title: 'Team Controls',
      description: 'Manage assignments, visibility, and access for team or brokerage structures with ease.'
    }
  ]

  return (
    <section className="bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Advanced CRM
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Keep every client relationship organized with intelligent contact management and automated follow-ups.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
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
