import { NextJSLogo } from '@/src/res/logos/NextJSLogo'
import { OpenAILogo } from '@/src/res/logos/OpenAILogo'
import { StripeLogo } from '@/src/res/logos/StripeLogo'
import { TierLogo } from '@/src/res/logos/TierLogo'
import { VercelLogo } from '@/src/res/logos/VercelLogo'

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 pb-24">
      <span className="h6 text-slate-11">Powered By</span>
      {/* Logos */}
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <TierLogo />
        <OpenAILogo />
        <NextJSLogo />
        <VercelLogo />
        <StripeLogo />
      </div>
    </footer>
  )
}
