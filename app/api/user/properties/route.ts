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
    // Get user's saved properties
    const result = await db.execute({
      sql: `
        SELECT p.*, usp.saved_at
        FROM properties p
        JOIN user_saved_properties usp ON p.id = usp.property_id
        WHERE usp.user_id = ?
        ORDER BY usp.saved_at DESC
      `,
      args: [userId],
    })

    return NextResponse.json({ properties: result.rows })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getSession()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = await getCurrentUserId()
  
  if (!userId) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const body = await request.json()
    const { address, city, state, zip, price, bedrooms, bathrooms, square_feet, property_type, image_url } = body

    // Validate required fields
    if (!address || !city || !state || !zip || !price || !bedrooms || !bathrooms || !square_feet || !property_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const propertyId = `prop-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    // Insert property
    await db.execute({
      sql: `
        INSERT INTO properties (id, address, city, state, zip, price, bedrooms, bathrooms, square_feet, property_type, image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [propertyId, address, city, state, zip, price, bedrooms, bathrooms, square_feet, property_type, image_url || null],
    })

    // Save to user's saved properties
    await db.execute({
      sql: `
        INSERT INTO user_saved_properties (id, user_id, property_id)
        VALUES (?, ?, ?)
      `,
      args: [`usp-${Date.now()}`, userId, propertyId],
    })

    return NextResponse.json({ success: true, propertyId })
  } catch (error) {
    console.error('[v0] Error creating property:', error)
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const session = await getSession()
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = await getCurrentUserId()
  
  if (!userId) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get('id')

    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID required' }, { status: 400 })
    }

    // Remove from user's saved properties
    await db.execute({
      sql: `DELETE FROM user_saved_properties WHERE user_id = ? AND property_id = ?`,
      args: [userId, propertyId],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error deleting property:', error)
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
  }
}
