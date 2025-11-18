import { HeroSection } from '@/components/hero-section'
import { StatsSection } from '@/components/stats-section'
import { FreeToolSection } from '@/components/free-tool-section'
import { FeaturesSection } from '@/components/features-section'
import { AgentCardsSection } from '@/components/agent-cards-section'
import { PricingSection } from '@/components/pricing-section'
import { QuestionnaireSection } from '@/components/questionnaire-section'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FreeToolSection />
      <FeaturesSection />
      <AgentCardsSection />
      <PricingSection />
      <QuestionnaireSection />
      <CTASection />
      <Footer />
    </main>
  )
}
