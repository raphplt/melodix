'use client'

import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="from-background via-secondary to-accent min-h-screen bg-gradient-to-br">
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  )
}
