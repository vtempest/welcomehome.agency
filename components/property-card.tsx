'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Bed, Bath, Maximize } from 'lucide-react'
import Image from 'next/image'
import { BorderBeam } from '@/components/ui/border-beam'

interface Property {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  squareFootage: number
  propertyType: string
  image: string
  isSaved: boolean
}

interface PropertyCardProps {
  property: Property
  onToggleSaved: (id: string) => void
}

export function PropertyCard({ property, onToggleSaved }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg relative">
      <BorderBeam 
        size={300} 
        duration={20} 
        delay={Math.random() * 5}
        colorFrom="#3b82f6"
        colorTo="#06b6d4"
      />
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur">
          {property.propertyType}
        </Badge>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 bg-background/90 backdrop-blur"
          onClick={(e) => {
            e.preventDefault()
            onToggleSaved(property.id)
          }}
        >
          <Heart
            className={`h-4 w-4 ${
              property.isSaved ? 'fill-red-500 text-red-500' : ''
            }`}
          />
        </Button>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {property.title}
          </h3>
          <p className="text-sm text-muted-foreground">{property.location}</p>
        </div>
        <p className="text-2xl font-bold text-primary mb-3">
          {formatPrice(property.price)}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.squareFootage.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
