import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export function PlatformCTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground">
            Join thousands of agents who have streamlined their workflow and increased their revenue with Welcome Home Agency.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/#questionnaire">
                Get Custom Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/search">
                <MessageSquare className="mr-2 h-4 w-4" />
                Try Free Chat Agent
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
