'use client'

import { useMemo } from 'react'

interface MarkdownProps {
  content: string
}

/** Eigene Domain: Links dorthin bleiben im Tab und brauchen kein `rel`. */
const EIGENE_DOMAIN = 'carpantier-consulting.de'

/**
 * Wandelt einen zusammenhängenden Tabellenblock in HTML.
 *
 * Vorher wurde jede Tabellenzeile einzeln ersetzt und die Kopfzeile daran
 * erkannt, ob sie vor dem ersten Vorkommen von `|---|` im **gesamten** Text
 * stand. Bei mehreren Tabellen in einem Beitrag traf das nur auf die erste zu;
 * alle weiteren verloren ihre Kopfzeile. Seit der Blogsanierung vom
 * 10.09.2026 enthält fast jeder Beitrag mehr als eine Tabelle, deshalb wird
 * hier blockweise gearbeitet: Trennzeile suchen, alles davor ist Kopf.
 */
function tabelleZuHtml(block: string): string {
  const zeilen = block.trim().split('\n')
  const istTrennzeile = (zeile: string) => /^\|[\s:|-]+\|$/.test(zeile.trim())
  const trennIndex = zeilen.findIndex(istTrennzeile)

  const zellen = (zeile: string) =>
    zeile
      .trim()
      .replace(/^\||\|$/g, '')
      .split('|')
      .map((zelle) => zelle.trim())

  const kopfZeilen = trennIndex > 0 ? zeilen.slice(0, trennIndex) : []
  const koerperZeilen = trennIndex > 0 ? zeilen.slice(trennIndex + 1) : zeilen

  const kopf = kopfZeilen
    .map(
      (zeile) =>
        `<tr>${zellen(zeile)
          .map(
            (zelle) =>
              `<th class="px-4 py-3 text-left text-sm font-semibold text-foreground bg-muted">${zelle}</th>`
          )
          .join('')}</tr>`
    )
    .join('')

  const koerper = koerperZeilen
    .filter((zeile) => zeile.trim().length > 0)
    .map(
      (zeile) =>
        `<tr>${zellen(zeile)
          .map(
            (zelle) =>
              `<td class="px-4 py-3 text-sm text-muted-foreground border-t border-border align-top">${zelle}</td>`
          )
          .join('')}</tr>`
    )
    .join('')

  return (
    '<div class="overflow-x-auto my-6">' +
    '<table class="w-full border border-border rounded-lg overflow-hidden">' +
    (kopf ? `<thead>${kopf}</thead>` : '') +
    `<tbody>${koerper}</tbody>` +
    '</table></div>'
  )
}

// Einfacher Markdown-Renderer für die Fachbeiträge.
// Der Inhalt stammt ausschließlich aus `src/content/blog/` -- also aus dem
// eigenen Repository, nicht aus Benutzereingaben.
export default function Markdown({ content }: MarkdownProps) {
  const html = useMemo(() => {
    let result = content

    // Tabellen zuerst: als ganze Blöcke, bevor Zeilen einzeln angefasst werden.
    result = result.replace(/(?:^\|.*\|[ \t]*$\n?){2,}/gm, tabelleZuHtml)

    // Überschriften (Reihenfolge zählt - spezifischere zuerst)
    result = result.replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold text-foreground mt-6 mb-3">$1</h4>')
    result = result.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-foreground mt-8 mb-4">$1</h3>')
    result = result.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-foreground mt-10 mb-4">$1</h2>')
    result = result.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-foreground mt-12 mb-6">$1</h1>')

    // Fett und kursiv
    result = result.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold"><em>$1</em></strong>')
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    result = result.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Links.
    //
    // Seit der Blogsanierung verweist jeder Beitrag auf mindestens eine externe
    // Quelle -- Gesetzestexte, Behörden, Statistisches Bundesamt. Diese Links
    // öffnen in einem neuen Tab, damit der Beitrag nicht verlassen wird, und
    // tragen `rel="noopener"`, weil die Zielseite sonst über `window.opener`
    // auf das öffnende Fenster zugreifen kann. `nofollow` steht bewusst NICHT
    // dabei: Verweise auf Primärquellen sind ein Qualitätssignal, kein Risiko.
    result = result.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_treffer, text: string, ziel: string) => {
      const istExtern = /^https?:\/\//i.test(ziel) && !ziel.includes(EIGENE_DOMAIN)
      const zusatz = istExtern ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${ziel}" class="text-primary hover:underline"${zusatz}>${text}</a>`
    })

    // Inline-Code
    result = result.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 bg-muted text-primary rounded text-sm">$1</code>'
    )

    // Zitatblöcke
    result = result.replace(
      /^> (.*)$/gim,
      '<blockquote class="border-l-4 border-primary pl-4 py-2 my-4 bg-muted rounded-r italic text-muted-foreground">$1</blockquote>'
    )

    // Listenpunkte markieren, damit sich Aufzählung und Nummerierung
    // anschließend getrennt einfassen lassen. Vorher wurden nummerierte Listen
    // erst nach dem Einfassen erzeugt und blieben deshalb ohne <ol> -- die
    // Nummern fehlten im Ergebnis.
    result = result.replace(
      /^- (.*$)/gim,
      '<li data-liste="ul" class="mb-2 text-muted-foreground">$1</li>'
    )
    result = result.replace(
      /^\d+\. (.*$)/gim,
      '<li data-liste="ol" class="mb-2 text-muted-foreground">$1</li>'
    )

    result = result.replace(
      /(?:<li data-liste="ul"[\s\S]*?<\/li>\s*)+/g,
      (treffer) => `<ul class="list-disc list-outside ml-6 my-4 space-y-1">${treffer}</ul>`
    )
    result = result.replace(
      /(?:<li data-liste="ol"[\s\S]*?<\/li>\s*)+/g,
      (treffer) => `<ol class="list-decimal list-outside ml-6 my-4 space-y-1">${treffer}</ol>`
    )

    // Das Marker-Attribut hat seine Aufgabe erfüllt, sobald die Listen
    // eingefasst sind. Es gehört nicht in das ausgelieferte HTML -- dort wäre
    // es ein Implementierungsdetail, das jeder Besucher im Quelltext sieht.
    result = result.replace(/ data-liste="(?:ul|ol)"/g, '')

    // Absätze: alles, was noch keine HTML-Zeile ist
    result = result.replace(/^(?!<[a-z]|<\/|$)(.+)$/gim, '<p class="text-muted-foreground leading-relaxed mb-4">$1</p>')

    // Leere Absätze entfernen
    result = result.replace(/<p[^>]*>\s*<\/p>/g, '')

    return result
  }, [content])

  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
