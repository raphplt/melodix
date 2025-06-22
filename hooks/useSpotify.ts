'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { SpotifyService } from '@/lib/spotify'

export function useSpotify() {
  const { data: session } = useSession()
  const [spotifyService, setSpotifyService] = useState<SpotifyService | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session?.accessToken) {
      setSpotifyService(new SpotifyService(session.accessToken))
    } else {
      setSpotifyService(null)
    }
  }, [session?.accessToken])

  const executeSpotifyCall = async <T>(
    apiCall: (service: SpotifyService) => Promise<T>
  ): Promise<T | null> => {
    if (!spotifyService) {
      setError('Service Spotify non disponible')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await apiCall(spotifyService)
      return result
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erreur inconnue'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    spotifyService,
    isLoading,
    error,
    executeSpotifyCall,
    isConnected: !!session?.accessToken,
  }
}
