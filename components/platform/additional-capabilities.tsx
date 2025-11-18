import { Card } from '@/components/ui/card'
import { Mail, TrendingUp, GraduationCap, Headphones } from 'lucide-react'

export function AdditionalCapabilities() {
  const capabilities = [
    {
      icon: Mail,
      title: 'Custom Campaigns',
      description: 'Run targeted automated or manual email campaigns for branding and nurturing specific audiences.'
    },
    {
      icon: TrendingUp,
      title: 'TrafficBoost',
      description: 'Add-on services to increase website traffic and lead flow through strategic digital marketing.'
    },
    {
      icon: GraduationCap,
      title: 'Coaching & Training',
      description: 'Real estate coaching and strong customer support throughout setup and maintenance.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated support team available to help you maximize your success with the platform.'
    }
  ]

  return (
    <section className="bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Additional Capabilities
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Everything else you need to succeed, all in one comprehensive platform.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                <capability.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{capability.title}</h3>
              <p className="text-sm text-muted-foreground">{capability.description}</p>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8">
            <h3 className="text-center text-2xl font-bold text-foreground">
              Why Agents Choose Welcome Home Agency
            </h3>
            <p className="mt-4 text-center text-muted-foreground">
              Agents and teams using Welcome Home Agency report improved visibility, faster lead response times, 
              consolidated tools, and strong support—all of which reduce the need for multiple systems and 
              dramatically improve their bottom line.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
