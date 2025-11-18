import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/actions/user-actions'

export async function GET() {
  const session = await getSession()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = await getCurrentUserId()
  
  if (!userId) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    // Get price alerts with property info
    const result = await db.execute({
      sql: `
        SELECT ph.*, p.address, p.city, p.state, p.image_url, p.bedrooms, p.bathrooms, p.square_feet
        FROM price_history ph
        JOIN properties p ON ph.property_id = p.id
        JOIN user_saved_properties usp ON p.id = usp.property_id
        WHERE usp.user_id = ?
        ORDER BY ph.recorded_at DESC
        LIMIT 10
      `,
      args: [userId],
    })

    return NextResponse.json({ alerts: result.rows })
  } catch (error) {
    console.error('Error fetching price alerts:', error)
    return NextResponse.json({ error: 'Failed to fetch price alerts' }, { status: 500 })
  }
}
