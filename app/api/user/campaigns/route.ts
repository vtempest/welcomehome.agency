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
    const result = await db.execute({
      sql: 'SELECT * FROM marketing_campaigns WHERE user_id = ? ORDER BY created_at DESC',
      args: [userId],
    })

    return NextResponse.json({ campaigns: result.rows })
  } catch (error) {
    console.error('Error fetching campaigns:', error)
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 })
  }
}
