'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

export function QuestionnaireSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '',
    currentCRM: '',
    goals: [] as string[],
    challenges: '',
    budget: '',
    timeline: '',
  })

  const goalOptions = [
    'Increase lead conversion',
    'Save time on admin tasks',
    'Improve client communication',
    'Get better market insights',
    'Automate follow-ups',
    'Scale operations',
  ]

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Form submitted:', formData)
    // Handle form submission
  }

  return (
    <section id="quote" className="py-24 bg-muted/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Get Your Custom Quote
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Tell us about your needs and we'll create a tailored solution for your real estate business.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Custom Needs Assessment</CardTitle>
            <CardDescription>
              Fill out this questionnaire to help us understand your requirements better.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Agency Name</Label>
                  <Input
                    id="company"
                    placeholder="Acme Real Estate"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              {/* Business Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size *</Label>
                  <Select value={formData.teamSize} onValueChange={(value) => setFormData({ ...formData, teamSize: value })}>
                    <SelectTrigger id="teamSize">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Just me</SelectItem>
                      <SelectItem value="2-5">2-5 people</SelectItem>
                      <SelectItem value="6-10">6-10 people</SelectItem>
                      <SelectItem value="11-25">11-25 people</SelectItem>
                      <SelectItem value="26-50">26-50 people</SelectItem>
                      <SelectItem value="51+">51+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentCRM">Current CRM (if any)</Label>
                  <Input
                    id="currentCRM"
                    placeholder="Salesforce, HubSpot, etc."
                    value={formData.currentCRM}
                    onChange={(e) => setFormData({ ...formData, currentCRM: e.target.value })}
                  />
                </div>
              </div>

              {/* Goals */}
              <div className="space-y-3">
                <Label>What are your main goals? * (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {goalOptions.map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal}
                        checked={formData.goals.includes(goal)}
                        onCheckedChange={() => handleGoalToggle(goal)}
                      />
                      <label
                        htmlFor={goal}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {goal}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div className="space-y-2">
                <Label htmlFor="challenges">What are your biggest challenges? *</Label>
                <Textarea
                  id="challenges"
                  placeholder="Tell us about the pain points you're experiencing..."
                  value={formData.challenges}
                  onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              {/* Budget and Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Monthly Budget Range</Label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-500">Under $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                      <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                      <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                      <SelectItem value="5000+">$5,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">When do you want to start?</Label>
                  <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                    <SelectTrigger id="timeline">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="just-exploring">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Get Your Custom Quote
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
