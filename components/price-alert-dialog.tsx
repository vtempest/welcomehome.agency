'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PriceAlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  property: any
  onSetAlert: (alertData: any) => void
}

export function PriceAlertDialog({
  open,
  onOpenChange,
  property,
  onSetAlert,
}: PriceAlertDialogProps) {
  const [targetPrice, setTargetPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [percentageChange, setPercentageChange] = useState('')

  const handleSubmit = (type: 'target' | 'max' | 'percentage') => {
    const alertData: any = {}

    if (type === 'target' && targetPrice) {
      alertData.targetPrice = parseInt(targetPrice)
      alertData.type = 'price_drop'
    } else if (type === 'max' && maxPrice) {
      alertData.maxPrice = parseInt(maxPrice)
      alertData.type = 'price_increase'
    } else if (type === 'percentage' && percentageChange) {
      alertData.percentageChange = parseInt(percentageChange)
      alertData.type = 'percentage_change'
    }

    onSetAlert(alertData)
    setTargetPrice('')
    setMaxPrice('')
    setPercentageChange('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Set Price Alert</DialogTitle>
          <DialogDescription>
            Get notified when the price changes for {property.title}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Current Price</p>
            <p className="text-2xl font-bold text-foreground">
              ${property.price.toLocaleString()}
            </p>
          </div>

          <Tabs defaultValue="target" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="target">Price Drop</TabsTrigger>
              <TabsTrigger value="max">Price Increase</TabsTrigger>
              <TabsTrigger value="percentage">% Change</TabsTrigger>
            </TabsList>

            <TabsContent value="target" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="targetPrice">
                  Alert me when price drops below
                </Label>
                <Input
                  id="targetPrice"
                  type="number"
                  placeholder="Enter target price"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={() => handleSubmit('target')}
                disabled={!targetPrice}
              >
                Set Alert
              </Button>
            </TabsContent>

            <TabsContent value="max" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="maxPrice">
                  Alert me when price exceeds
                </Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Enter maximum price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={() => handleSubmit('max')}
                disabled={!maxPrice}
              >
                Set Alert
              </Button>
            </TabsContent>

            <TabsContent value="percentage" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="percentageChange">
                  Alert me on price change of
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="percentageChange"
                    type="number"
                    placeholder="Enter percentage"
                    value={percentageChange}
                    onChange={(e) => setPercentageChange(e.target.value)}
                  />
                  <div className="flex items-center px-3 border border-input rounded-md bg-muted">
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => handleSubmit('percentage')}
                disabled={!percentageChange}
              >
                Set Alert
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
