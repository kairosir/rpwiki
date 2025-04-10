import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { pool } from '@/lib/db'
import bcrypt from 'bcrypt'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const { rows } = await pool.query(
            'SELECT id, email, username, password, role FROM users WHERE email = $1',
            [credentials.email]
          )

          const user = rows[0]

          if (!user) {
            console.log('User not found')
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            console.log('Invalid password')
            return null
          }

          // Обновляем last_login
          await pool.query(
            'UPDATE users SET last_login = NOW() WHERE id = $1',
            [user.id]
          )

          return {
            id: user.id.toString(),
            email: user.email,
            username: user.username,
            role: user.role
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.username = token.username as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST } 