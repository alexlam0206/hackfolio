import NextAuth from "next-auth"
import { useHtmlContext } from "next/dist/shared/lib/html-context.shared-runtime"

const handler = NextAuth({
  providers: [
    {
      id: "hackclub",
      name: "Hack Club",
      type: "oauth",
      authorization: {
        url: "https://auth.hackclub.com/oauth/authorize",
        params: { scope: "openid email profile" },
      },
      token: {
        url: "https://auth.hackclub.com/oauth/token",
        async request(context) {
          const { provider, params } = context
          const { code } = params
          
          console.log("Token Request Debug:", {
            callbackUrl: provider.callbackUrl,
            code: code ? "present" : "missing",
            clientId: provider.clientId
          })

          const tokens = await fetch("https://auth.hackclub.com/oauth/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              client_id: provider.clientId,
              client_secret: provider.clientSecret,
              code,
              grant_type: "authorization_code",
              redirect_uri: provider.callbackUrl,
            }),
          }).then(async res => {
            const data = await res.json()
            console.log("Token Response:", JSON.stringify(data, null, 2))
            return data
          })

          if (tokens.error) {
            console.error("Hack Club Token Error:", tokens)
            throw new Error(JSON.stringify(tokens))
          }
          
          return { tokens }
        }
      },
      userinfo: "https://auth.hackclub.com/api/v1/me",
      clientId: process.env.HACKCLUB_CLIENT_ID,
      clientSecret: process.env.HACKCLUB_CLIENT_SECRET,
      profile(profile) {
        console.log("Hack Club Profile:", JSON.stringify(profile, null, 2))
        
        // Handle both nested 'identity' and flat structure
        const identity = profile.identity || profile
        
        return {
          id: identity.id || identity.sub,
          name: identity.first_name && identity.last_name 
            ? `${identity.first_name} ${identity.last_name}` 
            : (identity.name || identity.first_name || "Hack Club User"),
          email: identity.primary_email || identity.email,
          image: identity.avatar || identity.image || null,
          username: identity.username || identity.slack_id || null,
        }
      },
    },
  ],
  debug: true,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token
        token.id = user.id
        token.username = (user as any).username
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user.id = token.id as string
      session.user.username = token.username
      return session
    },
  },
})

export { handler as GET, handler as POST }



