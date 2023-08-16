// pages/api/auth/verify.ts
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { email, code } = req.body

  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code are required' })
  }

  // Fetch the stored code for the given email
  const storedCode = await prisma.verificationToken.findUnique({
    where: {
      identifier: email,
      token: code,
    },
  })

  if (!storedCode) {
    return res.status(404).json({ error: 'Code not found' })
  }

  if (storedCode.token !== code) {
    return res.status(403).json({ error: 'Invalid code' })
  }

  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: email,
        token: code,
      },
    },
  })

  return res.status(200).json({ success: true })
}
