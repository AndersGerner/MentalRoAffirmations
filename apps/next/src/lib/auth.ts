import sendEmail from '@/app/utils/sendEmail'
import {
  TIER_CATEGORIES_FEATURE_ID,
  TIER_PERSONAL_UNLIMITED,
} from '@/config/tierConstants'
import { env } from '@/env.mjs'
import { db } from '@/src/lib/db'
import { tier } from '@/src/lib/tier'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'
import GithubProvider from 'next-auth/providers/github'
import { OrgInfo } from 'tier'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({
        identifier: email,
        url,
        token,
        baseUrl,
        provider,
      }) => {
        // Generate a 5-digit code
        const code = ('00000' + ((Math.random() * 999999) | 0)).slice(-5)

        // Store the code in your database or cache with a short expiration time

        // Send the code via email
        const site = baseUrl.replace(/^https?:\/\//, '')
        await sendEmail({
          to: email,
          subject: `Your verification code for ${site}`,
          text: `Your verification code for ${site} is: ${code}`,
          html: `<p>Your verification code for ${site} is: <strong>${code}</strong></p>`,
        })
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture

        // Check if org/user already exists in Stripe, else create and subscribe to free tier
        try {
          const c = await tier.lookupOrg(`org:${session?.user?.id}`)
          console.log('Checking if user/org already exists in Tier')
          console.log(c)
        } catch (error) {
          // Auto subscribe user to the free plan if they do not have any subscription already.
          // Add OrgInfo to create/update the customer profile while subscribing
          await tier.subscribe(
            `org:${session?.user?.id}`,
            TIER_PERSONAL_UNLIMITED,
            {
              info: {
                name: session?.user?.name as string,
                email: session?.user?.email as string,
              } as OrgInfo,
            }
          )
        } finally {
          return session
        }
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}
