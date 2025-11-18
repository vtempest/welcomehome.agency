'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const uiScreenshot = 'data:image/png;base64,UklGRn5mAQBXRUJQVlA4WAoAAAAgAAAA4AUAKwUASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggkGQBABCFBZ0BKuEFLAU+USaQRqOhoaEiUfn4cAoJaW78bwwJYMF78oyIPO3cp6biVFp4B41gs2r09pWT+2/t37l+VTIvqP8L/h/3B/vnvy2l/Cf2z9jfFB+v8IOtfM/8t/Tf+J/dP8x+y/zm/yP+5/u34e/Qn9Kf9b8//oD/UL/qf3r/G+z96kf3H/63sF/qv+M/Zn/n/D5/g/+p/kf3/+Tv9x/y//n/13+q+QT+l/3n/lfn/8cHsOf5n/uewT/Ov8V/3PXI/bf/ifKJ/V/99+3X/I+Rr+kf5P///u18AH/39QD/5db/01/q/9s/yH+K/sfx2+Sfo39k/u/+d/wX9u/8/+g9qfxz5j+0/3D/G/5/+0//T/U/ER/Xf4fxG+j/wf+y/0H+W/7X+C////u+jP479evuv9o/zf+y/uX7d/dz9h/xv+D/zn+p/vX7Uez/59+5f5T/Dft9/g/3g+wX8j/lP90/sv+V/2X9y/cX3O/7H/Gf6T/k+Ezsf+b/1v+P/z3/B/t3//+gX2M+e/5X+9f5z/h/3/90PZk/pv79/mv+l/h////2foz9A/tP+v/xn+X/7/+V///4Afyb+j/6D+/fu3/fv///1vuv/Q/9X/O/v16Rf4X/T/9j/PfnF9gX83/t3/S/xH+j/a76YP5X/rf5X/U/+z/Lf/////GX9C/x//Y/zX+t//H+e////j/Qn+Zf1j/f/37/Sf+z/O////zfeT/+/9j8D/3N//P/J+GH9qf/9/qWk+E1hxPx4MhASWJrDifjwZCAksTWHE/HgyEBJYmsOJ+PBkICSxNYcT8eDIQEliarou+zCGBjEItXdSxJh4MhASWJrDifjwZCAksTWHE/HgyEBJYmsOJ+PBkICSxNYcT8eDIQEliaw2fGOw/k/1jGnzr1Wu8pOBm3TlHNZEbHeM4DDXUHQQihHOX3wtaJkUtZLzBp4uTJ34oWAqI2eYHFXa5DSV5MgTT2Pb3w69yzgwczjrbN+JeYB7SKDse/G0udstooLaimFHEjn7aiaw4n48GQgJLE1hxPx4MhASWJrDifjwZCAksTWHE/GbmMD/39IRNkkzKEX8oXva10tWsjRS0sZUVYqncV8gLv9efpfEbxIoYYrSF/0NKkHia77zWfZeIttL0S/yBIGzeYsBjecc9kuVjZKZYrrGKvBXST09SasJZ9IqLbur/C2xob+x+un2k7aBDWPESRzaAOCnbZeQ8Pegayw3LjNLXi7INAjQUz2yVduHhnKGBtQPD5nekSSJh/KLX0/dx2vjkq'

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
    <div className="min-h-screen bg-[url('data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAOSBkADASIAAhEBAxEB/8QAHQAAAgIDAQEBAAAAAAAAAAAAAQIAAwQFBgcICf/EAGIQAAECBAQCBQYIBwwHBgUBCQECEQADBCEFEjFBBlEiYXGBkQcTMkKhwRRSYnKx0eHwFSMzgpKy8QgWJDQ1Q1Njc3SisyU2RFSDk8IXJlVko7Q3RXWElNJGZSfiGMNWhfL/xAAbAQADAQEBAQEAAAAAAAAAAAAAAQIDBAUGB//EADgRAAIBAgQEBAQFBAIDAQEAAAABAgMRBBIhMQUTQVEUIjJSM0JhcSM0gZGhBxUksWLwQ1PRwfH/2gAMAwEAAhEDEQA/APmYP8pmfTY/bFyc7AdJwS4Ya7+yKUpBICsoexJJ8YcAa5QA1xyj20YMtTmcAZ2YDa49WHSSSC67nM+99+82isJ5BIDs7HxixICr9EDsNufhFozYzKSB6Y13AY+t7IgJAtnYjpve+0AZdGTcAFwe7v3MMAl/U56ePjFoAjzhLdJ3AHSGu3dAJs5zFJGhVtv7YjAhuiCzXHhAKQ3q7+qb84Yg31Vmzb33+0QL29Iv16tp4QAEsL7a5T490OQ6jYJNhodfthgQ3JzZiN77bmIQSwVmfRn8BAyhrAakgMYYAWDg7Cx0+2DUkiVKZ8xAdzfuf3QycwIym4Js++48IAAZkhLkhte6CpQA6JZ7O505+MUgIHKSxJS251TsO6GLhyVl+b/4u/SAC9yW3Zz3t2wxcnUHqfXq7BDJuKHY2IuzPoOXfBc21vpfXl4RAxbpWYl+rn2iGLaEgPY9XX2mFYBc53KmuTe/yoZJVcXKtGJ16vCA5ubZixZjro3ZDJA3IZm0Om3thgR1A2zKsGL68vHSDdgA7Nbpbbe20BQDF7G+x7/AxMqSm4D79E9hb6YYrkcnmB26c/AwQ+pB0JLHTnvtrByg65X+b4jwhglPybMzp8PtgEJfmptLHTke+HQtRIN73Z9DplgFKWDJDMR6O2/fyhki5cD9H77W7YAACWvmYP62g590DpJIdJ3dleMMwB0Hej79nbAYHRufo/fsgEBlDUKb5+rfXB6QOinB+NvtBAHNIvfo6cj3RAElQYafJ0/ZrDERyUsHZj6x0F/ptEJXmt6RPM2MQZACbNybrt7bwSEqscqttNefjAMg0J6QSQzB3bl2vBILkFRDm7Pb7Gg2dxlcb7dR7tIhADWYMzP4pP0w0xNjHO2YEhWrX74BzOBmUU6abC8FgXZnO77jQwOi2gYfK25eMMkUhRFysPfTn9UMytBnu+zQcurBL8ge8xAARolzvm8D7oLhcBzu4zFyGP0RALaqCQOez6+MEBJBFgGO5sOfdDAn5IOawzGx2EF2AqSe99SbP9UAi13y5dDrl5dsFxlAsUs7ZjdPLxhi4VdSXF3c7WeHcQnTKhfpOP0tvZEuE2fKQT+bvDa9EsPVsYINwRlBJdnOu4hXFcVQZ30cPfXkYDqB9K+ZyX9bn2RYNgCCE2Dq++sCw1fK1wFeryhpiuK5A1tdrnviOpO5YM1zb4sWDM/ygdc1n/ZBSk+qL7Orc7Q9QzIQFRDEqcuPSPfAKjncrLEPYnT64sLO3SyMzvqNjBIUT6JzP8bfbuhCuVpzOGUQQW9Lfn3wMxy6qCW0zbPcRezMGURceltv3vCsond3Bd99jAFxMygSXcuNFann4QNfXIToC5sOcW5SPRzWf1vH7IUhtCWBG/qmHcLigqIu9wxDnuTBzKFw5OrXuTqIYOAxJzaO/rbGBu722...')] bg-cover bg-center relative before:content-[''] before:fixed before:inset-0 before:bg-gradient-to-br before:from-[rgba(102,126,234,0.65)] before:to-[rgba(118,75,162,0.65)]">
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
                    <img src={uiScreenshot || "/placeholder.svg"} alt="AI Agent Dashboard" className="max-w-[90%] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-4 border-[rgba(102,126,234,0.3)] mx-auto" />
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
                    <img 
                      src={`/.jpg?key=a0xr4&height=450&width=800&query=${encodeURIComponent(slide.imageQuery)}`} 
                      alt={slide.imageQuery} 
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
        
        <div className="flex justify-between items-center p-5 md:p-10 bg-black/30 backdrop-blur-[10px]">
          <button
            className="bg-white text-[#667eea] border-none px-6 md:px-8 py-3 md:py-4 text-lg rounded-xl cursor-pointer font-semibold transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:bg-[#667eea] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:text-[#667eea]"
            onClick={prevSlide}
            disabled={currentSlide === 0 || isTransitioning}
          >
            ← Previous
          </button>
          
          <div className="text-white text-xl font-semibold flex items-center gap-5">
            <span className="text-white/90 text-base flex items-center gap-2">
              <span className="bg-white/20 px-2 py-1 rounded font-mono font-bold">←</span>
              <span className="bg-white/20 px-2 py-1 rounded font-mono font-bold">→</span>
            </span>
            <span>{currentSlide + 1} / {slides.length}</span>
          </div>
          
          <button
            className="bg-white text-[#667eea] border-none px-6 md:px-8 py-3 md:py-4 text-lg rounded-xl cursor-pointer font-semibold transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:bg-[#667eea] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:text-[#667eea]"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1 || isTransitioning}
          >
            Next →
          </button>
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
