import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search, MessageSquare, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Ripple } from "@/components/ui/ripple"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/images/welcome-home-house.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="absolute inset-0 z-[5]">
        <Ripple mainCircleSize={210} mainCircleOpacity={0.24} numCircles={8} />
      </div>

      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-6 lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 relative">
            <Image src="/images/wh-logo.png" alt="Welcome Home Agency" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold text-white">Welcome Home Agency</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/platform" className="text-sm text-white/80 hover:text-white transition-colors">
            Platform
          </Link>
          <Link
            href="/search"
            className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Search Properties
          </Link>
          <a href="#features" className="text-sm text-white/80 hover:text-white transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm text-white/80 hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#quote" className="text-sm text-white/80 hover:text-white transition-colors">
            Get Quote
          </a>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span
            className="text-sm font-medium text-white bg-clip-text bg-no-repeat animate-shimmer"
            style={
              {
                "--shimmer-width": "100px",
                backgroundImage: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8) 50%, transparent)",
                backgroundSize: "var(--shimmer-width) 100%",
                backgroundPosition: "0 0",
              } as React.CSSProperties
            }
          >
            AI-Powered Real Estate Intelligence
          </span>
        </div>

        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto text-pretty leading-relaxed">
          Transform your real estate business with AI agents that automate 85% of operational workflows. Save 10-15
          hours per week and improve lead conversion by 30-50%.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/search">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 w-full sm:w-auto"
            >
              Chat with AI Assistant
              <MessageSquare className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 text-base px-8 w-full sm:w-auto">
              Sign In to App
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm text-base px-8 w-full sm:w-auto"
            >
              <Play className="mr-2 h-5 w-5" />
              See Demo
            </Button>
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 justify-center items-center text-sm text-white/70">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent text-xs">✓</span>
            </div>
            <span>Free Property Search</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent text-xs">✓</span>
            </div>
            <span>Price Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent text-xs">✓</span>
            </div>
            <span>AI Chat Assistant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-accent text-xs">✓</span>
            </div>
            <span>Property Comparison</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
