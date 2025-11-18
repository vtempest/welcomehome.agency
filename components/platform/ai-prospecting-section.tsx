import { Card } from '@/components/ui/card'
import { Sparkles, Users, Bell, TrendingUp } from 'lucide-react'

export function AIProspectingSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 py-24 sm:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
              <Sparkles className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI-Powered Prospect Targeting
          </h2>
          <p className="mt-4 text-pretty text-lg text-slate-300">
            Pro Add-on: Harness the power of AI to identify and nurture high-likelihood seller prospects automatically.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          <Card className="border-blue-500/20 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-500/10 p-3">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">AI-Identified Prospects</h3>
            <p className="text-sm text-slate-400">
              Adds up to 50 new, high-likelihood seller leads monthly using county records and proprietary data.
            </p>
          </Card>

          <Card className="border-blue-500/20 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-500/10 p-3">
              <TrendingUp className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Continuous Nurturing</h3>
            <p className="text-sm text-slate-400">
              System keeps these prospects engaged with personalized content and timely outreach.
            </p>
          </Card>

          <Card className="border-blue-500/20 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-500/10 p-3">
              <Bell className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">Ready-to-Act Alerts</h3>
            <p className="text-sm text-slate-400">
              Alerts you the moment prospects are ready to take action, ensuring perfect timing.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
