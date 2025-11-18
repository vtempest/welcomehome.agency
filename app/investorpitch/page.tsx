'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Slide {
  type?: string
  title: string
  subtitle?: string
  bullets?: string[]
  hasScreenshot?: boolean
  hasLogo?: boolean
  image?: string
  imageAlt?: string
  imageQuery?: string
}

const slides: Slide[] = [
  {
    type: 'title',
    title: 'AI Research Agents for Real Estate',
    subtitle: 'Transforming Property Markets Through Intelligent Automation',
    hasLogo: true
  },
  {
    title: 'Executive Overview',
    bullets: [
      'AI ecosystem: <span class="highlight">price tracking + client engagement + realtor tools</span>',
      '<span class="stat">85% workflow automation</span> with human oversight',
      'Agents save <span class="stat">10-15 hours/week</span>',
      '<span class="stat">30-50% better</span> lead conversion',
      'Proven: Redfin, Lofty, Structurely, HouseCanary, Modern Realty'
    ]
  },
  {
    title: 'The Market Opportunity',
    bullets: [
      '<span class="stat">78% of buyers</span> choose first responder',
      '<span class="stat">391% conversion boost</span> with sub-5-minute responses',
      'Agents waste <span class="highlight">70% of time</span> on repetitive tasks',
      '<span class="highlight">35% lead drop-off</span> from manual nurturing',
      'Current systems lag days/weeks behind market'
    ]
  },
  {
    title: 'Price Tracking & Market Intelligence',
    subtitle: 'Automated Price Monitoring Agent',
    bullets: [
      '<span class="stat">650+ MLS markets</span> monitored in real-time',
      '<span class="stat">95%+ accuracy</span> ML price predictions (XGBoost/LightGBM)',
      '<span class="stat">5-minute alerts</span> on any price changes',
      'Multi-timeframe trend analysis (hourly → monthly)',
      'Automated CMA generation'
    ],
    image: '/images/data-extraction.jpg',
    imageAlt: 'Real-time property data extraction and analysis'
  },
  {
    title: 'Market Forecasting Agent',
    subtitle: 'Predictive Analytics for Future Market Movements',
    bullets: [
      'Time-series models: <span class="highlight">3, 6, 12-month forecasts</span>',
      'Appreciation/depreciation probability scoring',
      'Investment opportunity detection (list vs predicted)',
      'Rental yield & cash-flow projections',
      'Volatility risk assessment'
    ]
  },
  {
    title: 'Competitive Intelligence Agent',
    subtitle: 'Market Benchmarking & Strategy Support',
    bullets: [
      'Competitor pricing across similar properties',
      'Days-on-market (DOM) analysis & benchmarks',
      'Price-per-sqft by neighborhood & property type',
      'Supply/demand dynamics via absorption rates',
      'Undervalued property detection'
    ]
  },
  {
    title: 'Conversational AI Assistant',
    subtitle: '24/7 Intelligent Client Engagement',
    bullets: [
      'NLP understands complex queries naturally',
      '<span class="highlight">Multi-channel:</span> web, SMS, email, social, voice',
      '<span class="stat">80-85%</span> autonomous inquiry handling',
      '<span class="stat">85%+</span> lead qualification accuracy',
      '<span class="stat">4.2/5</span> customer satisfaction'
    ],
    imageQuery: 'AI chatbot assistant helping real estate customer with property search'
  },
  {
    title: 'Lead Nurturing & Follow-Up Agent',
    subtitle: 'Intelligent Relationship Management',
    bullets: [
      'Predictive scoring: email opens, visits, engagement',
      'Auto-segmentation: first-time buyers, investors, sellers',
      '<span class="highlight">30/60/90-day</span> buy/sell timeline predictions',
      '<span class="stat">70% conversion boost</span> for high-score prospects',
      '<span class="stat">35% less drop-off</span> via optimized timing'
    ]
  },
  {
    title: 'Property Recommendation Engine',
    subtitle: 'Hyper-Personalized Matching',
    bullets: [
      'Collaborative + content-based: <span class="stat">&gt;85% accuracy</span>',
      '<span class="stat">650+ MLS markets</span> searched in real-time',
      '<span class="stat">&lt;2 seconds</span> to match & rank (0-100)',
      'Investment analysis: cap rate, cash-on-cash, ROI',
      'AI virtual staging + MLS-optimized descriptions'
    ],
    imageQuery: 'modern property search interface showing multiple homes with AI recommendations'
  },
  {
    title: 'Sales Operations Agent',
    subtitle: 'End-to-End Transaction Automation',
    bullets: [
      '<span class="stat">70% less</span> manual coordination',
      'Automated pipeline: offer → closing',
      'OCR document processing extracts key terms',
      'Auto-sync: lenders, title, inspectors, appraisers',
      'Compliance monitoring + complete audit trails'
    ]
  },
  {
    title: 'Predictive Lead Generation Agent',
    subtitle: 'Proactive Opportunity Identification',
    bullets: [
      '<span class="stat">72% accuracy</span> predicting sellers 6-12mo ahead',
      '<span class="stat">2-3 month</span> head start vs traditional',
      'Life event triggers: jobs, moves, divorces, inheritance',
      'FSBO detection + pre-foreclosure warnings',
      'Multi-channel outreach: email, mail, social, door-knock'
    ]
  },
  {
    title: 'Performance Analytics & Coaching Agent',
    subtitle: 'Real-Time Insights & Improvement',
    bullets: [
      'Real-time: <span class="highlight">conversion, velocity, satisfaction, commissions</span>',
      'AI coaching from top performer patterns',
      'Pipeline health + early stall warnings',
      'Revenue forecasting from pipeline quality',
      'Burnout detection + workload balancing'
    ]
  },
  {
    title: 'Dynamic Pricing Intelligence Agent',
    subtitle: 'Optimized Revenue Management',
    bullets: [
      'Real-time market-driven pricing adjustments',
      'Occupancy tracking + booking velocity',
      'Seasonal patterns: holidays, events, cycles',
      'Competitor monitoring + auto-positioning',
      'Multi-property portfolio optimization'
    ]
  },
  {
    title: 'Content Generation & Marketing Agent',
    subtitle: 'Automated Asset Creation',
    bullets: [
      '<span class="stat">70% faster</span> content creation',
      'MLS-optimized property descriptions',
      'Email, social (IG/FB/LinkedIn), blog articles',
      'Video narration + Google/FB ad copy',
      'SEO-optimized + consistent brand voice'
    ]
  },
  {
    title: 'System Architecture',
    subtitle: 'Enterprise-Grade Infrastructure',
    hasScreenshot: true,
    bullets: [
      'MLS integration via IDX feeds',
      '<span class="stat">136M+ properties:</span> Zillow, Realtor.com, Redfin, ATTOM',
      '<span class="highlight">ML stack:</span> XGBoost, LightGBM, TensorFlow, PyTorch'
    ]
  },
  {
    title: 'CRM & Communication Integration',
    subtitle: 'Seamless Ecosystem Connectivity',
    bullets: [
      'Bi-directional: Salesforce, HubSpot, BoldTrail, Lone Wolf',
      '<span class="highlight">Unified inbox:</span> email, SMS, chat, voice, social',
      'Intelligent routing to agents/specialists',
      'Complete audit trails for compliance',
      'OAuth 2.0 + RBAC + PII masking'
    ]
  },
  {
    title: 'Proven Results & Case Studies',
    bullets: [
      '<span class="highlight">Redfin Ask Redfin:</span> 136M+ properties, instant LLM answers',
      '<span class="highlight">Lofty:</span> 360° lead gen (PPC, brand ads, direct mail)',
      '<span class="highlight">Modern Realty (YC):</span> 70% prefer AI until negotiation',
      '<span class="highlight">Beam AI:</span> 85% automation, 25% revenue ↑, 3x faster',
      '<span class="highlight">Hyro:</span> 85% handled, 15 languages, full CRM'
    ],
    imageQuery: 'business analytics dashboard showing growth charts and success metrics'
  },
  {
    title: 'Business Impact Metrics',
    subtitle: 'Quantified Results',
    bullets: [
      '<span class="stat">25% revenue ↑</span> from pricing + lead quality',
      '<span class="stat">25-30% cost ↓</span> via automation',
      '<span class="stat">3x faster</span> responses = higher closing',
      '<span class="stat">48% engagement</span> vs 15-20% baseline',
      '<span class="stat">95%+ accuracy</span> price forecasts'
    ],
    imageQuery: 'upward trending business growth chart with revenue increase visualization'
  },
  {
    title: 'Implementation Roadmap',
    subtitle: 'Phased Deployment Strategy',
    bullets: [
      '<span class="highlight">Phase 1 (1-2mo):</span> Core—monitoring, chatbot, CRM, scoring',
      '<span class="highlight">Phase 2 (3-4mo):</span> Expansion—nurturing, recommendations, multi-channel',
      '<span class="highlight">Phase 3 (5-6mo):</span> Advanced—predictive gen, automation, pricing',
      '<span class="highlight">Phase 4 (7mo+):</span> Optimize—customization, tuning, enterprise'
    ]
  },
  {
    title: 'Competitive Advantages',
    bullets: [
      '<span class="highlight">Complete ecosystem:</span> Only platform with price + engagement + productivity',
      '<span class="highlight">Proven accuracy:</span> 95%+ predictions, continuous improvement',
      '<span class="highlight">Speed advantage:</span> Sub-5min = capture 78% of buyers',
      '<span class="highlight">Enterprise scale:</span> 650+ MLS, 136M+ properties, 15+ languages',
      '<span class="highlight">Human-AI balance:</span> 85% automation + seamless escalation'
    ]
  },
  {
    type: 'title',
    title: 'Ready to Transform Real Estate',
    subtitle: 'AI-Powered Intelligence • Human-Centered Results • Proven ROI',
    hasLogo: true
  }
]

