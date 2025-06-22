'use client'
import SpotifyProfile from '@/components/SpotifyProfile'

export default function SpotifyPage() {
  return (
    <div className="from-primary via-secondary to-accent min-h-screen bg-gradient-to-br">
      <div className="container mx-auto max-w-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-primary-foreground mb-4 text-4xl font-bold">
            Votre Profil Spotify
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Découvrez vos statistiques musicales et connectez-vous avec Spotify
          </p>
        </div>
        <SpotifyProfile />
      </div>
    </div>
  )
}
