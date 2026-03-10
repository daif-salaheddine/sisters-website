import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ibtissam - Portfolio',
  description: 'Professional portfolio and CV website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}