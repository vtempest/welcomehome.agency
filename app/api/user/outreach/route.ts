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
      sql: 'SELECT * FROM outreach_activity WHERE user_id = ? ORDER BY created_at DESC LIMIT 20',
      args: [userId],
    })

    return NextResponse.json({ activities: result.rows })
  } catch (error) {
    console.error('Error fetching outreach activity:', error)
    return NextResponse.json({ error: 'Failed to fetch outreach activity' }, { status: 500 })
  }
}
