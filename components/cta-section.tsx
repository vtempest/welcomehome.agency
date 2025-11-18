import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
          Ready to transform your real estate business?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
          Join hundreds of agents already using AI to save time, close more deals, and deliver exceptional client experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-base px-8">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8" asChild>
            <a href="/platform">View Platform Details</a>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  )
}
