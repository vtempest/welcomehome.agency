import { Button } from '@/components/ui/button'
import { ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'

export function PlatformHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 py-24 sm:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
              <Home className="h-12 w-12 text-blue-400" />
            </div>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Welcome Home Agency Platform
          </h1>
          <p className="mt-6 text-pretty text-lg leading-8 text-slate-300">
            An all-in-one solution designed for real estate agents and teams, focusing on lead generation, 
            CRM, marketing automation, and mobile access. Everything you need to grow your real estate business.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <Link href="/#questionnaire">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/search">
                Try Free Chat Agent
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