export default function InvestorPitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const changeSlide = (newIndex: number) => {
    if (isTransitioning || newIndex === currentSlide) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(newIndex)
      setIsTransitioning(false)
    }, 500)
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      changeSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      changeSlide(currentSlide - 1)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, isTransitioning])

  const slide = slides[currentSlide]

  return (
    <div className="min-h-screen bg-[url('data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAOSBkADASIAAhEBAxEB/8QAHQAAAgIDAQEBAAAAAAAAAAAAAQIAAwQFBgcICf/EAGIQAAECBAQCBQYIBwwHBgUBCQECEQADBCEFEjFBElEiYXGBkQcZMqGx0RMBAgQDBQYHNDc1Q1FhcBISEyIyQ2JykaMBAgMFBgcICRAREhMUFRYX')] bg-cover bg-fixed relative before:content-[''] before:fixed before:inset-0 before:bg-gradient-to-br before:from-[rgba(102,126,234,0.65)] before:to-[rgba(118,75,162,0.65)]">
      {/* Navigation arrows as overlay buttons */}
      <button
        className="absolute left-5 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-[#667eea] border-none w-14 h-14 rounded-full cursor-pointer font-semibold transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:bg-[#667eea] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center group"
        onClick={prevSlide}
        disabled={currentSlide === 0 || isTransitioning}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        className="absolute right-5 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-[#667eea] border-none w-14 h-14 rounded-full cursor-pointer font-semibold transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:bg-[#667eea] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center group"
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1 || isTransitioning}
        aria-label="Next slide"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Slide counter overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full">
        <div className="text-white text-lg font-semibold flex items-center gap-4">
          <span className="text-white/80 text-sm">Use arrow keys</span>
          <span className="text-white/40">|</span>
          <span>{currentSlide + 1} / {slides.length}</span>
        </div>
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        <div className={`flex-1 flex flex-col justify-center items-center p-16 md:p-20 bg-white/88 m-5 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-[10px] transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-x-[-100px] scale-95' : 'opacity-100 translate-x-0 scale-100'}`}>
          <div className="w-full max-w-[1000px]">
            {slide.hasLogo && (
              <div className="flex justify-center mb-8 animate-fade-in">
                <Image 
                  src="/images/wh-logo.png" 
                  alt="Welcome Home Agency Logo" 
                  width={150} 
                  height={150}
                  className="drop-shadow-2xl"
                />
              </div>
            )}
            
            {slide.type === 'title' ? (
              <div className={`${slide.type === 'title' ? 'bg-gradient-to-br from-[rgba(102,126,234,0.90)] to-[rgba(118,75,162,0.90)] backdrop-blur-[15px] p-8 rounded-xl' : ''}`}>
                <h1 className="text-5xl md:text-6xl text-white text-center font-bold mb-8 drop-shadow-lg animate-fade-in">{slide.title}</h1>
                {slide.subtitle && <h3 className="text-2xl md:text-3xl text-white/95 text-center font-normal animate-fade-in">{slide.subtitle}</h3>}
              </div>
            ) : (
              <>
                <h2 className="text-4xl md:text-5xl text-[#764ba2] text-center font-semibold mb-8 drop-shadow-sm animate-fade-in">{slide.title}</h2>
                {slide.subtitle && <h3 className="text-2xl md:text-3xl text-gray-600 text-center mb-5 animate-fade-in">{slide.subtitle}</h3>}
                
                {slide.hasScreenshot && (
                  <div className="my-8 text-center animate-fade-in">
                    <Image 
                      src="/ai-agent-dashboard-with-property-monitoring-and-an.jpg" 
                      alt="AI Agent Dashboard" 
                      width={800}
                      height={400}
                      className="max-w-[90%] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-4 border-[rgba(102,126,234,0.3)] mx-auto"
                    />
                  </div>
                )}
                
                {slide.image && (
                  <div className="my-8 text-center animate-fade-in">
                    <Image 
                      src={slide.image || "/placeholder.svg"} 
                      alt={slide.imageAlt || 'Slide illustration'} 
                      width={800} 
                      height={450}
                      className="max-w-[90%] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-4 border-[rgba(102,126,234,0.3)] mx-auto"
                    />
                  </div>
                )}
                
                {slide.imageQuery && (
                  <div className="my-8 text-center animate-fade-in">
                    <Image 
                      src={`/.jpg?key=w2niv&height=450&width=800&query=${encodeURIComponent(slide.imageQuery)}`} 
                      alt={slide.imageQuery} 
                      width={800}
                      height={450}
                      className="max-w-[90%] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-4 border-[rgba(102,126,234,0.3)] mx-auto"
                    />
                  </div>
                )}
                
                <ul className="list-none p-0">
                  {slide.bullets?.map((bullet, index) => (
                    <li
                      key={index}
                      className="text-xl md:text-2xl text-gray-800 my-4 p-3 pl-10 relative leading-relaxed bg-gray-50/40 rounded-lg opacity-0 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                      dangerouslySetInnerHTML={{ __html: bullet }}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }

        li::before {
          content: "▸";
          position: absolute;
          left: 12px;
          color: #667eea;
          font-weight: bold;
          font-size: 1.5em;
        }

        :global(.highlight) {
          color: #764ba2;
          font-weight: 600;
        }

        :global(.stat) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 3px 10px;
          border-radius: 5px;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
