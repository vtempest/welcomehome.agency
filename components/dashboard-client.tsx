'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { TrendingUp, TrendingDown, Mail, MessageSquare, Phone, Calendar, Users, Target, Activity, Bell, Search, Filter, MoreVertical, Bot, Zap, Clock, LogOut, Plus, X, Home } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { type Agent } from '@/components/agent-selector'
import { AddAgentModal } from '@/components/add-agent-modal'

const DEMO_PROPERTIES = [
  { id: 1, address: '123 Oak Street', city: 'Austin', state: 'TX', price: 450000, beds: 3, baths: 2, sqft: 1800, status: 'Active', lastUpdated: '2024-01-15' },
  { id: 2, address: '456 Maple Ave', city: 'Austin', state: 'TX', price: 625000, beds: 4, baths: 3, sqft: 2400, status: 'Active', lastUpdated: '2024-01-14' },
  { id: 3, address: '789 Pine Road', city: 'Dallas', state: 'TX', price: 385000, beds: 3, baths: 2.5, sqft: 2100, status: 'Pending', lastUpdated: '2024-01-13' },
  { id: 4, address: '321 Elm Circle', city: 'Houston', state: 'TX', price: 725000, beds: 5, baths: 4, sqft: 3200, status: 'Active', lastUpdated: '2024-01-12' },
  { id: 5, address: '654 Cedar Lane', city: 'San Antonio', state: 'TX', price: 295000, beds: 2, baths: 2, sqft: 1400, status: 'Active', lastUpdated: '2024-01-11' },
  { id: 6, address: '987 Birch Drive', city: 'Austin', state: 'TX', price: 550000, beds: 4, baths: 3, sqft: 2600, status: 'Active', lastUpdated: '2024-01-10' },
  { id: 7, address: '147 Willow Court', city: 'Dallas', state: 'TX', price: 485000, beds: 3, baths: 2.5, sqft: 2200, status: 'Active', lastUpdated: '2024-01-09' },
  { id: 8, address: '258 Ash Boulevard', city: 'Houston', state: 'TX', price: 895000, beds: 5, baths: 4.5, sqft: 3800, status: 'Active', lastUpdated: '2024-01-08' },
]

const monitoringAgents = [
  { 
    id: 1, 
    name: 'Price Tracker', 
    icon: TrendingUp, 
    status: 'active', 
    color: 'bg-blue-500',
    description: 'Monitoring 47 properties',
    lastUpdate: '2 min ago'
  },
  { 
    id: 2, 
    name: 'Lead Nurture', 
    icon: Users, 
    status: 'active', 
    color: 'bg-green-500',
    description: 'Engaging 23 leads',
    lastUpdate: '5 min ago'
  },
  { 
    id: 3, 
    name: 'Market Intel', 
    icon: Activity, 
    status: 'active', 
    color: 'bg-purple-500',
    description: 'Analyzing 3 markets',
    lastUpdate: '10 min ago'
  },
  { 
    id: 4, 
    name: 'Outreach Bot', 
    icon: Mail, 
    status: 'active', 
    color: 'bg-orange-500',
    description: 'Sent 156 messages today',
    lastUpdate: '1 min ago'
  },
  { 
    id: 5, 
    name: 'Appointment Scheduler', 
    icon: Calendar, 
    status: 'idle', 
    color: 'bg-teal-500',
    description: '8 upcoming meetings',
    lastUpdate: '30 min ago'
  },
]

const DEMO_PRICE_ALERTS = [
  {
    id: 1,
    address: '456 Maple Ave',
    city: 'Austin',
    state: 'TX',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2400,
    old_price: 650000,
    new_price: 625000,
    change_percentage: -3.8,
    image_url: '/modern-house-exterior.png'
  },
  {
    id: 2,
    address: '789 Pine Road',
    city: 'Dallas',
    state: 'TX',
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 2100,
    old_price: 375000,
    new_price: 385000,
    change_percentage: 2.7,
    image_url: '/luxury-apartment-building.png'
  },
]

