'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Send, Bot, User, Home, DollarSign, MapPin, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SearchPage() {
  const [inputValue, setInputValue] = useState('')

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const sampleQuestions = [
    {
      icon: Home,
      text: 'Show me 3-bedroom homes under $500k',
      query: 'Show me 3-bedroom homes under $500k'
    },
    {
      icon: MapPin,
      text: 'Find apartments in downtown Seattle',
      query: 'Find apartments in downtown Seattle'
    },
    {
      icon: DollarSign,
      text: 'What can I afford with a $3000/month budget?',
      query: 'What can I afford with a $3000/month budget?'
    },
    {
      icon: Sparkles,
      text: 'Best neighborhoods for families',
      query: 'What are the best neighborhoods for families?'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || status === 'in_progress') return

    sendMessage({ text: inputValue })
    setInputValue('')
  }

  const handleSampleClick = (query: string) => {
    if (status === 'in_progress') return
    sendMessage({ text: query })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-foreground">
              Welcome Home Agency
            </a>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a href="/saved">Saved Properties</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/compare">Compare</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Find Your Dream Home
            </h1>
            <p className="text-muted-foreground">
              Ask me anything about properties, neighborhoods, or home buying
            </p>
          </div>
        )}

        {/* Sample Questions */}
        {messages.length === 0 && (
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {sampleQuestions.map((question, index) => (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleSampleClick(question.query)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <question.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground pt-2">
                    {question.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Chat Messages */}
        <div className="space-y-6 mb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
              )}

              <div
                className={cn(
                  'rounded-2xl px-4 py-3 max-w-[85%]',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                )}
              >
                {message.parts.map((part, index) => {
                  if (part.type === 'text') {
                    return (
                      <p key={index} className="text-sm whitespace-pre-wrap leading-relaxed">
                        {part.text}
                      </p>
                    )
                  }
                  if (part.type === 'tool-result' && part.result) {
                    const result = part.result as any
                    if (result.properties && Array.isArray(result.properties)) {
                      return (
                        <div key={index} className="space-y-3 mt-3">
                          {result.properties.map((property: any) => (
                            <Card key={property.id} className="p-3 bg-card">
                              <div className="flex gap-3">
                                <img
                                  src={property.image || "/placeholder.svg"}
                                  alt={property.title}
                                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm text-foreground mb-1">
                                    {property.title}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mb-2">
                                    {property.location}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <p className="text-lg font-bold text-primary">
                                      ${property.price.toLocaleString()}
                                    </p>
                                    <div className="flex gap-2 text-xs text-muted-foreground">
                                      <span>{property.beds} bed</span>
                                      <span>•</span>
                                      <span>{property.baths} bath</span>
                                      <span>•</span>
                                      <span>{property.sqft} sqft</span>
                                    </div>
                                  </div>
                                  <Button size="sm" className="w-full mt-2" variant="outline">
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )
                    }
                  }
                  return null
                })}
              </div>

              {message.role === 'user' && (
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <User className="h-5 w-5 text-accent-foreground" />
                </div>
              )}
            </div>
          ))}

          {status === 'in_progress' && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-muted">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="sticky bottom-0 bg-background pb-4">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 bg-card rounded-full border border-border p-2 shadow-lg">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about properties..."
                disabled={status === 'in_progress'}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || status === 'in_progress'}
                className="rounded-full h-10 w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
