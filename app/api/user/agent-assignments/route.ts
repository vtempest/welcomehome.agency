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
      sql: `
        SELECT 
          apa.*,
          ua.agent_name,
          ua.agent_category,
          p.address,
          p.city,
          p.state
        FROM agent_property_assignments apa
        JOIN user_agents ua ON apa.agent_id = ua.id
        JOIN properties p ON apa.property_id = p.id
        WHERE apa.user_id = ?
        ORDER BY apa.created_at DESC
      `,
      args: [userId],
    })

    return NextResponse.json({ assignments: result.rows })
  } catch (error) {
    console.error('[v0] Error fetching assignments:', error)
    return NextResponse.json({ error: 'Failed to fetch assignments' }, { status: 500 })
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
    const { agent_ids, property_ids } = body

    if (!agent_ids || !property_ids || !Array.isArray(agent_ids) || !Array.isArray(property_ids)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 })
    }

    const assignments = []
    
    for (const agentId of agent_ids) {
      for (const propertyId of property_ids) {
        const assignmentId = `assign-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
        
        try {
          await db.execute({
            sql: `
              INSERT INTO agent_property_assignments (id, user_id, agent_id, property_id, status)
              VALUES (?, ?, ?, ?, 'active')
            `,
            args: [assignmentId, userId, agentId, propertyId],
          })
          assignments.push(assignmentId)
        } catch (error) {
          console.error('[v0] Error creating assignment (may already exist):', error)
        }
      }
    }

    return NextResponse.json({ success: true, assignments })
  } catch (error) {
    console.error('[v0] Error creating assignments:', error)
    return NextResponse.json({ error: 'Failed to create assignments' }, { status: 500 })
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
    const assignmentId = searchParams.get('id')

    if (!assignmentId) {
      return NextResponse.json({ error: 'Assignment ID required' }, { status: 400 })
    }

    await db.execute({
      sql: `DELETE FROM agent_property_assignments WHERE id = ? AND user_id = ?`,
      args: [assignmentId, userId],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error deleting assignment:', error)
    return NextResponse.json({ error: 'Failed to delete assignment' }, { status: 500 })
  }
}
