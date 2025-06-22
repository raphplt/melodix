'use client'
import { Card } from '@/components/ui/card'
import { Users } from 'lucide-react'
import { SpotifyTopArtist } from '@/types/spotify'
import Image from 'next/image'

interface TopArtistsProps {
  artists: SpotifyTopArtist[]
  isLoading: boolean
}

export default function TopArtists({ artists, isLoading }: TopArtistsProps) {
  if (isLoading) {
    return (
      <Card className="border-border bg-card/50 p-6">
        <h3 className="text-foreground mb-4 flex items-center text-xl font-bold">
          <Users className="text-primary mr-2 h-5 w-5" />
          Vos artistes favoris
        </h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse items-center space-x-3"
            >
              <div className="text-primary h-6 w-6 rounded bg-gray-300"></div>
              <div className="h-12 w-12 rounded-full bg-gray-300"></div>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-300"></div>
                <div className="h-3 w-1/2 rounded bg-gray-300"></div>
                <div className="h-3 w-1/3 rounded bg-gray-300"></div>
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
        <Users className="text-primary mr-2 h-5 w-5" />
        Vos artistes favoris
      </h3>
      <div className="space-y-3">
        {artists.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">
            Aucun artiste trouvé pour cette période
          </p>
        ) : (
          artists.map((artist, index) => (
            <div
              key={artist.id}
              className="hover:bg-muted/50 flex items-center space-x-3 rounded-lg p-2 transition-colors"
            >
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
              <div className="text-center">
                <div className="text-primary text-sm font-semibold">
                  {artist.popularity}%
                </div>
                <div className="text-muted-foreground text-xs">popularité</div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
