'use client'

import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Search } from 'lucide-react'

interface SearchFiltersProps {
  filters: any
  setFilters: (filters: any) => void
}

export function SearchFilters({ filters, setFilters }: SearchFiltersProps) {
  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value })
  }

  const handleReset = () => {
    setFilters({
      propertyType: 'all',
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      location: '',
      squareFootageMin: '',
      squareFootageMax: '',
    })
  }

  return (
    <Card className="p-6 h-fit sticky top-4">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Search Filters
          </h2>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="City, State, or ZIP"
              className="pl-9"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <Label htmlFor="propertyType">Property Type</Label>
          <Select
            value={filters.propertyType}
            onValueChange={(value) => handleFilterChange('propertyType', value)}
          >
            <SelectTrigger id="propertyType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
            />
            <Input
              placeholder="Max"
              type="number"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select
            value={filters.bedrooms}
            onValueChange={(value) => handleFilterChange('bedrooms', value)}
          >
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Select
            value={filters.bathrooms}
            onValueChange={(value) => handleFilterChange('bathrooms', value)}
          >
            <SelectTrigger id="bathrooms">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Square Footage */}
        <div className="space-y-2">
          <Label>Square Footage</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min"
              type="number"
              value={filters.squareFootageMin}
              onChange={(e) =>
                handleFilterChange('squareFootageMin', e.target.value)
              }
            />
            <Input
              placeholder="Max"
              type="number"
              value={filters.squareFootageMax}
              onChange={(e) =>
                handleFilterChange('squareFootageMax', e.target.value)
              }
            />
          </div>
        </div>

        {/* Reset Button */}
        <Button variant="outline" className="w-full" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </Card>
  )
}
