'use server'

import { db, generateId } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getCurrentUserId } from './user-actions'

export async function saveProperty(propertyId: string) {
  const userId = await getCurrentUserId()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  try {
    const id = generateId('usp')
    await db.execute({
      sql: 'INSERT OR IGNORE INTO user_saved_properties (id, user_id, property_id) VALUES (?, ?, ?)',
      args: [id, userId, propertyId],
    })

    revalidatePath('/saved')
    return { success: true }
  } catch (error) {
    console.error('Error saving property:', error)
    throw new Error('Failed to save property')
  }
}

export async function unsaveProperty(propertyId: string) {
  const userId = await getCurrentUserId()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  try {
    await db.execute({
      sql: 'DELETE FROM user_saved_properties WHERE user_id = ? AND property_id = ?',
      args: [userId, propertyId],
    })

    revalidatePath('/saved')
    return { success: true }
  } catch (error) {
    console.error('Error unsaving property:', error)
    throw new Error('Failed to unsave property')
  }
}

export async function createPriceAlert(data: {
  propertyId: string
  alertType: string
  targetPrice?: number
  maxPrice?: number
  percentageThreshold?: number
}) {
  const userId = await getCurrentUserId()
  
  if (!userId) {
    throw new Error('Unauthorized')
  }

  try {
    const id = generateId('alert')
    await db.execute({
      sql: `
        INSERT INTO price_alerts (id, user_id, property_id, alert_type, target_price, max_price, percentage_threshold)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        id,
        userId,
        data.propertyId,
        data.alertType,
        data.targetPrice || null,
        data.maxPrice || null,
        data.percentageThreshold || null,
      ],
    })

    revalidatePath('/saved')
    return { success: true }
  } catch (error) {
    console.error('Error creating price alert:', error)
    throw new Error('Failed to create price alert')
  }
}
