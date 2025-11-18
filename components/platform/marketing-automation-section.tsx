import { Card } from '@/components/ui/card'
import { Mail, Share2, Bell, TrendingUp } from 'lucide-react'

export function MarketingAutomationSection() {
  const features = [
    {
      icon: Mail,
      title: 'Automated Campaigns',
      description: 'Sends listing alerts, emails, SMS, and market updates tailored to each contact\'s behavior and history.'
    },
    {
      icon: Share2,
      title: 'Social Posting',
      description: 'AI-powered posting to Facebook, with Instagram and blog integrations coming soon.'
    },
    {
      icon: Bell,
      title: 'Re-engagement Alerts',
      description: 'Notifies agents via mobile when clients re-engage with properties or content.'
    },
    {
      icon: TrendingUp,
      title: 'Behavior-Driven Outreach',
      description: 'Personalized messaging based on user activity ensures higher engagement rates.'
    }
  ]

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Marketing Automation
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Stay top-of-mind with clients through intelligent, automated marketing that works 24/7.
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
