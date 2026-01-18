'use client'

import {
  AIVertriebIllustration,
  RechtlicheGrundlagenIllustration,
  BANTMethodeIllustration,
  OutsourcingVsInhouseIllustration,
  SDRServiceIllustration,
  EinwandbehandlungIllustration,
} from '@/components/illustrations/blog'

const illustrations: Record<string, React.ComponentType<{ className?: string }>> = {
  AIVertriebIllustration,
  RechtlicheGrundlagenIllustration,
  BANTMethodeIllustration,
  OutsourcingVsInhouseIllustration,
  SDRServiceIllustration,
  EinwandbehandlungIllustration,
}

interface BlogIllustrationProps {
  name: string
}

export default function BlogIllustration({ name }: BlogIllustrationProps) {
  const IllustrationComponent = illustrations[name]

  if (!IllustrationComponent) {
    return null
  }

  return (
    <div className="w-full max-h-[300px] md:max-h-[400px]">
      <IllustrationComponent className="w-full h-full" />
    </div>
  )
}
