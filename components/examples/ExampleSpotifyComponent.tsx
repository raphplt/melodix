'use client'
import { useSpotifyAuth } from '@/contexts/SpotifyAuthProvider'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Music, User } from 'lucide-react'
import Image from 'next/image'

// Exemple de composant utilisant le contexte Spotify
export default function ExampleSpotifyComponent() {
  const {
    isAuthenticated,
    isLoading,
    user,
    signIn,
    signOut,
    hasSpotifyAccess,
    spotifyError,
  } = useSpotifyAuth()

  // État de chargement
  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex animate-pulse items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-gray-300"></div>
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-gray-300"></div>
            <div className="h-3 w-16 rounded bg-gray-300"></div>
          </div>
        </div>
      </Card>
    )
  }

  // Utilisateur non connecté
  if (!isAuthenticated) {
    return (
      <Card className="p-6 text-center">
        <Music className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
        <h3 className="mb-2 text-lg font-semibold">Connexion requise</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Connectez-vous à Spotify pour accéder à cette fonctionnalité
        </p>
        <Button onClick={signIn} className="w-full">
          <User className="mr-2 h-4 w-4" />
          Se connecter avec Spotify
        </Button>
      </Card>
    )
  }

  // Utilisateur connecté
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {user?.images?.[0] && (
            <Image
              src={user.images[0].url}
              alt={user.display_name}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            <h3 className="font-semibold">{user?.display_name}</h3>
            <p className="text-muted-foreground text-sm">
              {hasSpotifyAccess ? 'Accès Spotify actif' : 'Accès limité'}
            </p>
            {spotifyError && (
              <p className="text-destructive text-xs">{spotifyError}</p>
            )}
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={signOut}>
          Déconnexion
        </Button>
      </div>

      {/* Contenu spécifique à votre composant */}
      <div className="mt-4 border-t pt-4">
        <p className="text-muted-foreground text-sm">
          Ici vous pouvez ajouter le contenu spécifique de votre composant qui
          nécessite une authentification Spotify.
        </p>
      </div>
    </Card>
  )
}
