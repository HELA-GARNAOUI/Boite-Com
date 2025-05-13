import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { OdooClient } from "@/lib/odoo-client"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "odoo",
      name: "Odoo",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          const odooClient = new OdooClient({
            baseUrl: process.env.ODOO_URL || "",
            db: process.env.ODOO_DB || "",
            username: credentials.username,
            password: credentials.password,
          })

          const connected = await odooClient.connect()

          if (!connected) {
            return null
          }

          // Get user info from Odoo
          const userInfo = await odooClient.callMethod("res.users", "read", [[odooClient.uid]], {
            fields: ["name", "email", "partner_id"],
          })

          if (!userInfo || !userInfo.length) {
            return null
          }

          return {
            id: userInfo[0].id.toString(),
            name: userInfo[0].name,
            email: userInfo[0].email,
            odooSession: odooClient.sessionId,
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.odooSession = user.odooSession
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.odooSession = token.odooSession
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})

export { handler as GET, handler as POST }
