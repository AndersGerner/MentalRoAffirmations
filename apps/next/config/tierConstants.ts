import { TierPlanConstant } from '@/src/types'
import type { FeatureName, PlanName } from 'tier'

// Plans
export const TIER_PERSONAL_UNLIMITED_PLAN_ID = 'plan:personalunlimited@5'
export const TIER_CATEGORIES_PLAN_ID = 'plan:categories@3'
export const TIER_ALL_INCLUSIVE_PLAN_ID = 'plan:allinclusive@5'

// Features
export const TIER_PERSONAL_UNLIMITED_FEATURE_ID = 'feature:personalunlimited'
export const TIER_CATEGORIES_FEATURE_ID = 'feature:categories'
export const TIER_ALL_INCLUSIVE_FEATURE_ID = 'feature:allinclusive'

// Make sure to maintain the order of the plan that you would require
export const tierPlanConstants: TierPlanConstant[] = [
  {
    planId: TIER_PERSONAL_UNLIMITED_PLAN_ID as PlanName,
    promoted: false,
  },
  {
    planId: TIER_CATEGORIES_PLAN_ID as PlanName,
    promoted: false,
  },
  {
    planId: TIER_ALL_INCLUSIVE_PLAN_ID as PlanName,
    promoted: true,
  },
]

// Make sure to maintain the order of the (do not include your base price feature in this)
export const tierFeatureConstants: FeatureName[] = [
  TIER_CATEGORIES_FEATURE_ID,
  TIER_ALL_INCLUSIVE_FEATURE_ID,
]
