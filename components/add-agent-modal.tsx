'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Search, Plus } from 'lucide-react'
import { AI_AGENTS, type Agent } from '@/components/agent-selector'

const CATEGORIES = Array.from(new Set(AI_AGENTS.map(agent => agent.category))).sort()

interface AddAgentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddAgent: (agent: Agent) => void
  existingAgents: Agent[]
}

export function AddAgentModal({ open, onOpenChange, onAddAgent, existingAgents }: AddAgentModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredAgents = AI_AGENTS.filter(agent => {
    const matchesSearch = !searchQuery || 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !selectedCategory || agent.category === selectedCategory
    
    const notAlreadyAdded = !existingAgents.some(existing => existing.name === agent.name)
    
    return matchesSearch && matchesCategory && notAlreadyAdded
  })

  const groupedAgents = CATEGORIES.reduce((acc, category) => {
    acc[category] = filteredAgents.filter(agent => agent.category === category)
    return acc
  }, {} as Record<string, Agent[]>)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Add AI Agent</DialogTitle>
          <DialogDescription>
            Select an AI agent to add to your dashboard
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All ({AI_AGENTS.length})
            </Button>
            {CATEGORIES.map(category => {
              const count = AI_AGENTS.filter(a => a.category === category).length
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({count})
                </Button>
              )
            })}
          </div>

          <ScrollArea className="h-[400px] border rounded-lg p-4">
            {CATEGORIES.map(category => {
              const agents = groupedAgents[category]
              if (agents.length === 0) return null

              return (
                <div key={category} className="mb-6 last:mb-0">
                  <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    {category}
                    <Badge variant="secondary">{agents.length}</Badge>
                  </h3>
                  <div className="space-y-2">
                    {agents.map(agent => (
                      <div
                        key={agent.name}
                        className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1">{agent.name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {agent.description}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            onAddAgent(agent)
                            onOpenChange(false)
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
