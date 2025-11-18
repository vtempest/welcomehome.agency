'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { BorderBeam } from '@/components/ui/border-beam'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Question {
  id: string
  section: string
  question: string
  options: {
    label: string
    value: string
    description: string
  }[]
}

const surveyQuestions: Question[] = [
  // Section 1: Lead Response & Management
  {
    id: 'q1',
    section: 'Lead Response & Management',
    question: 'What percentage of your internet leads receive a response within the first 5 minutes?',
    options: [
      { label: 'A', value: 'a', description: 'Less than 10% - We struggle with immediate response' },
      { label: 'B', value: 'b', description: '10-30% - Some quick responses during business hours only' },
      { label: 'C', value: 'c', description: '30-60% - Good coverage during business hours, gaps after hours' },
      { label: 'D', value: 'd', description: 'Over 60% - Strong response system already in place' },
    ],
  },
  {
    id: 'q2',
    section: 'Lead Response & Management',
    question: 'What percentage of your leads receive systematic follow-up after initial contact?',
    options: [
      { label: 'A', value: 'a', description: 'Less than 25% - Follow-up is sporadic and agent-dependent' },
      { label: 'B', value: 'b', description: '25-50% - Some agents follow up consistently, others don\'t' },
      { label: 'C', value: 'c', description: '50-75% - Most leads get follow-up but timing varies' },
      { label: 'D', value: 'd', description: 'Over 75% - Systematic follow-up process in place' },
    ],
  },
  {
    id: 'q3',
    section: 'Lead Response & Management',
    question: 'How much time does your team spend manually qualifying each lead (budget, timeline, preferences)?',
    options: [
      { label: 'A', value: 'a', description: 'Over 45 minutes per lead - Extensive manual process' },
      { label: 'B', value: 'b', description: '20-45 minutes per lead - Standard qualification process' },
      { label: 'C', value: 'c', description: '10-20 minutes per lead - Some automation in place' },
      { label: 'D', value: 'd', description: 'Under 10 minutes - Highly efficient or automated' },
    ],
  },
  // Section 2: Property & Listing Management
  {
    id: 'q4',
    section: 'Property & Listing Management',
    question: 'How many property data sources does your team actively monitor?',
    options: [
      { label: 'A', value: 'a', description: '1-3 sources - Primarily MLS only' },
      { label: 'B', value: 'b', description: '4-7 sources - MLS plus major platforms (Zillow, Redfin)' },
      { label: 'C', value: 'c', description: '8-15 sources - Multiple platforms including some local sources' },
      { label: 'D', value: 'd', description: '15+ sources - Comprehensive multi-source monitoring' },
    ],
  },
  {
    id: 'q5',
    section: 'Property & Listing Management',
    question: 'How long does it typically take to create a complete property listing?',
    options: [
      { label: 'A', value: 'a', description: 'Over 3 hours - Fully manual process' },
      { label: 'B', value: 'b', description: '1.5-3 hours - Some templates but mostly manual' },
      { label: 'C', value: 'c', description: '45-90 minutes - Partial automation with templates' },
      { label: 'D', value: 'd', description: 'Under 45 minutes - Highly automated process' },
    ],
  },
  {
    id: 'q6',
    section: 'Property & Listing Management',
    question: 'How do you currently match clients with properties?',
    options: [
      { label: 'A', value: 'a', description: 'Manual search by agents based on memory and experience' },
      { label: 'B', value: 'b', description: 'Basic CRM filters with manual agent review' },
      { label: 'C', value: 'c', description: 'CRM with saved searches and email alerts' },
      { label: 'D', value: 'd', description: 'Advanced matching with behavioral tracking and AI recommendations' },
    ],
  },
  // Section 3: Transaction Coordination
  {
    id: 'q7',
    section: 'Transaction Coordination',
    question: 'What percentage of transactions experience delays due to missed deadlines?',
    options: [
      { label: 'A', value: 'a', description: 'Over 20% - Frequent deadline-related delays' },
      { label: 'B', value: 'b', description: '10-20% - Regular but manageable delays' },
      { label: 'C', value: 'c', description: '5-10% - Occasional delays' },
      { label: 'D', value: 'd', description: 'Under 5% - Rare deadline issues' },
    ],
  },
  {
    id: 'q8',
    section: 'Transaction Coordination',
    question: 'What percentage of transaction coordinator time is spent on administrative tasks?',
    options: [
      { label: 'A', value: 'a', description: 'Over 70% - Mostly administrative work' },
      { label: 'B', value: 'b', description: '50-70% - Significant administrative burden' },
      { label: 'C', value: 'c', description: '30-50% - Balanced between admin and strategic work' },
      { label: 'D', value: 'd', description: 'Under 30% - Highly automated administration' },
    ],
  },
  {
    id: 'q9',
    section: 'Transaction Coordination',
    question: 'How long does it typically take to review a purchase contract?',
    options: [
      { label: 'A', value: 'a', description: 'Over 4 hours - Detailed manual review' },
      { label: 'B', value: 'b', description: '2-4 hours - Standard manual review' },
      { label: 'C', value: 'c', description: '1-2 hours - Some automated checks' },
      { label: 'D', value: 'd', description: 'Under 1 hour - Highly efficient or automated' },
    ],
  },
  // Section 4: Customer Communication
  {
    id: 'q10',
    section: 'Customer Communication',
    question: 'What percentage of your inquiries arrive outside business hours?',
    options: [
      { label: 'A', value: 'a', description: 'Over 40% - Significant after-hours volume' },
      { label: 'B', value: 'b', description: '25-40% - Notable after-hours activity' },
      { label: 'C', value: 'c', description: '15-25% - Moderate after-hours inquiries' },
      { label: 'D', value: 'd', description: 'Under 15% - Most inquiries during business hours' },
    ],
  },
  {
    id: 'q11',
    section: 'Customer Communication',
    question: 'How much time per week does your team spend on scheduling and rescheduling?',
    options: [
      { label: 'A', value: 'a', description: 'Over 10 hours/week - Major time investment' },
      { label: 'B', value: 'b', description: '5-10 hours/week - Significant scheduling overhead' },
      { label: 'C', value: 'c', description: '2-5 hours/week - Manageable scheduling time' },
      { label: 'D', value: 'd', description: 'Under 2 hours/week - Highly automated scheduling' },
    ],
  },
  {
    id: 'q12',
    section: 'Customer Communication',
    question: 'What percentage of your market speaks a language other than English as primary?',
    options: [
      { label: 'A', value: 'a', description: 'Over 30% - Highly diverse language needs' },
      { label: 'B', value: 'b', description: '15-30% - Significant language diversity' },
      { label: 'C', value: 'c', description: '5-15% - Some language diversity' },
      { label: 'D', value: 'd', description: 'Under 5% - Minimal language barriers' },
    ],
  },
  // Section 5: Operations & Analytics
  {
    id: 'q13',
    section: 'Operations & Analytics',
    question: 'What percentage of your CRM contains duplicate, incomplete, or outdated records?',
    options: [
      { label: 'A', value: 'a', description: 'Over 30% - Major data quality issues' },
      { label: 'B', value: 'b', description: '15-30% - Noticeable data problems' },
      { label: 'C', value: 'c', description: '5-15% - Minor data issues' },
      { label: 'D', value: 'd', description: 'Under 5% - Clean, well-maintained database' },
    ],
  },
  {
    id: 'q14',
    section: 'Operations & Analytics',
    question: 'How are leads currently assigned to agents?',
    options: [
      { label: 'A', value: 'a', description: 'Round-robin or manual assignment only' },
      { label: 'B', value: 'b', description: 'Basic territory or specialty rules' },
      { label: 'C', value: 'c', description: 'Rule-based with some performance metrics' },
      { label: 'D', value: 'd', description: 'AI-driven routing based on conversion probability' },
    ],
  },
  {
    id: 'q15',
    section: 'Operations & Analytics',
    question: 'What percentage of your database consists of leads over 6 months old with no recent activity?',
    options: [
      { label: 'A', value: 'a', description: 'Over 50% - Large dormant database' },
      { label: 'B', value: 'b', description: '30-50% - Significant dormant leads' },
      { label: 'C', value: 'c', description: '15-30% - Moderate dormant population' },
      { label: 'D', value: 'd', description: 'Under 15% - Active engagement with most leads' },
    ],
  },
]

