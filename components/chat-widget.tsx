'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || status === 'in_progress') return

    sendMessage({ text: inputValue })
    setInputValue('')
  }

  return (
    <>
      {/* Chat Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] flex flex-col shadow-2xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Property Assistant</h3>
                <p className="text-xs opacity-90">Ask me anything about homes</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <Bot className="h-12 w-12 mx-auto mb-3 text-primary" />
                <p className="text-sm mb-2">Hi! I'm your property assistant.</p>
                <p className="text-xs">
                  Ask me about homes, neighborhoods, or calculate mortgage payments.
                </p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-2',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                <div
                  className={cn(
                    'rounded-lg px-3 py-2 max-w-[80%]',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  )}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === 'text') {
                      return (
                        <p key={index} className="text-sm whitespace-pre-wrap">
                          {part.text}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                    <User className="h-4 w-4 text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}

            {status === 'in_progress' && (
              <div className="flex gap-2 justify-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="rounded-lg px-3 py-2 bg-muted">
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

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-border bg-card"
          >
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about properties..."
                disabled={status === 'in_progress'}
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || status === 'in_progress'}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  )
}
