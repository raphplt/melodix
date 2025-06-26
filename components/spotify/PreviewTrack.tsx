'use client'
import { useSpotifyData } from '@/hooks/useSpotifyData'
import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const PreviewTrack = () => {
  const { topTracks } = useSpotifyData()
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Logs de debug (seulement une fois quand les tracks changent)
  useEffect(() => {
    if (topTracks.length > 0) {
      console.log('=== SPOTIFY DATA DEBUG ===')
      console.log('Nombre de tracks:', topTracks.length)
      console.log('Premier track:', topTracks[0])
      console.log(
        'Preview URLs disponibles:',
        topTracks.filter((track) => track.preview_url).length,
        '/',
        topTracks.length
      )

      const trackWithPreview = topTracks.find((track) => track.preview_url)
      const trackWithoutPreview = topTracks.find((track) => !track.preview_url)

      if (trackWithPreview) {
        console.log(
          '✅ Exemple de track avec preview:',
          trackWithPreview.name,
          '- URL:',
          trackWithPreview.preview_url
        )
      }
      if (trackWithoutPreview) {
        console.log(
          '❌ Exemple de track sans preview:',
          trackWithoutPreview.name,
          '- URL:',
          trackWithoutPreview.preview_url
        )
      }
      console.log('========================')
    }
  }, [topTracks])

  const playPreview = (previewUrl: string, trackId: string) => {
    // Si on clique sur la même track qui joue déjà, on pause
    if (currentlyPlaying === trackId && isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
      return
    }

    // Arrêter la lecture précédente si il y en a une
    if (audioRef.current) {
      audioRef.current.pause()
    }

    // Créer un nouvel élément audio
    const audio = new Audio(previewUrl)
    audioRef.current = audio

    // Événements audio
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
      setCurrentlyPlaying(null)
    })

    audio.addEventListener('error', () => {
      setIsPlaying(false)
      setCurrentlyPlaying(null)
      console.error('Erreur lors de la lecture audio')
    })

    // Jouer l'audio
    audio
      .play()
      .then(() => {
        setIsPlaying(true)
        setCurrentlyPlaying(trackId)
      })
      .catch((error) => {
        console.error('Erreur lors de la lecture:', error)
      })
  }

  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    setIsPlaying(false)
    setCurrentlyPlaying(null)
  }

  if (!topTracks || topTracks.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="text-muted-foreground text-lg">Aucune track disponible</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Connectez-vous à Spotify pour voir vos top tracks
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mt-10 mb-6 text-center text-2xl font-bold">
        Preview track
      </h2>

      <div className="flex flex-col items-center">
        <h2 className="mb-4 text-lg font-semibold">
          Top Tracks ({topTracks.filter((track) => track.preview_url).length}/
          {topTracks.length} avec preview)
        </h2>
        <div className="w-full max-w-2xl space-y-4">
          {topTracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between rounded-lg border p-4 shadow-sm"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  {/* Image de l'album */}
                  {track.album.images && track.album.images[0] && (
                    <Image
                      src={track.album.images[0].url}
                      alt={track.album.name}
                      width={48}
                      height={48}
                      className="rounded-md object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-foreground font-medium">
                      {track.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {track.artists.map((artist) => artist.name).join(', ')}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {track.album.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bouton de lecture */}
              <div className="flex items-center space-x-2">
                {track.preview_url ? (
                  <Button
                    onClick={() => playPreview(track.preview_url!, track.id)}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    {currentlyPlaying === track.id && isPlaying ? (
                      <>
                        <Pause className="h-4 w-4" />
                        <span className="hidden sm:inline">Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        <span className="hidden sm:inline">Écouter</span>
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="flex items-center space-x-1 opacity-50"
                  >
                    <VolumeX className="h-4 w-4" />
                    <span className="hidden sm:inline">Indisponible</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bouton pour arrêter toute lecture */}
        {isPlaying && (
          <div className="mt-4">
            <Button
              onClick={stopPreview}
              variant="destructive"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Volume2 className="h-4 w-4" />
              <span>Arrêter la lecture</span>
            </Button>
          </div>
        )}

        {/* Message informatif si aucune preview n'est disponible */}
        {topTracks.length > 0 &&
          topTracks.filter((track) => track.preview_url).length === 0 && (
            <div className="bg-muted mt-6 rounded-lg p-4 text-center">
              <p className="text-muted-foreground text-sm">
                ℹ️ Aucun extrait audio n&apos;est disponible pour vos top tracks
                actuelles.
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Cela peut être dû aux restrictions de droits d&apos;auteur ou de
                région.
              </p>
            </div>
          )}
      </div>
    </div>
  )
}

export default PreviewTrack
