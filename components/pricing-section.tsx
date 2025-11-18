import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'

export function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$299',
      period: '/month',
      description: 'Perfect for individual agents getting started with AI',
      features: [
        '24/7 AI Client Assistant',
        'Up to 500 leads/month',
        'Basic market insights',
        'Email support',
        'Lead nurturing automation',
        '1 user license',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '$699',
      period: '/month',
      description: 'Ideal for growing agencies and teams',
      features: [
        'Everything in Starter',
        'Unlimited leads',
        'Advanced predictive analytics',
        'Priority support',
        'Custom AI training',
        'Up to 5 user licenses',
        'CRM integration',
        'White-label options',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large organizations',
      features: [
        'Everything in Professional',
        'Unlimited user licenses',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom integrations',
        'On-premise deployment option',
        'Advanced security features',
        'Custom SLA',
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose the perfect plan for your real estate business. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              <BorderBeam 
                size={300} 
                duration={12} 
                delay={index * 2}
                colorFrom="#60a5fa"
                colorTo="#3b82f6"
              />
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
