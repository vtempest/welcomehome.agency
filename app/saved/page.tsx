'use client'

import { useState, useEffect } from 'react'
import { PropertyCard } from '@/components/property-card'
import { PriceAlertDialog } from '@/components/price-alert-dialog'
import { ChatWidget } from '@/components/chat-widget'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Bell, Heart } from 'lucide-react'

export default function SavedPropertiesPage() {
  const [savedProperties, setSavedProperties] = useState<any[]>([])
  const [priceAlerts, setPriceAlerts] = useState<any[]>([])
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [showAlertDialog, setShowAlertDialog] = useState(false)

  useEffect(() => {
    // Load saved properties from localStorage
    const saved = JSON.parse(localStorage.getItem('savedProperties') || '[]')
    setSavedProperties(saved)

    // Load price alerts from localStorage
    const alerts = JSON.parse(localStorage.getItem('priceAlerts') || '[]')
    setPriceAlerts(alerts)
  }, [])

  const toggleSaved = (id: string) => {
    const updated = savedProperties.filter((prop) => prop.id !== id)
    setSavedProperties(updated)
    localStorage.setItem('savedProperties', JSON.stringify(updated))
  }

  const openAlertDialog = (property: any) => {
    setSelectedProperty(property)
    setShowAlertDialog(true)
  }

  const handleSetAlert = (alertData: any) => {
    const newAlert = {
      ...alertData,
      propertyId: selectedProperty.id,
      propertyTitle: selectedProperty.title,
      currentPrice: selectedProperty.price,
      createdAt: new Date().toISOString(),
    }

    const updatedAlerts = [...priceAlerts, newAlert]
    setPriceAlerts(updatedAlerts)
    localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts))
    setShowAlertDialog(false)
  }

  const deleteAlert = (index: number) => {
    const updatedAlerts = priceAlerts.filter((_, i) => i !== index)
    setPriceAlerts(updatedAlerts)
    localStorage.setItem('priceAlerts', JSON.stringify(updatedAlerts))
  }

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
                <a href="/compare">Compare</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Saved Properties Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Saved Properties
            </h1>
          </div>

          {savedProperties.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No saved properties yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Start saving properties you like to keep track of them
              </p>
              <Button asChild>
                <a href="/search">Browse Properties</a>
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {savedProperties.map((property) => (
                <div key={property.id} className="relative">
                  <PropertyCard
                    property={property}
                    onToggleSaved={toggleSaved}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute bottom-4 right-4 z-10"
                    onClick={() => openAlertDialog(property)}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Set Alert
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Price Alerts Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-bold text-foreground">Price Alerts</h2>
          </div>

          {priceAlerts.length === 0 ? (
            <Card className="p-8 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No price alerts set
              </h3>
              <p className="text-muted-foreground">
                Set price alerts on saved properties to get notified when prices
                change
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {priceAlerts.map((alert, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {alert.propertyTitle}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          Current Price:{' '}
                          <span className="font-semibold text-foreground">
                            ${alert.currentPrice.toLocaleString()}
                          </span>
                        </p>
                        {alert.targetPrice && (
                          <p className="text-muted-foreground">
                            Alert me when price drops below:{' '}
                            <span className="font-semibold text-accent">
                              ${alert.targetPrice.toLocaleString()}
                            </span>
                          </p>
                        )}
                        {alert.maxPrice && (
                          <p className="text-muted-foreground">
                            Alert me when price exceeds:{' '}
                            <span className="font-semibold text-destructive">
                              ${alert.maxPrice.toLocaleString()}
                            </span>
                          </p>
                        )}
                        {alert.percentageChange && (
                          <p className="text-muted-foreground">
                            Alert me on {alert.percentageChange}% price change
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAlert(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Price Alert Dialog */}
      {selectedProperty && (
        <PriceAlertDialog
          open={showAlertDialog}
          onOpenChange={setShowAlertDialog}
          property={selectedProperty}
          onSetAlert={handleSetAlert}
        />
      )}

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  )
}
