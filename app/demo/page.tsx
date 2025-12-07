"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Activity, Mail, Plus, ChevronRight, Home, Target, Zap } from "lucide-react"

const DEMO_PROPERTIES = [
  {
    id: 1,
    address: "123 Oak Street",
    city: "Austin",
    state: "TX",
    price: 450000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    status: "Active",
    image: "/modern-house-exterior.png",
  },
  {
    id: 2,
    address: "456 Maple Ave",
    city: "Austin",
    state: "TX",
    price: 625000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    status: "Active",
    image: "/luxury-home.png",
  },
  {
    id: 3,
    address: "789 Pine Road",
    city: "Dallas",
    state: "TX",
    price: 385000,
    beds: 3,
    baths: 2.5,
    sqft: 2100,
    status: "Pending",
    image: "/suburban-house.png",
  },
  {
    id: 4,
    address: "321 Elm Circle",
    city: "Houston",
    state: "TX",
    price: 725000,
    beds: 5,
    baths: 4,
    sqft: 3200,
    status: "Active",
    image: "/large-family-home.png",
  },
]

const monitoringAgents = [
  {
    id: 1,
    name: "Price Tracker",
    icon: TrendingUp,
    status: "active",
    color: "bg-blue-500",
    description: "Monitoring 47 properties",
    lastUpdate: "2 min ago",
  },
  {
    id: 2,
    name: "Lead Nurture",
    icon: Users,
    status: "active",
    color: "bg-green-500",
    description: "Engaging 23 leads",
    lastUpdate: "5 min ago",
  },
  {
    id: 3,
    name: "Market Intel",
    icon: Activity,
    status: "active",
    color: "bg-purple-500",
    description: "Analyzing 3 markets",
    lastUpdate: "10 min ago",
  },
  {
    id: 4,
    name: "Outreach Bot",
    icon: Mail,
    status: "active",
    color: "bg-orange-500",
    description: "Sent 156 messages today",
    lastUpdate: "1 min ago",
  },
]

export default function DemoPage() {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/wh-logo.png" alt="WelcomeHome Logo" width={48} height={48} className="rounded-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WelcomeHome.Agency
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Zap className="w-3 h-3 mr-1" />
              Demo Mode
            </Badge>
            <Button asChild>
              <Link href="/login">Sign In for Full Access</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience AI-Powered Real Estate Intelligence</h1>
            <p className="text-xl text-blue-100 mb-6">
              See how our AI agents automate property tracking, lead nurturing, and market analysis
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                asChild
              >
                <Link href="/investorpitch">View Pitch Deck</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Leads</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">8 engaged today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Price Alerts</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">2 new opportunities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Outreach Sent</CardTitle>
              <Mail className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Today's activity</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Agents Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">AI Agents Working For You</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Automated intelligence monitoring your portfolio 24/7
                </p>
              </div>
              <Button asChild>
                <Link href="/login">
                  <Plus className="w-4 h-4 mr-2" />
                  Add More Agents
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {monitoringAgents.map((agent) => {
                const Icon = agent.icon
                return (
                  <Card key={agent.id} className="border-2 hover:border-blue-400 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${agent.color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm">{agent.name}</h3>
                            <Badge variant={agent.status === "active" ? "default" : "secondary"} className="text-xs">
                              {agent.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{agent.description}</p>
                          <p className="text-xs text-blue-600">{agent.lastUpdate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Properties Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Monitored Properties</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Track price changes, market trends, and opportunities
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/login">
                  View All 47 Properties
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DEMO_PROPERTIES.map((property) => (
                <Card
                  key={property.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedProperty === property.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedProperty(property.id)}
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.address}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900">{property.status}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-lg text-blue-600">${property.price.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{property.address}</p>
                        <p className="text-xs text-muted-foreground">
                          {property.city}, {property.state}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground pt-2 border-t">
                      <span>{property.beds} beds</span>
                      <span>•</span>
                      <span>{property.baths} baths</span>
                      <span>•</span>
                      <span>{property.sqft} sqft</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
          <CardContent className="p-8 text-center">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Real Estate Business?</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of real estate professionals using AI to close more deals and save time
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                asChild
              >
                <Link href="/survey">Take Assessment</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
