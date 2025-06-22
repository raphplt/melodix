'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Music, Users, Play, Clock, LogOut, AlertCircle } from 'lucide-react'
import { useState, useCallback } from 'react'
import { SpotifyUser, SpotifyTrack, SpotifyTopArtist } from '@/types/spotify'
import Image from 'next/image'
import { useSpotify } from '@/hooks/useSpotify'

export default function SpotifyProfile() {
  const { data: session, status } = useSession()
  const { executeSpotifyCall, isLoading: spotifyLoading, error } = useSpotify()
  const [userData, setUserData] = useState<SpotifyUser | null>(null)
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([])
  const [topArtists, setTopArtists] = useState<SpotifyTopArtist[]>([])

  const fetchSpotifyData = useCallback(async () => {
    const userData = await executeSpotifyCall(async (spotify) => {
      const [user, tracks, artists] = await Promise.all([
        spotify.getCurrentUser(),
        spotify.getTopTracks('medium_term', 5),
        spotify.getTopArtists('medium_term', 5),
      ])
      return { user, tracks, artists }
    })

    if (userData) {
      setUserData(userData.user)
      setTopTracks(userData.tracks.items)
      setTopArtists(userData.artists.items)
    }
  }, [executeSpotifyCall])
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
      </div>
    )
  }
  if (!session) {
    return (
      <Card className="border-border bg-card/50 p-8 text-center">
        <Music className="text-primary mx-auto mb-4 h-16 w-16" />
        <h2 className="text-foreground mb-4 text-2xl font-bold">
          Connectez-vous à Spotify
        </h2>
        <p className="text-muted-foreground mb-6">
          Découvrez vos statistiques musicales et connectez-vous avec votre
          compte Spotify
        </p>
        <Button
          onClick={() => signIn('spotify')}
          className="bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          <Music className="mr-2 h-5 w-5" />
          Se connecter avec Spotify
        </Button>
      </Card>
    )
  }
  if (spotifyLoading) {
    return (
      <Card className="border-border bg-card/50 p-8">
        <div className="flex items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <span className="text-foreground ml-3">
            Chargement de vos données Spotify...
          </span>
        </div>
      </Card>
    )
  }
  return (
    <div className="space-y-6">
      {/* Affichage des erreurs */}
      {error && (
        <Card className="border-destructive bg-destructive/10 p-4">
          <div className="text-destructive flex items-center">
            <AlertCircle className="mr-2 h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        </Card>
      )}
      {/* Profil utilisateur */}
      {userData && (
        <Card className="border-border bg-card/50 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {userData.images && userData.images[0] && (
                <Image
                  src={userData.images[0].url}
                  alt={userData.display_name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div>
                <h2 className="text-foreground text-2xl font-bold">
                  {userData.display_name}
                </h2>
                <p className="text-muted-foreground">{userData.email}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="text-muted-foreground flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    <span className="text-sm">
                      {userData.followers.total} followers
                    </span>
                  </div>
                  <span className="rounded-full bg-green-600 px-2 py-1 text-xs text-white">
                    {userData.product}
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => signOut()}
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </Card>
      )}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Tracks */}
        <Card className="border-border bg-card/50 p-6">
          <h3 className="text-foreground mb-4 flex items-center text-xl font-bold">
            <Play className="text-primary mr-2 h-5 w-5" />
            Vos morceaux favoris
          </h3>
          <div className="space-y-3">
            {topTracks.map((track, index) => (
              <div key={track.id} className="flex items-center space-x-3">
                <span className="text-primary w-6 text-sm font-bold">
                  {index + 1}
                </span>
                {track.album.images[0] && (
                  <Image
                    src={track.album.images[0].url}
                    alt={track.album.name}
                    width={48}
                    height={48}
                    className="rounded"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate font-medium">
                    {track.name}
                  </p>
                  <p className="text-muted-foreground truncate text-sm">
                    {track.artists.map((artist) => artist.name).join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        {/* Top Artists */}
        <Card className="border-border bg-card/50 p-6">
          <h3 className="text-foreground mb-4 flex items-center text-xl font-bold">
            <Users className="text-primary mr-2 h-5 w-5" />
            Vos artistes favoris
          </h3>
          <div className="space-y-3">
            {topArtists.map((artist, index) => (
              <div key={artist.id} className="flex items-center space-x-3">
                <span className="text-primary w-6 text-sm font-bold">
                  {index + 1}
                </span>
                {artist.images[0] && (
                  <Image
                    src={artist.images[0].url}
                    alt={artist.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate font-medium">
                    {artist.name}
                  </p>
                  <p className="text-muted-foreground truncate text-sm">
                    {artist.genres.slice(0, 2).join(', ')}
                  </p>
                  <div className="text-muted-foreground flex items-center text-xs">
                    <Users className="mr-1 h-3 w-3" />
                    {artist.followers.total.toLocaleString()} followers
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Button
        onClick={fetchSpotifyData}
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full"
      >
        <Clock className="mr-2 h-4 w-4" />
        Actualiser les données
      </Button>
    </div>
  )
}
