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
        SELECT * FROM user_agents
        WHERE user_id = ?
        ORDER BY created_at DESC
      `,
      args: [userId],
    })

    return NextResponse.json({ agents: result.rows })
  } catch (error) {
    console.error('[v0] Error fetching agents:', error)
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 })
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
    const { agent_name, agent_category, agent_description } = body

    if (!agent_name || !agent_category) {
      return NextResponse.json({ error: 'Agent name and category required' }, { status: 400 })
    }

    const agentId = `agent-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

    await db.execute({
      sql: `
        INSERT INTO user_agents (id, user_id, agent_name, agent_category, agent_description)
        VALUES (?, ?, ?, ?, ?)
      `,
      args: [agentId, userId, agent_name, agent_category, agent_description || ''],
    })

    return NextResponse.json({ success: true, agentId })
  } catch (error) {
    console.error('[v0] Error creating agent:', error)
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 })
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
    const agentId = searchParams.get('id')

    if (!agentId) {
      return NextResponse.json({ error: 'Agent ID required' }, { status: 400 })
    }

    await db.execute({
      sql: `DELETE FROM user_agents WHERE id = ? AND user_id = ?`,
      args: [agentId, userId],
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Error deleting agent:', error)
    return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 })
  }
}
