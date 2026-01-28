'use client'

import dynamic from 'next/dynamic'

// Dynamic imports müssen in Client Components sein für ssr: false
const TrackingScripts = dynamic(
  () => import('@/components/tracking/TrackingScripts'),
  { ssr: false }
)

const ChatWidget = dynamic(
  () => import('@/components/chat/ChatWidget'),
  { ssr: false }
)

export function ClientSideComponents() {
  return (
    <>
      <ChatWidget />
      <TrackingScripts />
    </>
  )
}
