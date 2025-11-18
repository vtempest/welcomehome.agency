'use client'

import { Card } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

interface PropertyMapProps {
  filters: any
}

export function PropertyMap({ filters }: PropertyMapProps) {
  return (
    <Card className="p-8 h-[600px] flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Map View Coming Soon
        </h3>
        <p className="text-muted-foreground">
          Interactive map with property locations will be available here
        </p>
      </div>
    </Card>
  )
}
