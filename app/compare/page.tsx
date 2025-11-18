'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChatWidget } from '@/components/chat-widget'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowUpDown, Bed, Bath, Maximize, MapPin, DollarSign, X, Plus } from 'lucide-react'
import Image from 'next/image'

export default function ComparePage() {
  const [savedProperties, setSavedProperties] = useState<any[]>([])
  const [selectedProperties, setSelectedProperties] = useState<any[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedProperties') || '[]')
    setSavedProperties(saved)

    if (saved.length > 0) {
      setSelectedProperties(saved.slice(0, Math.min(3, saved.length)))
    }
  }, [])

  const addProperty = (propertyId: string) => {
    if (selectedProperties.length >= 4) return

    const property = savedProperties.find((p) => p.id === propertyId)
    if (property && !selectedProperties.find((p) => p.id === propertyId)) {
      setSelectedProperties([...selectedProperties, property])
    }
  }

  const removeProperty = (propertyId: string) => {
    setSelectedProperties(selectedProperties.filter((p) => p.id !== propertyId))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const calculatePricePerSqFt = (price: number, sqft: number) => {
    return Math.round(price / sqft)
  }

  const comparisonRows = [
    {
      label: 'Property Type',
      icon: null,
      getValue: (prop: any) => (
        <Badge variant="secondary" className="capitalize">
          {prop.propertyType}
        </Badge>
      ),
    },
    {
      label: 'Price',
      icon: DollarSign,
      getValue: (prop: any) => (
        <span className="text-xl font-bold text-primary">
          {formatPrice(prop.price)}
        </span>
      ),
    },
    {
      label: 'Price per Sq Ft',
      icon: ArrowUpDown,
      getValue: (prop: any) => (
        <span className="text-muted-foreground">
          {formatPrice(calculatePricePerSqFt(prop.price, prop.squareFootage))}/sqft
        </span>
      ),
    },
    {
      label: 'Location',
      icon: MapPin,
      getValue: (prop: any) => (
        <span className="text-sm">{prop.location}</span>
      ),
    },
    {
      label: 'Bedrooms',
      icon: Bed,
      getValue: (prop: any) => <span>{prop.bedrooms} bedrooms</span>,
    },
    {
      label: 'Bathrooms',
      icon: Bath,
      getValue: (prop: any) => <span>{prop.bathrooms} bathrooms</span>,
    },
    {
      label: 'Square Footage',
      icon: Maximize,
      getValue: (prop: any) => (
        <span>{prop.squareFootage.toLocaleString()} sqft</span>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-foreground">
              Welcome Home Agency
            </a>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a href="/search">Search Properties</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/saved">Saved Properties</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Compare Properties
        </h1>

        {savedProperties.length === 0 ? (
          <Card className="p-12 text-center">
            <ArrowUpDown className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No properties to compare
            </h3>
            <p className="text-muted-foreground mb-4">
              Save some properties first to compare them side by side
            </p>
            <Button asChild>
              <a href="/search">Browse Properties</a>
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Property Selection */}
            {selectedProperties.length < 4 && (
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <Plus className="h-5 w-5 text-muted-foreground" />
                  <Select onValueChange={addProperty}>
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Add property to compare" />
                    </SelectTrigger>
                    <SelectContent>
                      {savedProperties
                        .filter(
                          (prop) =>
                            !selectedProperties.find((p) => p.id === prop.id)
                        )
                        .map((prop) => (
                          <SelectItem key={prop.id} value={prop.id}>
                            {prop.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-muted-foreground">
                    {selectedProperties.length}/4 properties selected
                  </span>
                </div>
              </Card>
            )}

            {/* Comparison Table */}
            {selectedProperties.length > 0 && (
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {/* Property Images Row */}
                  <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, 1fr)` }}>
                    <div></div>
                    {selectedProperties.map((property) => (
                      <Card key={property.id} className="overflow-hidden">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                          <Button
                            size="icon"
                            variant="secondary"
                            className="absolute top-2 right-2"
                            onClick={() => removeProperty(property.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="p-3">
                          <h3 className="font-semibold text-foreground text-sm line-clamp-2">
                            {property.title}
                          </h3>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Comparison Rows */}
                  {comparisonRows.map((row, index) => (
                    <div
                      key={index}
                      className="grid gap-4 mb-2"
                      style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, 1fr)` }}
                    >
                      <div className="flex items-center gap-2 py-3 px-4 bg-muted rounded-lg">
                        {row.icon && <row.icon className="h-4 w-4 text-muted-foreground" />}
                        <span className="font-medium text-sm">
                          {row.label}
                        </span>
                      </div>
                      {selectedProperties.map((property) => (
                        <Card
                          key={property.id}
                          className="flex items-center justify-center py-3 px-4"
                        >
                          {row.getValue(property)}
                        </Card>
                      ))}
                    </div>
                  ))}

                  {/* Action Row */}
                  <div
                    className="grid gap-4 mt-6"
                    style={{ gridTemplateColumns: `200px repeat(${selectedProperties.length}, 1fr)` }}
                  >
                    <div></div>
                    {selectedProperties.map((property) => (
                      <Button key={property.id} className="w-full" asChild>
                        <a href={`/property/${property.id}`}>View Details</a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ChatWidget />
    </div>
  )
}