const DEMO_CAMPAIGNS = [
  {
    id: 1,
    name: 'New Listing Alert - Austin',
    status: 'active',
    sent_count: 156,
    opened_count: 89,
    clicked_count: 34,
    leads_count: 12,
  },
  {
    id: 2,
    name: 'Price Drop Notification',
    status: 'active',
    sent_count: 203,
    opened_count: 127,
    clicked_count: 56,
    leads_count: 18,
  },
]

const DEMO_OUTREACH = [
  {
    id: 1,
    activity_type: 'email',
    contact_name: 'Sarah Johnson',
    subject: 'New properties matching your criteria',
    status: 'sent',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    activity_type: 'sms',
    contact_name: 'Mike Chen',
    subject: 'Price drop alert: 789 Pine Road',
    status: 'delivered',
    created_at: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 3,
    activity_type: 'email',
    contact_name: 'Emily Rodriguez',
    subject: 'Your saved search has new results',
    status: 'opened',
    created_at: new Date(Date.now() - 600000).toISOString(),
  },
]

interface DashboardClientProps {
  user: {
    id: string
    email: string
    name?: string | null
    image?: string | null
  }
  isDemo: boolean
}

export default function DashboardClient({ user, isDemo }: DashboardClientProps) {
  const [customAgents, setCustomAgents] = useState<Agent[]>([])
  const [addAgentModalOpen, setAddAgentModalOpen] = useState(false)
  const [selectedProperties, setSelectedProperties] = useState<number[]>([])
  const [selectedAgent, setSelectedAgent] = useState(monitoringAgents[0])
  const [priceAlerts, setPriceAlerts] = useState<any[]>([])
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [outreach, setOutreach] = useState<any[]>([])
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (isDemo) {
        setPriceAlerts(DEMO_PRICE_ALERTS)
        setCampaigns(DEMO_CAMPAIGNS)
        setOutreach(DEMO_OUTREACH)
        setProperties(DEMO_PROPERTIES)
        setLoading(false)
        return
      }

      try {
        const [alertsRes, campaignsRes, outreachRes, propertiesRes, agentsRes] = await Promise.all([
          fetch('/api/user/price-alerts'),
          fetch('/api/user/campaigns'),
          fetch('/api/user/outreach'),
          fetch('/api/user/properties'),
          fetch('/api/user/agents'),
        ])

        const alertsData = await alertsRes.json()
        const campaignsData = await campaignsRes.json()
        const outreachData = await outreachRes.json()
        const propertiesData = await propertiesRes.json()
        const agentsData = await agentsRes.json()

        setPriceAlerts(alertsData.alerts || [])
        setCampaigns(campaignsData.campaigns || [])
        setOutreach(outreachData.activities || [])
        setProperties(propertiesData.properties || [])
        
        // Convert database agents to Agent type
        const dbAgents = (agentsData.agents || []).map((a: any) => ({
          name: a.agent_name,
          category: a.agent_category,
          description: a.agent_description || '',
          id: a.id
        }))
        setCustomAgents(dbAgents)
      } catch (error) {
        console.error('[v0] Error fetching dashboard data:', error)
        setPriceAlerts([])
        setCampaigns([])
        setOutreach([])
        setProperties([])
        setCustomAgents([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isDemo])

  const handleAddAgent = async (agent: Agent) => {
    if (isDemo) {
      setCustomAgents(prev => [...prev, agent])
      return
    }

    try {
      const response = await fetch('/api/user/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_name: agent.name,
          agent_category: agent.category,
          agent_description: agent.description,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setCustomAgents(prev => [...prev, { ...agent, id: data.agentId }])
      }
    } catch (error) {
      console.error('[v0] Error adding agent:', error)
    }
  }

  const handleRemoveAgent = async (agentName: string) => {
    if (isDemo) {
      setCustomAgents(prev => prev.filter(a => a.name !== agentName))
      return
    }

    const agent = customAgents.find(a => a.name === agentName)
    if (!agent?.id) return

    try {
      const response = await fetch(`/api/user/agents?id=${agent.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setCustomAgents(prev => prev.filter(a => a.name !== agentName))
      }
    } catch (error) {
      console.error('[v0] Error removing agent:', error)
    }
  }

  const handleToggleProperty = (propertyId: number) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const handleToggleAllProperties = () => {
    if (selectedProperties.length === properties.length) {
      setSelectedProperties([])
    } else {
      setSelectedProperties(properties.map(p => p.id))
    }
  }

  const handleApplyAgents = async () => {
    if (selectedProperties.length === 0 || customAgents.length === 0) {
      alert('Please select properties and add agents first')
      return
    }

    if (isDemo) {
      alert('Demo mode: Agents would be applied to selected properties')
      return
    }

    try {
      const agentIds = customAgents.map(a => a.id).filter(Boolean)
      const response = await fetch('/api/user/agent-assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_ids: agentIds,
          property_ids: selectedProperties,
        }),
      })

      if (response.ok) {
        alert(`Successfully applied ${customAgents.length} agent(s) to ${selectedProperties.length} propert${selectedProperties.length === 1 ? 'y' : 'ies'}`)
        setSelectedProperties([])
      }
    } catch (error) {
      console.error('[v0] Error applying agents:', error)
      alert('Failed to apply agents')
    }
  }

  const stats = {
    activeLeads: isDemo ? 127 : campaigns.reduce((sum, c) => sum + (c.leads_count || 0), 0),
    messagesSent: outreach.length,
    propertiesTracked: priceAlerts.length,
    conversionRate: isDemo ? 34 : campaigns.length > 0 
      ? Math.round((campaigns.reduce((sum, c) => sum + (c.leads_count || 0), 0) / campaigns.reduce((sum, c) => sum + (c.sent_count || 0), 0)) * 100)
      : 0
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="flex h-16 items-center px-6 gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 relative">
              <Image 
                src="/images/wh-logo.png" 
                alt="Welcome Home Agency" 
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold">Welcome Home Agency</span>
          </Link>
          {isDemo && (
            <Badge variant="secondary" className="ml-2">
              Demo Mode
            </Badge>
          )}
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback>{user.name?.[0] || user.email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              {isDemo ? (
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In for Full Access
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar with Agents */}
        <aside className="w-80 border-r bg-card h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-4 border-b space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                AI Agents
              </h2>
              <Button 
                size="sm" 
                onClick={() => setAddAgentModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            
            {customAgents.length === 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No agents added yet. Click Add to get started.
              </div>
            ) : (
              <div className="space-y-2">
                {customAgents.map((agent) => (
                  <div
                    key={agent.name}
                    className="p-3 border rounded-lg bg-background"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm truncate">{agent.name}</h3>
                          <Badge variant="outline" className="text-xs">{agent.category}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {agent.description}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={() => handleRemoveAgent(agent.name)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-b">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
              Active Monitoring Agents
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {monitoringAgents.filter(a => a.status === 'active').length} of {monitoringAgents.length} active
            </p>
          </div>

          <div className="p-4 space-y-2">
            {monitoringAgents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  selectedAgent.id === agent.id 
                    ? 'bg-primary/10 border-primary' 
                    : 'hover:bg-muted border-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`${agent.color} p-2 rounded-lg`}>
                    <agent.icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm truncate">{agent.name}</h3>
                      {agent.status === 'active' && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{agent.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {agent.lastUpdate}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="p-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Property Spreadsheet</CardTitle>
                    <CardDescription>
                      {isDemo 
                        ? 'Select properties to apply AI agents (Demo Data)' 
                        : 'Select properties to apply AI agents'}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    {selectedProperties.length > 0 && customAgents.length > 0 && (
                      <Button size="sm" onClick={handleApplyAgents}>
                        <Bot className="h-4 w-4 mr-2" />
                        Apply Agents ({selectedProperties.length})
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {properties.length === 0 && !loading ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Home className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No properties yet</p>
                    <p className="text-sm">Start by adding properties to track with your AI agents.</p>
                    <Button className="mt-4" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Property
                    </Button>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-3 text-left">
                              <Checkbox 
                                checked={selectedProperties.length === properties.length}
                                onCheckedChange={handleToggleAllProperties}
                              />
                            </th>
                            <th className="p-3 text-left font-medium">Address</th>
                            <th className="p-3 text-left font-medium">City</th>
                            <th className="p-3 text-left font-medium">State</th>
                            <th className="p-3 text-right font-medium">Price</th>
                            <th className="p-3 text-center font-medium">Beds</th>
                            <th className="p-3 text-center font-medium">Baths</th>
                            <th className="p-3 text-right font-medium">Sqft</th>
                            <th className="p-3 text-left font-medium">Status</th>
                            <th className="p-3 text-left font-medium">Updated</th>
                          </tr>
                        </thead>
                        <tbody>
                          {properties.map((property) => (
                            <tr 
                              key={property.id}
                              className={`border-t hover:bg-muted/50 ${
                                selectedProperties.includes(property.id) ? 'bg-primary/5' : ''
                              }`}
                            >
                              <td className="p-3">
                                <Checkbox
                                  checked={selectedProperties.includes(property.id)}
                                  onCheckedChange={() => handleToggleProperty(property.id)}
                                />
                              </td>
                              <td className="p-3 font-medium">{property.address}</td>
                              <td className="p-3">{property.city}</td>
                              <td className="p-3">{property.state}</td>
                              <td className="p-3 text-right font-semibold">
                                ${property.price.toLocaleString()}
                              </td>
                              <td className="p-3 text-center">{property.beds}</td>
                              <td className="p-3 text-center">{property.baths}</td>
                              <td className="p-3 text-right">{property.sqft.toLocaleString()}</td>
                              <td className="p-3">
                                <Badge 
                                  variant={property.status === 'Active' ? 'default' : 'secondary'}
                                >
                                  {property.status}
                                </Badge>
                              </td>
                              <td className="p-3 text-muted-foreground">{property.lastUpdated}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-4">Loading your dashboard...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.activeLeads}</div>
                      <p className="text-xs text-muted-foreground">
                        {isDemo ? (
                          <span className="text-green-600">+12%</span>
                        ) : stats.activeLeads > 0 ? (
                          <span>From your campaigns</span>
                        ) : (
                          <span>No leads yet</span>
                        )}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.messagesSent}</div>
                      <p className="text-xs text-muted-foreground">
                        {isDemo ? (
                          <span className="text-green-600">+24%</span>
                        ) : stats.messagesSent > 0 ? (
                          <span>Total outreach activities</span>
                        ) : (
                          <span>No messages yet</span>
                        )}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Properties Tracked</CardTitle>
                      <Home className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.propertiesTracked}</div>
                      <p className="text-xs text-muted-foreground">
                        {stats.propertiesTracked > 0 ? (
                          <span className="text-blue-600">{stats.propertiesTracked} alerts active</span>
                        ) : (
                          <span>No tracked properties</span>
                        )}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                      <p className="text-xs text-muted-foreground">
                        {isDemo ? (
                          <span className="text-green-600">+8%</span>
                        ) : stats.conversionRate > 0 ? (
                          <span>From campaigns</span>
                        ) : (
                          <span>No conversions yet</span>
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Price Alerts */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Price Alerts</CardTitle>
                        <CardDescription>Recent price changes on tracked properties</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {priceAlerts.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No price alerts yet. Start tracking properties to see updates here.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {priceAlerts.map((alert: any) => (
                          <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <img 
                              src={alert.image_url || "/placeholder.svg"} 
                              alt={alert.address}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium mb-1">{alert.address}, {alert.city}, {alert.state}</h4>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                <span>{alert.bedrooms} beds</span>
                                <span>{alert.bathrooms} baths</span>
                                <span>{alert.square_feet?.toLocaleString()} sqft</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <div>
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${alert.old_price?.toLocaleString()}
                                  </span>
                                  <span className="text-lg font-bold ml-2">
                                    ${alert.new_price?.toLocaleString()}
                                  </span>
                                </div>
                                <Badge 
                                  variant={alert.change_percentage < 0 ? 'default' : 'secondary'}
                                  className={alert.change_percentage < 0 ? 'bg-green-500' : 'bg-orange-500'}
                                >
                                  {alert.change_percentage < 0 ? (
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                  ) : (
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                  )}
                                  {Math.abs(alert.change_percentage)}%
                                </Badge>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Marketing Campaigns */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Marketing Campaigns</CardTitle>
                        <CardDescription>Automated email and SMS outreach performance</CardDescription>
                      </div>
                      <Button size="sm">
                        <Zap className="h-4 w-4 mr-2" />
                        New Campaign
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {campaigns.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No campaigns yet. Create your first automated campaign to engage leads.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {campaigns.map((campaign: any) => (
                          <div key={campaign.id} className="p-4 border rounded-lg">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h4 className="font-medium mb-1">{campaign.name}</h4>
                                <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                                  {campaign.status}
                                </Badge>
                              </div>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-2xl font-bold">{campaign.sent_count}</p>
                                <p className="text-xs text-muted-foreground">Sent</p>
                              </div>
                              <div>
                                <p className="text-2xl font-bold">{campaign.opened_count}</p>
                                <p className="text-xs text-muted-foreground">Opened</p>
                              </div>
                              <div>
                                <p className="text-2xl font-bold">{campaign.clicked_count}</p>
                                <p className="text-xs text-muted-foreground">Clicked</p>
                              </div>
                              <div>
                                <p className="text-2xl font-bold text-green-600">{campaign.leads_count}</p>
                                <p className="text-xs text-muted-foreground">Leads</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Open Rate</span>
                                <span className="font-medium">
                                  {campaign.sent_count > 0 
                                    ? Math.round((campaign.opened_count / campaign.sent_count) * 100) 
                                    : 0}%
                                </span>
                              </div>
                              <Progress 
                                value={campaign.sent_count > 0 
                                  ? (campaign.opened_count / campaign.sent_count) * 100 
                                  : 0} 
                                className="h-2" 
                              />
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Click Rate</span>
                                <span className="font-medium">
                                  {campaign.sent_count > 0 
                                    ? Math.round((campaign.clicked_count / campaign.sent_count) * 100) 
                                    : 0}%
                                </span>
                              </div>
                              <Progress 
                                value={campaign.sent_count > 0 
                                  ? (campaign.clicked_count / campaign.sent_count) * 100 
                                  : 0} 
                                className="h-2" 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Outreach */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Outreach Activity</CardTitle>
                    <CardDescription>Latest automated communications with leads</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {outreach.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        No outreach activity yet. Your automated agents will log communications here.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {outreach.map((item: any) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="p-2 rounded-lg bg-primary/10">
                              {item.activity_type === 'email' && <Mail className="h-4 w-4 text-primary" />}
                              {item.activity_type === 'sms' && <MessageSquare className="h-4 w-4 text-primary" />}
                              {item.activity_type === 'call' && <Phone className="h-4 w-4 text-primary" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{item.contact_name}</p>
                                <Badge variant="outline" className="text-xs">
                                  {item.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.subject}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.created_at).toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>

      <AddAgentModal
        open={addAgentModalOpen}
        onOpenChange={setAddAgentModalOpen}
        onAddAgent={handleAddAgent}
        existingAgents={customAgents}
      />
    </div>
  )
}
