import { Card } from '@/components/ui/card'
import { Users, Globe, FileText, Settings } from 'lucide-react'

export function TeamBrokerageSection() {
  const features = [
    {
      icon: Users,
      title: 'Team Features',
      description: 'Lead assignment rules, agent-branded campaigns, and agent bio/team pages for seamless collaboration.'
    },
    {
      icon: Globe,
      title: 'Custom Websites',
      description: 'Fast setup of standalone real estate sites or simple integration into WordPress, Wix, or other platforms.'
    },
    {
      icon: FileText,
      title: 'Market Reports',
      description: 'Customizable market reporting tools for communication and branding that establish you as a market expert.'
    },
    {
      icon: Settings,
      title: 'Expansion Ready',
      description: 'Built to scale with your growing team or brokerage with flexible permissions and controls.'
    }
  ]

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Team, Brokerage & Expansion
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Scale your business with powerful team management and customization tools.
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