export function SurveyForm() {
  const [needsAssessment, setNeedsAssessment] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '',
    currentCRM: '',
    goals: [] as string[],
    painPoints: '',
    budget: '',
  })
  const [answers, setAnswers] = useState<Record<string, { type: 'option' | 'custom'; value: string }>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleNeedsChange = (field: string, value: string | string[]) => {
    setNeedsAssessment(prev => ({ ...prev, [field]: value }))
  }

  const handleGoalToggle = (goal: string) => {
    setNeedsAssessment(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal],
    }))
  }

  const handleOptionChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { type: 'option', value },
    }))
  }

  const handleCustomChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { type: 'custom', value },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Calculate score
    let score = 0
    Object.values(answers).forEach(answer => {
      if (answer.type === 'option') {
        const points = { a: 0, b: 25, c: 50, d: 75 }[answer.value] || 0
        score += points
      }
    })

    console.log('Needs Assessment:', needsAssessment)
    console.log('Survey submitted:', answers)
    console.log('Score:', score)
    setSubmitted(true)
  }

  const getScoreInterpretation = (score: number) => {
    if (score <= 25) {
      return {
        title: 'High AI Impact Potential',
        description: 'Your operations have significant manual processes that could benefit immediately from AI automation.',
        priorities: 'Lead response automation, basic workflow automation, and 24/7 chatbot implementation.',
      }
    } else if (score <= 50) {
      return {
        title: 'Strong AI Opportunity',
        description: 'You have some systems in place but considerable room for improvement.',
        priorities: 'Intelligent lead routing, automated follow-up sequences, and transaction coordination AI.',
      }
    } else if (score <= 75) {
      return {
        title: 'Selective AI Enhancement',
        description: 'Your operations are relatively efficient with specific optimization opportunities.',
        priorities: 'Advanced predictive analytics, AI-powered market analysis, and sophisticated property matching algorithms.',
      }
    } else {
      return {
        title: 'AI Optimization Ready',
        description: 'You have strong operational foundations.',
        priorities: 'Cutting-edge AI applications like predictive transaction modeling, advanced negotiation support, and comprehensive market intelligence systems.',
      }
    }
  }

  if (submitted) {
    const answeredQuestions = Object.keys(answers).length
    const score = Object.values(answers).reduce((acc, answer) => {
      if (answer.type === 'option') {
        const points = { a: 0, b: 25, c: 50, d: 75 }[answer.value] || 0
        return acc + points
      }
      return acc
    }, 0)

    const interpretation = getScoreInterpretation(score / answeredQuestions)

    return (
      <Card className="relative overflow-hidden">
        <BorderBeam size={250} duration={12} delay={0} />
        <CardHeader>
          <CardTitle>Thank You for Completing the Survey!</CardTitle>
          <CardDescription>Your AI Readiness Assessment Results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {Math.round(score / answeredQuestions)}/100
            </div>
            <div className="text-xl font-semibold text-foreground mb-2">
              {interpretation.title}
            </div>
            <p className="text-muted-foreground mb-4">
              {interpretation.description}
            </p>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Recommended Focus Areas:</h3>
              <p className="text-sm text-muted-foreground">
                {interpretation.priorities}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Next Steps:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Contact our AI implementation team for a customized automation strategy</li>
              <li>Schedule a demo to see how our AI agents can transform your operations</li>
              <li>Explore our platform features tailored to your assessment results</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => setSubmitted(false)}>
              Retake Survey
            </Button>
            <Button variant="outline" asChild>
              <a href="/dashboard?demo=true">View Demo Dashboard</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  let currentSection = ''

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Custom Needs Assessment section at the top */}
      <Card className="relative overflow-hidden">
        <BorderBeam size={250} duration={12} delay={0} />
        <CardHeader>
          <CardTitle className="text-2xl">Custom Needs Assessment</CardTitle>
          <CardDescription>
            Fill out this questionnaire to help us understand your requirements better.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={needsAssessment.name}
                onChange={(e) => handleNeedsChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={needsAssessment.email}
                onChange={(e) => handleNeedsChange('email', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={needsAssessment.phone}
                onChange={(e) => handleNeedsChange('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="Acme Real Estate"
                value={needsAssessment.company}
                onChange={(e) => handleNeedsChange('company', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamSize">Team Size</Label>
            <Select value={needsAssessment.teamSize} onValueChange={(value) => handleNeedsChange('teamSize', value)}>
              <SelectTrigger id="teamSize">
                <SelectValue placeholder="Select team size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 agents</SelectItem>
                <SelectItem value="6-10">6-10 agents</SelectItem>
                <SelectItem value="11-25">11-25 agents</SelectItem>
                <SelectItem value="26-50">26-50 agents</SelectItem>
                <SelectItem value="51-100">51-100 agents</SelectItem>
                <SelectItem value="100+">100+ agents</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentCRM">Current CRM/Tools</Label>
            <Input
              id="currentCRM"
              placeholder="Salesforce, HubSpot, etc."
              value={needsAssessment.currentCRM}
              onChange={(e) => handleNeedsChange('currentCRM', e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>Business Goals (Select all that apply)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'Increase lead conversion',
                'Save time on admin tasks',
                'Improve client communication',
                'Get better market insights',
                'Automate follow-ups',
                'Scale operations',
              ].map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={needsAssessment.goals.includes(goal)}
                    onCheckedChange={() => handleGoalToggle(goal)}
                  />
                  <Label htmlFor={goal} className="font-normal cursor-pointer">
                    {goal}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="painPoints">Current Pain Points</Label>
            <Textarea
              id="painPoints"
              placeholder="Tell us about the pain points you're experiencing..."
              value={needsAssessment.painPoints}
              onChange={(e) => handleNeedsChange('painPoints', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range</Label>
            <Select value={needsAssessment.budget} onValueChange={(value) => handleNeedsChange('budget', value)}>
              <SelectTrigger id="budget">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-500">Under $500/month</SelectItem>
                <SelectItem value="500-1000">$500-$1,000/month</SelectItem>
                <SelectItem value="1000-2500">$1,000-$2,500/month</SelectItem>
                <SelectItem value="2500-5000">$2,500-$5,000/month</SelectItem>
                <SelectItem value="5000+">$5,000+/month</SelectItem>
                <SelectItem value="enterprise">Enterprise (Custom pricing)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="pt-8 border-t">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          AI Agent Readiness Assessment
        </h2>
        <p className="text-muted-foreground mb-6">
          Select the answer that best describes your current situation for each question below.
        </p>
      </div>

      {surveyQuestions.map((question, index) => {
        const showSectionHeader = currentSection !== question.section
        if (showSectionHeader) {
          currentSection = question.section
        }

        return (
          <div key={question.id}>
            {showSectionHeader && (
              <h2 className="text-2xl font-bold text-foreground mb-4 mt-8 first:mt-0">
                Section {Math.floor(index / 3) + 1}: {question.section}
              </h2>
            )}
            
            <Card className="relative overflow-hidden">
              <BorderBeam size={250} duration={12} delay={index * 0.5} />
              <CardHeader>
                <CardTitle className="text-lg">
                  Question {index + 1}: {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={answers[question.id]?.type === 'option' ? answers[question.id].value : ''}
                  onValueChange={(value) => handleOptionChange(question.id, value)}
                >
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-start space-x-3 space-y-0">
                      <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                      <Label
                        htmlFor={`${question.id}-${option.value}`}
                        className="font-normal cursor-pointer leading-relaxed"
                      >
                        <span className="font-semibold">{option.label})</span> {option.description}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="space-y-2 pt-2 border-t">
                  <Label htmlFor={`${question.id}-custom`} className="text-sm font-medium">
                    Or provide your own answer:
                  </Label>
                  <Textarea
                    id={`${question.id}-custom`}
                    placeholder="Type your custom response here..."
                    value={answers[question.id]?.type === 'custom' ? answers[question.id].value : ''}
                    onChange={(e) => handleCustomChange(question.id, e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}

      <div className="flex justify-center pt-8">
        <Button type="submit" size="lg" className="px-8">
          Submit Survey
        </Button>
      </div>
    </form>
  )
}
