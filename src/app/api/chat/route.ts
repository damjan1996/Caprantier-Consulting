import { NextResponse } from 'next/server'

/**
 * Der KI-Chat wurde am 30.08.2026 von der Website entfernt.
 *
 * Der Endpunkt bleibt bewusst bestehen und antwortet mit 410 Gone, statt ihn
 * ersatzlos zu löschen: Ein 404 wäre für einen Aufrufer nicht von einem Fehler
 * zu unterscheiden. Wichtiger ist aber, dass hier kein Weg mehr in die
 * Anthropic-API offen steht — die Route war öffentlich erreichbar und hätte
 * ohne Chatfenster weiter Kosten verursachen können.
 *
 * Die vollständige Implementierung liegt in der Git-Historie (Commit davor)
 * und lässt sich mit einem `git revert` zurückholen. Die Hilfsmodule unter
 * `src/lib/chat/` sind absichtlich unangetastet geblieben.
 */
function gone() {
  return NextResponse.json(
    { error: 'Der KI-Chat wurde eingestellt.' },
    { status: 410, headers: { 'Cache-Control': 'no-store' } }
  )
}

export async function POST() {
  return gone()
}

export async function GET() {
  return gone()
}
