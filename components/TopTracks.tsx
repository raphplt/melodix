'use client'
import { Card } from '@/components/ui/card'
import { Play } from 'lucide-react'
import { SpotifyTrack } from '@/types/spotify'
import Image from 'next/image'

interface TopTracksProps {
  tracks: SpotifyTrack[]
  isLoading: boolean
}

export default function TopTracks({ tracks, isLoading }: TopTracksProps) {
  if (isLoading) {
    return (
      <Card className="border-border bg-card/50 p-6">
        <h3 className="text-foreground mb-4 flex items-center text-xl font-bold">
          <Play className="text-primary mr-2 h-5 w-5" />
          Vos morceaux favoris
        </h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse items-center space-x-3"
            >
              <div className="text-primary h-6 w-6 rounded bg-gray-300"></div>
              <div className="h-12 w-12 rounded bg-gray-300"></div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-300"></div>
                <div className="h-3 w-1/2 rounded bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card/50 p-6">
      <h3 className="text-foreground mb-4 flex items-center text-xl font-bold">
        <Play className="text-primary mr-2 h-5 w-5" />
        Vos morceaux favoris
      </h3>
      <div className="space-y-3">
        {tracks.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            Aucun morceau trouvé pour cette période
          </p>
        ) : (
          tracks.map((track, index) => (
            <div
              key={track.id}
              className="hover:bg-muted/50 flex items-center space-x-3 rounded-lg p-2 transition-colors"
            >
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
                <p className="text-muted-foreground truncate text-xs">
                  {track.album.name}
                </p>
              </div>
              <div className="text-muted-foreground text-xs">
                {Math.floor(track.duration_ms / 60000)}:
                {String(
                  Math.floor((track.duration_ms % 60000) / 1000)
                ).padStart(2, '0')}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
