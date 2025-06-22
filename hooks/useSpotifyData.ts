'use client'
import { useState, useCallback, useEffect } from 'react'
import { useSpotify } from '@/hooks/useSpotify'
import {
  SpotifyUser,
  SpotifyTrack,
  SpotifyTopArtist,
  SpotifyFetchParams,
  SpotifyDataCache,
} from '@/types/spotify'

const CACHE_KEY = 'spotify-data-cache'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes en millisecondes

const defaultParams: SpotifyFetchParams = {
  timeRange: 'medium_term',
  limit: 10,
}

export function useSpotifyData() {
  const { executeSpotifyCall, isLoading: spotifyLoading, error } = useSpotify()
  const [userData, setUserData] = useState<SpotifyUser | null>(null)
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([])
  const [topArtists, setTopArtists] = useState<SpotifyTopArtist[]>([])
  const [params, setParams] = useState<SpotifyFetchParams>(defaultParams)
  const [lastFetched, setLastFetched] = useState<string | null>(null)

  // Charger les données du cache au montage
  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY)
    if (cachedData) {
      try {
        const cache: SpotifyDataCache = JSON.parse(cachedData)
        const cacheAge = Date.now() - new Date(cache.lastFetched).getTime()

        if (cacheAge < CACHE_DURATION) {
          setUserData(cache.userData)
          setTopTracks(cache.topTracks)
          setTopArtists(cache.topArtists)
          setParams(cache.params)
          setLastFetched(cache.lastFetched)
        }
      } catch (error) {
        console.error('Error loading cached data:', error)
        localStorage.removeItem(CACHE_KEY)
      }
    }
  }, [])

  // Sauvegarder les données dans le cache
  const saveToCache = useCallback(
    (
      userData: SpotifyUser | null,
      topTracks: SpotifyTrack[],
      topArtists: SpotifyTopArtist[],
      params: SpotifyFetchParams
    ) => {
      const cache: SpotifyDataCache = {
        userData,
        topTracks,
        topArtists,
        lastFetched: new Date().toISOString(),
        params,
      }

      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
        setLastFetched(cache.lastFetched)
      } catch (error) {
        console.error('Error saving to cache:', error)
      }
    },
    []
  )

  const fetchSpotifyData = useCallback(
    async (newParams?: SpotifyFetchParams) => {
      const fetchParams = newParams || params

      const spotifyData = await executeSpotifyCall(async (spotify) => {
        const [user, tracks, artists] = await Promise.all([
          spotify.getCurrentUser(),
          spotify.getTopTracks(fetchParams.timeRange, fetchParams.limit),
          spotify.getTopArtists(fetchParams.timeRange, fetchParams.limit),
        ])
        return { user, tracks, artists }
      })

      if (spotifyData) {
        setUserData(spotifyData.user)
        setTopTracks(spotifyData.tracks.items)
        setTopArtists(spotifyData.artists.items)
        setParams(fetchParams)

        // Sauvegarder dans le cache
        saveToCache(
          spotifyData.user,
          spotifyData.tracks.items,
          spotifyData.artists.items,
          fetchParams
        )
      }
    },
    [executeSpotifyCall, params, saveToCache]
  )

  const updateParams = useCallback((newParams: SpotifyFetchParams) => {
    setParams(newParams)
  }, [])

  const clearCache = useCallback(() => {
    localStorage.removeItem(CACHE_KEY)
    setUserData(null)
    setTopTracks([])
    setTopArtists([])
    setLastFetched(null)
  }, [])

  const isCacheValid = useCallback(() => {
    if (!lastFetched) return false
    const cacheAge = Date.now() - new Date(lastFetched).getTime()
    return cacheAge < CACHE_DURATION
  }, [lastFetched])

  return {
    userData,
    topTracks,
    topArtists,
    params,
    lastFetched,
    isLoading: spotifyLoading,
    error,
    fetchSpotifyData,
    updateParams,
    clearCache,
    isCacheValid,
  }
}
