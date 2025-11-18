import {
  consumeStream,
  convertToModelMessages,
  streamText,
  tool,
  UIMessage,
} from 'ai'
import { z } from 'zod'

export const maxDuration = 30

const mockProperties = [
  {
    id: '1',
    title: 'Modern Family Home',
    location: 'Seattle, WA',
    price: 485000,
    beds: 3,
    baths: 2,
    sqft: 2100,
    image: '/modern-suburban-house.png',
    type: 'house'
  },
  {
    id: '2',
    title: 'Downtown Luxury Condo',
    location: 'Seattle, WA',
    price: 625000,
    beds: 2,
    baths: 2,
    sqft: 1400,
    image: '/modern-condo.png',
    type: 'apartment'
  },
  {
    id: '3',
    title: 'Cozy Suburban House',
    location: 'Bellevue, WA',
    price: 450000,
    beds: 3,
    baths: 2.5,
    sqft: 1900,
    image: '/cozy-suburban-house.png',
    type: 'house'
  },
  {
    id: '4',
    title: 'Waterfront Apartment',
    location: 'Seattle, WA',
    price: 750000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: '/waterfront-apartment.png',
    type: 'apartment'
  },
  {
    id: '5',
    title: 'Charming Townhouse',
    location: 'Redmond, WA',
    price: 520000,
    beds: 3,
    baths: 2.5,
    sqft: 2000,
    image: '/modern-townhouse.png',
    type: 'townhouse'
  }
]

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: 'openai/gpt-5-mini',
    prompt,
    abortSignal: req.signal,
    system: `You are a helpful real estate assistant for Welcome Home Agency. 
    You help users find their dream homes by showing them property listings and answering questions.
    When users ask about properties, always use the searchProperties tool to show them listings.
    Be friendly, conversational, and helpful. After showing listings, ask follow-up questions to refine their search.`,
    tools: {
      searchProperties: tool({
        description: 'Search for properties and return listings to show to the user',
        inputSchema: z.object({
          location: z.string().optional(),
          minPrice: z.number().optional(),
          maxPrice: z.number().optional(),
          bedrooms: z.number().optional(),
          propertyType: z.string().optional(),
        }),
        execute: async ({ location, minPrice, maxPrice, bedrooms, propertyType }) => {
          // Filter properties based on criteria
          let filtered = mockProperties

          if (location) {
            filtered = filtered.filter(p => 
              p.location.toLowerCase().includes(location.toLowerCase())
            )
          }

          if (minPrice) {
            filtered = filtered.filter(p => p.price >= minPrice)
          }

          if (maxPrice) {
            filtered = filtered.filter(p => p.price <= maxPrice)
          }

          if (bedrooms) {
            filtered = filtered.filter(p => p.beds >= bedrooms)
          }

          if (propertyType && propertyType !== 'all') {
            filtered = filtered.filter(p => p.type === propertyType)
          }

          // Return up to 3 properties
          return {
            properties: filtered.slice(0, 3),
            count: filtered.length,
            message: `Found ${filtered.length} properties matching your criteria`
          }
        },
      }),
      calculateMortgage: tool({
        description: 'Calculate estimated monthly mortgage payment',
        inputSchema: z.object({
          price: z.number(),
          downPayment: z.number(),
          interestRate: z.number(),
          loanTerm: z.number(),
        }),
        execute: async ({ price, downPayment, interestRate, loanTerm }) => {
          const principal = price - downPayment
          const monthlyRate = interestRate / 100 / 12
          const numberOfPayments = loanTerm * 12
          const monthlyPayment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

          return {
            monthlyPayment: Math.round(monthlyPayment),
            principal: principal,
            totalInterest: Math.round(monthlyPayment * numberOfPayments - principal),
          }
        },
      }),
    },
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log('[v0] Chat aborted')
      }
    },
    consumeSseStream: consumeStream,
  })
}
