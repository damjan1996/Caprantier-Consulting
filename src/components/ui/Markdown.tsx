'use client'

import { useMemo } from 'react'

interface MarkdownProps {
  content: string
}

// Simple markdown parser for blog content
export default function Markdown({ content }: MarkdownProps) {
  const html = useMemo(() => {
    let result = content

    // Headers (order matters - more specific first)
    result = result.replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold text-white mt-6 mb-3">$1</h4>')
    result = result.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-white mt-8 mb-4">$1</h3>')
    result = result.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    result = result.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mt-12 mb-6">$1</h1>')

    // Bold and italic
    result = result.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold"><em>$1</em></strong>')
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    result = result.replace(/\*(.*?)\*/g, '<em>$1</em>')

    // Links
    result = result.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary hover:underline">$1</a>'
    )

    // Inline code
    result = result.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 bg-white/10 text-primary rounded text-sm">$1</code>'
    )

    // Blockquotes
    result = result.replace(
      /^> (.*)$/gim,
      '<blockquote class="border-l-4 border-primary pl-4 py-2 my-4 bg-white/5 rounded-r italic text-muted-foreground">$1</blockquote>'
    )

    // Tables
    result = result.replace(/^\|(.+)\|$/gm, (match, content) => {
      const cells = content.split('|').map((cell: string) => cell.trim())
      const isHeader = cells.some((cell: string) => cell.includes('---'))
      if (isHeader) return ''

      const cellHtml = cells.map((cell: string, index: number) => {
        // Check if this is a header row (first row before separator)
        const isFirstRow = result.indexOf(match) < result.indexOf('|---|')
        if (isFirstRow && index >= 0) {
          return `<th class="px-4 py-3 text-left text-sm font-semibold text-white bg-white/10">${cell}</th>`
        }
        return `<td class="px-4 py-3 text-sm text-muted-foreground border-t border-white/10">${cell}</td>`
      }).join('')

      return `<tr>${cellHtml}</tr>`
    })

    // Wrap tables
    const tableRegex = /(<tr>.*<\/tr>\s*)+/gs
    result = result.replace(tableRegex, (match) => {
      return `<div class="overflow-x-auto my-6"><table class="w-full border border-white/10 rounded-lg overflow-hidden">${match}</table></div>`
    })

    // Unordered lists
    result = result.replace(/^- (.*$)/gim, '<li class="ml-4 mb-2 text-muted-foreground">$1</li>')
    result = result.replace(/(<li.*<\/li>\s*)+/g, '<ul class="list-disc list-inside my-4 space-y-1">$&</ul>')

    // Ordered lists
    result = result.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-2 text-muted-foreground">$1</li>')

    // Paragraphs (lines that don't start with HTML tags)
    result = result.replace(/^(?!<[a-z]|<\/|$)(.+)$/gim, '<p class="text-muted-foreground leading-relaxed mb-4">$1</p>')

    // Clean up empty paragraphs
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
