/**
 * Maschinenlesbare Kennzeichnung KI-generierter Medien.
 *
 * Art. 50 Abs. 2 KI-VO (Verordnung (EU) 2024/1689) verlangt, dass synthetisch
 * erzeugte Inhalte in einem maschinenlesbaren Format als solche erkennbar sind.
 * Das ist eine eigenständige Pflicht neben der Erkennbarkeit für Betrachter
 * nach Abs. 4, die `AiGeneratedBadge` abdeckt — beide gehören an dasselbe Bild.
 *
 * Das Attribut ist die im Markup sofort wirksame Stufe. Die vollständige
 * Kennzeichnung braucht zusätzlich Provenienzdaten in der Bilddatei selbst
 * (IPTC `DigitalSourceType: trainedAlgorithmicMedia`, ggf. C2PA). Dabei ist zu
 * beachten, dass die Bildoptimierung von Next.js Dateien neu schreibt und
 * Metadaten dabei verwirft.
 */
export const AI_GENERATED_MEDIA_ATTRS = {
  'data-ai-generated': 'true',
} as const
