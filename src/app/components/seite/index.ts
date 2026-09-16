/**
 * Gemeinsame Bausteine aller Seiten im Stil der Startseite.
 *
 * Was hier liegt, hat keinen Bezug zu einer bestimmten Seite. Alles mit
 * Inhalt — Texte, Abschnittslisten, Schaubilder — gehört zur jeweiligen Seite.
 */
export { default as SectionRail, type RailSection } from './SectionRail'
export { useReveal } from './useReveal'
export { useScrollScene, clamp01, easeOut, isStacked, STACK_BREAKPOINT } from './useScrollScene'
