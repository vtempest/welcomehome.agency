import { SurveyForm } from '@/components/survey-form'

export const metadata = {
  title: 'Realtor Survey - Welcome Home Agency',
  description: 'AI Agent Readiness Assessment Survey for Real Estate Companies',
}

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Agent Readiness Assessment Survey
          </h1>
          <p className="text-lg text-muted-foreground">
            Help us identify the highest-impact AI automation opportunities for your real estate business.
            Select the answer that best describes your current situation for each question.
          </p>
        </div>
        
        <SurveyForm />
      </div>
    </div>
  )
}
