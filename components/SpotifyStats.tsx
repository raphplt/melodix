'use client'
import { Card } from '@/components/ui/card'
import { TrendingUp, Clock, Music, Users } from 'lucide-react'
import { SpotifyUser, SpotifyTrack, SpotifyTopArtist } from '@/types/spotify'

interface SpotifyStatsProps {
  userData: SpotifyUser | null
  topTracks: SpotifyTrack[]
  topArtists: SpotifyTopArtist[]
  isLoading: boolean
}

export default function SpotifyStats({
  userData,
  topTracks,
  topArtists,
  isLoading,
}: SpotifyStatsProps) {
  if (isLoading) {
    return (
      <Card className="border-border bg-card/50 p-6">
        <h3 className="text-foreground mb-4 flex items-center text-xl font-bold">
          <TrendingUp className="text-primary mr-2 h-5 w-5" />
          Statistiques
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse text-center">
              <div className="text-primary mx-auto mb-2 h-8 w-8 rounded-full bg-gray-300"></div>
              <div className="mb-1 h-6 rounded bg-gray-300"></div>
              <div className="h-4 rounded bg-gray-300"></div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  const totalDuration = topTracks.reduce(
    (acc, track) => acc + track.duration_ms,
    0
  )
  const averageDuration = totalDuration / topTracks.length || 0
  const totalFollowers = userData?.followers.total || 0
  const averagePopularity =
    topArtists.reduce((acc, artist) => acc + artist.popularity, 0) /
      topArtists.length || 0

  const stats = [
    {
      icon: Music,
      value: topTracks.length.toString(),
      label: 'Morceaux favoris',
    },
    {
      icon: Users,
      value: topArtists.length.toString(),
      label: 'Artistes favoris',
    },
    {
      icon: Clock,
      value: `${Math.floor(averageDuration / 60000)}:${String(Math.floor((averageDuration % 60000) / 1000)).padStart(2, '0')}`,
      label: 'Durée moyenne',
    },
    {
      icon: TrendingUp,
      value: `${Math.round(averagePopularity)}%`,
      label: 'Popularité moy.',
    },
  ]

  return (
    <Card className="border-border bg-card/50 p-6">
      <h3 className="text-foreground mb-4 flex items-center text-xl font-bold">
        <TrendingUp className="text-primary mr-2 h-5 w-5" />
        Statistiques
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <stat.icon className="text-primary mx-auto mb-2 h-8 w-8" />
            <div className="text-foreground text-2xl font-bold">
              {stat.value}
            </div>
            <div className="text-muted-foreground text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {userData && (
        <div className="border-border mt-4 border-t pt-4">
          <div className="text-center">
            <div className="text-foreground text-lg font-semibold">
              {totalFollowers.toLocaleString()} followers
            </div>
            <div className="text-muted-foreground text-sm">
              Compte {userData.product}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
