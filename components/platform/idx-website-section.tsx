import { Card } from '@/components/ui/card'
import { Globe, Zap, Search, Smartphone, Activity } from 'lucide-react'

export function IDXWebsiteSection() {
  const features = [
    {
      icon: Zap,
      title: 'Real-time MLS Integration',
      description: 'Pulls up-to-date property listings directly from MLS feeds to your website, keeping data current for visitors at all times.'
    },
    {
      icon: Globe,
      title: 'Built-in Lead Capture',
      description: 'Uses saved searches, alerts, and forms to turn site visitors into actionable leads automatically.'
    },
    {
      icon: Search,
      title: 'SEO-Optimized Market Pages',
      description: 'Enables agents to rank in their target locations and improve web visibility with optimized content.'
    },
    {
      icon: Smartphone,
      title: 'Modern Mobile Design',
      description: 'Fully responsive and branded for agent/team identity, ensuring a seamless experience on any device.'
    },
    {
      icon: Activity,
      title: 'Activity Tracking',
      description: 'Tracks every user interaction—clicks, views, and saves—for better insights into client behavior.'
    }
  ]

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            IDX Website & Lead Capture
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Transform your website into a powerful lead generation machine with real-time MLS data and intelligent tracking.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
