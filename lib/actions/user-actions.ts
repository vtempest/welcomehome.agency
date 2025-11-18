'use server'

import { getSession } from '@/lib/auth'
import { db, generateId } from '@/lib/db'

export async function syncUserToDatabase() {
  const session = await getSession()
  
  if (!session?.user?.email) {
    return { success: false, error: 'Not authenticated' }
  }

  try {
    // Check if user exists
    const existingUser = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [session.user.email],
    })

    if (existingUser.rows.length === 0) {
      // Create new user
      const userId = generateId('user')
      await db.execute({
        sql: 'INSERT INTO users (id, email, name, image) VALUES (?, ?, ?, ?)',
        args: [
          userId,
          session.user.email,
          session.user.name || '',
          session.user.image || '',
        ],
      })
      return { success: true, userId, isNew: true }
    } else {
      // Update existing user
      const user = existingUser.rows[0]
      await db.execute({
        sql: 'UPDATE users SET name = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?',
        args: [session.user.name || '', session.user.image || '', session.user.email],
      })
      return { success: true, userId: user.id as string, isNew: false }
    }
  } catch (error) {
    console.error('[v0] Error syncing user to database:', error)
    return { success: false, error: 'Failed to sync user' }
  }
}

export async function getCurrentUserId() {
  const session = await getSession()
  
  if (!session?.user?.email) {
    return null
  }

  try {
    const result = await db.execute({
      sql: 'SELECT id FROM users WHERE email = ?',
      args: [session.user.email],
    })

    if (result.rows.length > 0) {
      return result.rows[0].id as string
    }

    return null
  } catch (error) {
    console.error('[v0] Error getting user ID:', error)
    return null
  }
}
