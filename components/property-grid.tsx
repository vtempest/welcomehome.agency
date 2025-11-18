'use client'

import { useState, useEffect } from 'react'
import { PropertyCard } from '@/components/property-card'

// Mock property data
const mockProperties = [
  {
    id: '1',
    title: 'Modern Family Home',
    location: 'Austin, TX',
    price: 450000,
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2400,
    propertyType: 'house',
    image: '/modern-house-exterior.png',
    isSaved: false,
  },
  {
    id: '2',
    title: 'Downtown Luxury Apartment',
    location: 'New York, NY',
    price: 650000,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1200,
    propertyType: 'apartment',
    image: '/luxury-apartment-building.png',
    isSaved: false,
  },
  {
    id: '3',
    title: 'Cozy Suburban Townhouse',
    location: 'Seattle, WA',
    price: 385000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFootage: 1800,
    propertyType: 'townhouse',
    image: '/modern-townhouse.png',
    isSaved: false,
  },
  {
    id: '4',
    title: 'Beachfront Condo',
    location: 'Miami, FL',
    price: 525000,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1400,
    propertyType: 'condo',
    image: '/beachfront-condo.png',
    isSaved: false,
  },
  {
    id: '5',
    title: 'Spacious Ranch House',
    location: 'Denver, CO',
    price: 520000,
    bedrooms: 5,
    bathrooms: 3,
    squareFootage: 3200,
    propertyType: 'house',
    image: '/ranch-style-house.png',
    isSaved: false,
  },
  {
    id: '6',
    title: 'Urban Studio Apartment',
    location: 'San Francisco, CA',
    price: 425000,
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 650,
    propertyType: 'apartment',
    image: '/modern-studio-apartment.png',
    isSaved: false,
  },
]

interface PropertyGridProps {
  filters: any
}

export function PropertyGrid({ filters }: PropertyGridProps) {
  const [properties, setProperties] = useState(mockProperties)

  useEffect(() => {
    // Filter properties based on filters
    let filtered = mockProperties.filter((property) => {
      if (
        filters.propertyType !== 'all' &&
        property.propertyType !== filters.propertyType
      ) {
        return false
      }

      if (
        filters.priceMin &&
        property.price < parseInt(filters.priceMin)
      ) {
        return false
      }

      if (
        filters.priceMax &&
        property.price > parseInt(filters.priceMax)
      ) {
        return false
      }

      if (
        filters.bedrooms &&
        filters.bedrooms !== 'any' &&
        property.bedrooms < parseInt(filters.bedrooms)
      ) {
        return false
      }

      if (
        filters.bathrooms &&
        filters.bathrooms !== 'any' &&
        property.bathrooms < parseInt(filters.bathrooms)
      ) {
        return false
      }

      if (
        filters.location &&
        !property.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false
      }

      return true
    })

    setProperties(filtered)
  }, [filters])

  const toggleSaved = (id: string) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.id === id ? { ...prop, isSaved: !prop.isSaved } : prop
      )
    )

    // Also update localStorage
    const saved = JSON.parse(localStorage.getItem('savedProperties') || '[]')
    const property = properties.find((p) => p.id === id)
    if (property?.isSaved) {
      localStorage.setItem(
        'savedProperties',
        JSON.stringify(saved.filter((p: any) => p.id !== id))
      )
    } else if (property) {
      localStorage.setItem(
        'savedProperties',
        JSON.stringify([...saved, { ...property, isSaved: true }])
      )
    }
  }

  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center h-[600px] text-center">
        <div>
          <p className="text-xl text-muted-foreground mb-2">
            No properties found
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        {properties.length} {properties.length === 1 ? 'property' : 'properties'} found
      </p>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onToggleSaved={toggleSaved}
          />
        ))}
      </div>
    </div>
  )
}
