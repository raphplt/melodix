'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Music, AlertCircle, Clock, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { SpotifyFetchParams } from '@/types/spotify'
import { useSpotifyData } from '@/hooks/useSpotifyData'
import { useSpotifyAuth } from '@/contexts/AuthContext'
import SpotifySettings from '@/components/SpotifySettings'
import UserProfile from '@/components/UserProfile'
import TopTracks from '@/components/TopTracks'
import TopArtists from '@/components/TopArtists'
import SpotifyStats from '@/components/SpotifyStats'
import SpotifyConnectionStatus from '@/components/SpotifyConnectionStatus'

export default function SpotifyProfile() {
  const {
    isAuthenticated,
    isLoading: authLoading,
    signIn,
    spotifyError: authError,
  } = useSpotifyAuth()
  const {
    userData,
    topTracks,
    topArtists,
    params,
    lastFetched,
    isLoading,
    error,
    fetchSpotifyData,
    updateParams,
    clearCache,
    isCacheValid,
  } = useSpotifyData()
  useEffect(() => {
    if (isAuthenticated && !userData && !isLoading && !isCacheValid()) {
      fetchSpotifyData()
    }
  }, [isAuthenticated, userData, isLoading, fetchSpotifyData, isCacheValid])

  const handleParamsChange = (newParams: SpotifyFetchParams) => {
    updateParams(newParams)
    fetchSpotifyData(newParams)
  }

  const formatLastFetched = (dateString: string | null) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Card className="border-border bg-card/50 p-8 text-center">
        <Music className="text-primary mx-auto mb-4 h-16 w-16" />
        <h2 className="text-foreground mb-4 text-2xl font-bold">
          Connectez-vous à Spotify
        </h2>
        <p className="text-muted-foreground mb-6">
          Découvrez vos statistiques musicales et connectez-vous avec votre
          compte Spotify
        </p>{' '}
        <Button
          onClick={() => signIn()}
          className="bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          <Music className="mr-2 h-5 w-5" />
          Se connecter avec Spotify
        </Button>
      </Card>
    )
  }
  return (
    <div className="space-y-6">
      {/* Affichage des erreurs d'authentification */}
      {authError && (
        <Card className="border-destructive bg-destructive/10 p-4">
          <div className="text-destructive flex items-center">
            <AlertCircle className="mr-2 h-4 w-4" />
            <span className="text-sm">
              Erreur d&apos;authentification: {authError}
            </span>
          </div>
        </Card>
      )}

      {/* Affichage des erreurs de l'API Spotify */}
      {error && (
        <Card className="border-destructive bg-destructive/10 p-4">
          <div className="text-destructive flex items-center">
            <AlertCircle className="mr-2 h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>{' '}
        </Card>
      )}

      {/* Statut de connexion */}
      <SpotifyConnectionStatus />

      <SpotifySettings
        params={params}
        onParamsChange={handleParamsChange}
        onRefresh={() => fetchSpotifyData()}
        isLoading={isLoading}
      />
      {lastFetched && (
        <Card className="border-border bg-card/50 p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Dernière mise à jour : {formatLastFetched(lastFetched)}
            </div>
            <Button
              onClick={clearCache}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Vider le cache
            </Button>
          </div>
        </Card>
      )}
      <UserProfile userData={userData} isLoading={isLoading} />
      <SpotifyStats
        userData={userData}
        topTracks={topTracks}
        topArtists={topArtists}
        isLoading={isLoading}
      />
      {/* Grille des top tracks et artists */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopTracks tracks={topTracks} isLoading={isLoading} />
        <TopArtists artists={topArtists} isLoading={isLoading} />
      </div>
    </div>
  )
}
