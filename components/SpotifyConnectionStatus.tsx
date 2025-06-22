'use client'
import { useSpotifyAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle, Wifi } from 'lucide-react'

export default function SpotifyConnectionStatus() {
  const { isAuthenticated, hasSpotifyAccess, spotifyError, user } =
    useSpotifyAuth()

  if (!isAuthenticated) {
    return null // Le composant parent gère déjà ce cas
  }

  return (
    <Card className="border-border bg-card/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {hasSpotifyAccess ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-600" />
          )}
          <div>
            <h3 className="text-foreground text-sm font-medium">
              Statut de la connexion Spotify
            </h3>
            <p className="text-muted-foreground text-xs">
              {hasSpotifyAccess
                ? `Connecté en tant que ${user?.display_name || 'utilisateur'}`
                : 'Connexion expirée ou limitée'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Wifi
            className={`h-4 w-4 ${hasSpotifyAccess ? 'text-green-600' : 'text-amber-600'}`}
          />{' '}
          {spotifyError && <AlertCircle className="text-destructive h-4 w-4" />}
        </div>
      </div>

      {spotifyError && (
        <div className="border-border mt-3 border-t pt-3">
          <p className="text-destructive text-xs">
            <strong>Erreur:</strong> {spotifyError}
          </p>
        </div>
      )}
    </Card>
  )
}
