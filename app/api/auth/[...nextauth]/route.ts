import NextAuth, { NextAuthOptions } from 'next-auth'
import Google from 'next-auth/providers/google'
import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Check if user exists
          const existingUser = await db.execute({
            sql: 'SELECT id FROM users WHERE email = ?',
            args: [user.email!],
          })

          if (existingUser.rows.length === 0) {
            const now = new Date().toISOString()
            await db.execute({
              sql: `INSERT INTO users (email, name, avatar_url, created_at, updated_at) 
                    VALUES (?, ?, ?, ?, ?)`,
              args: [user.email!, user.name || '', user.image || '', now, now],
            })
          } else {
            const now = new Date().toISOString()
            await db.execute({
              sql: `UPDATE users SET name = ?, avatar_url = ?, updated_at = ? 
                    WHERE email = ?`,
              args: [user.name || '', user.image || '', now, user.email!],
            })
          }
        } catch (error) {
          console.error('[v0] Error syncing user to database:', error)
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        try {
          // Get user ID from database
          const result = await db.execute({
            sql: 'SELECT id FROM users WHERE email = ?',
            args: [session.user.email!],
          })
          
          if (result.rows.length > 0) {
            session.user.id = String(result.rows[0].id)
          }
        } catch (error) {
          console.error('[v0] Error fetching user ID:', error)
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
