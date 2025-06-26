import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from '@/components/AuthProvider'
import { SpotifyAuthProvider } from '@/contexts/SpotifyAuthProvider'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Melodix - Challenge Your Musical Ear',
  description:
    'Challenge your ears, discover new music, and connect with a global community of music enthusiasts',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} pt-16 antialiased`}
      >
        <AuthProvider>
          <SpotifyAuthProvider>
            <Header />
            {children}
            <Footer />
          </SpotifyAuthProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
