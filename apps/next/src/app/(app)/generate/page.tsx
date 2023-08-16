import { TIER_CATEGORIES_FEATURE_ID } from '@/config/tierConstants'
import { Generate } from '@/src/components/app/GenerateSection'
import { getCurrentUser } from '@/src/lib/session'
import { tier } from '@/src/lib/tier'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Generate Copy',
  description: 'Generate your AI based marketing content',
}

export default async function GeneratePage() {
  const user = await getCurrentUser()

  // Fetch the feature consumption and limit of the AI copy feature for the plan currently subscribed
  const featureLimits = await tier.lookupLimit(
    `org:${user?.id}`,
    TIER_CATEGORIES_FEATURE_ID
  )

  return (
    <>
      <Generate user={user} featureLimits={featureLimits} />
    </>
  )
}
