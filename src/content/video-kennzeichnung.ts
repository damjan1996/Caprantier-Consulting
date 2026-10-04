/**
 * Videos, deren Stimme ein KI-Klon von Nicos eigener Stimme ist.
 *
 * Stand 04.10.2026: die sechs Kurzvideos vom 29.09. bis 03.10.2026. Für ältere
 * Videos gibt es keine Angabe; die Website sagt dazu nichts und behauptet keine
 * Vollständigkeit.
 * Kennzeichnung nach Art. 50 KI-VO, siehe auch `/ki-transparenz`.
 *
 * Neue Videos mit KI-Stimme gehören hier eingetragen, sonst bleiben sie
 * auf der Website ungekennzeichnet.
 */
export const KI_STIMME_VIDEO_IDS: ReadonlySet<string> = new Set([
  '000QE7vXTgs', // 03.10.2026
  'Ynh-P_vOFlY', // 02.10.2026
  'pFvjWrrHoXE', // 01.10.2026
  '0ZSDazHzrKY', // 01.10.2026
  'yjY40dfG7s4', // 30.09.2026
  'm3EaedNtvzg', // 29.09.2026
])

export const KI_STIMME_HINWEIS =
  'Die Stimme in diesem Video ist ein KI-Klon der Stimme von Nico Carpantier.'

export function hatKiStimme(videoId: string): boolean {
  return KI_STIMME_VIDEO_IDS.has(videoId)
}

/**
 * Hinweis für eine Gruppe von Videos, etwa die Kacheln auf `/wissen`.
 * `null`, wenn keines der Videos eine KI-Stimme hat.
 */
export function kiStimmeHinweisFuer(videoIds: string[]): string | null {
  const betroffen = videoIds.filter(hatKiStimme).length
  if (betroffen === 0) return null
  if (betroffen === videoIds.length) {
    return 'In diesen Videos ist die Stimme ein KI-Klon der Stimme von Nico Carpantier.'
  }
  return 'In einigen dieser Videos ist die Stimme ein KI-Klon der Stimme von Nico Carpantier. Die Videoseite nennt sie einzeln.'
}
