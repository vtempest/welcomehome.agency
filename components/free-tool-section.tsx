import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Bell, BarChart3, MessageSquare, Heart, Home } from 'lucide-react'
import Link from 'next/link'
import { BorderBeam } from '@/components/ui/border-beam'

export function FreeToolSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-6">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm font-medium">Free for Everyone</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Chat Your Way to Your Dream Home
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Simply tell our AI assistant what you're looking for and see property listings instantly. No forms, no filters - just conversation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg relative">
            <BorderBeam size={250} duration={15} delay={0} colorFrom="#06b6d4" colorTo="#3b82f6" />
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Chat Assistant</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ask natural questions and see property listings appear right in your conversation. It's like texting with a real estate expert.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg relative">
            <BorderBeam size={250} duration={15} delay={2} colorFrom="#06b6d4" colorTo="#3b82f6" />
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Property Search</h3>
              <p className="text-muted-foreground leading-relaxed">
                Properties are shown inline as you chat, with images, prices, and key details ready to explore.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg relative">
            <BorderBeam size={250} duration={15} delay={4} colorFrom="#06b6d4" colorTo="#3b82f6" />
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Price Alerts</h3>
              <p className="text-muted-foreground leading-relaxed">
                Set custom alerts for price drops, increases, or percentage changes on your saved properties.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg relative">
            <BorderBeam size={250} duration={15} delay={6} colorFrom="#06b6d4" colorTo="#3b82f6" />
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Property Comparison</h3>
              <p className="text-muted-foreground leading-relaxed">
                Compare up to 4 properties side-by-side with detailed specs, pricing, and location data.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg relative">
            <BorderBeam size={250} duration={15} delay={8} colorFrom="#06b6d4" colorTo="#3b82f6" />
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Favorites</h3>
              <p className="text-muted-foreground leading-relaxed">
                Save properties you love and track them over time with automatic price monitoring.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg relative">
            <BorderBeam size={250} duration={15} delay={10} colorFrom="#06b6d4" colorTo="#3b82f6" />
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access up-to-date property listings with current market prices and availability status.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/search">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-12">
              Start Chatting - It's Free
              <MessageSquare className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            No signup required • Instant access • Always free
          </p>
        </div>
      </div>
    </section>
  )
}
