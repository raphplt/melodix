'use client'

import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="from-background via-secondary to-accent min-h-screen bg-gradient-to-br">
      <main className="pt-16">{children}</main>
    </div>
  )
}
