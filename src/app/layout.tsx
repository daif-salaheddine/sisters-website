import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ibtissam | Portfolio',
  description: 'A refined portfolio showcasing heritage, elegance, and artistry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-cream-200 text-ink-900 antialiased">
        {children}
      </body>
    </html>
  )
}