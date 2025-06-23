'use client'
import SpotifyProfile from '@/components/SpotifyProfile'
import { useSpotifyAuth } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useSpotifyAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect('/auth/login')
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="from-primary via-secondary to-accent flex min-h-screen items-center justify-center bg-gradient-to-br">
        <div className="text-center">
          <div className="mx-auto mb-4 h-32 w-32 animate-spin rounded-full border-b-2 border-white"></div>
          <p className="text-primary-foreground text-lg">
            Chargement du profil...
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // redirect will handle this
  }

  return (
    <div className="from-primary via-secondary to-accent min-h-screen bg-gradient-to-br">
      <div className="container mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-primary-foreground mb-4 text-4xl font-bold">
            Votre Profil Musical
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Découvrez vos statistiques musicales et gérez votre compte Spotify
          </p>
        </div>
        <SpotifyProfile />
      </div>
    </div>
  )
}
