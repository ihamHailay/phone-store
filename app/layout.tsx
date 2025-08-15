import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "iStore Sophi - iPhone Inventory Management",
  description: "Professional iPhone inventory management system",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="apple-bg-primary">{children}</body>
    </html>
  )
}
