import { TIER_PERSONAL_UNLIMITED_PLAN_ID } from '@/config/tierConstants'
import type { CurrentPlan, PricingTableData } from '@/src/types'
import type { CurrentPhase } from 'tier'

export const pullCurrentPlan = async (
  currentPhase: CurrentPhase,
  pricingTableData: PricingTableData[]
): Promise<CurrentPlan> => {
  const currentPlanId = currentPhase.plans
    ? currentPhase.plans[0]
    : TIER_PERSONAL_UNLIMITED_PLAN_ID

  const pricingTablePlan = pricingTableData.find(
    (_plan) => _plan.planId === currentPlanId
  )

  return {
    planId: currentPlanId,
    name: pricingTablePlan ? pricingTablePlan.name : 'Free',
    base: pricingTablePlan ? pricingTablePlan.base : 0,
    currency: pricingTablePlan ? pricingTablePlan.currency : 'usd',
    interval: pricingTablePlan ? pricingTablePlan.interval : 'monthly',
    extraUsageRate: pricingTablePlan?.extraUsageRate,
  }
}
