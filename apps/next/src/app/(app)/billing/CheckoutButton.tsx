'use client'

import { Button } from '@/src/components/ui/Button'
import { Icons } from '@/src/components/ui/icons'
import { toast } from '@/src/components/ui/use-toast'
import type { CurrentPlan, PricingTableData } from '@/src/types'
import { useState } from 'react'

export function CheckoutButton({
  plan,
  currentPlan,
}: {
  plan: PricingTableData
  currentPlan: CurrentPlan
}) {
  const [changePlan, setChangePlan] = useState(false)
  const subscribe = async (planId: string) => {
    try {
      setChangePlan(true)
      const response = await fetch(`/api/change-plan?plan=${planId}`, {
        method: 'GET',
      })
      if (!response?.ok) {
        return toast({
          title: 'Something went wrong.',
          description: 'Please refresh the page and try again.',
          variant: 'destructive',
        })
      }
      const session = await response.json()
      console.log(session)
      if (session) {
        window.location.href = session.url
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className="w-[256px]"
        type="submit"
        name="planId"
        value={plan.planId}
        onClick={() => subscribe(plan.planId)}
      >
        {changePlan && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {plan.base < currentPlan.base ? 'Downgrade' : 'Upgrade'}
      </Button>
    </>
  )
}
