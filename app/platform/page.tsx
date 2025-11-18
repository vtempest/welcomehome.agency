export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-background">
      <PlatformHero />
      <IDXWebsiteSection />
      <CRMSection />
      <MarketingAutomationSection />
      <MobileAppSection />
      <LeadManagementSection />
      <AIProspectingSection />
      <TeamBrokerageSection />
      <AdditionalCapabilities />
      <PlatformCTA />
      <Footer />
    </main>
  )
}

import { PlatformHero } from '@/components/platform/platform-hero'
import { IDXWebsiteSection } from '@/components/platform/idx-website-section'
import { CRMSection } from '@/components/platform/crm-section'
import { MarketingAutomationSection } from '@/components/platform/marketing-automation-section'
import { MobileAppSection } from '@/components/platform/mobile-app-section'
import { LeadManagementSection } from '@/components/platform/lead-management-section'
import { AIProspectingSection } from '@/components/platform/ai-prospecting-section'
import { TeamBrokerageSection } from '@/components/platform/team-brokerage-section'
import { AdditionalCapabilities } from '@/components/platform/additional-capabilities'
import { PlatformCTA } from '@/components/platform/platform-cta'
import { Footer } from '@/components/footer'
