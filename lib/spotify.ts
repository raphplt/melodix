import {
  SpotifyUser,
  SpotifyTrack,
  SpotifyPlaylist,
  SpotifyTopArtist,
} from '@/types/spotify'

export class SpotifyService {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async makeRequest(endpoint: string) {
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`)
    }

    return response.json()
  }

  async getCurrentUser(): Promise<SpotifyUser> {
    return this.makeRequest('/me')
  }

  async getUserPlaylists(limit = 20): Promise<{ items: SpotifyPlaylist[] }> {
    return this.makeRequest(`/me/playlists?limit=${limit}`)
  }

  async getTopTracks(
    timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
    limit = 20
  ): Promise<{ items: SpotifyTrack[] }> {
    return this.makeRequest(
      `/me/top/tracks?time_range=${timeRange}&limit=${limit}`
    )
  }

  async getTopArtists(
    timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term',
    limit = 20
  ): Promise<{ items: SpotifyTopArtist[] }> {
    return this.makeRequest(
      `/me/top/artists?time_range=${timeRange}&limit=${limit}`
    )
  }

  async getRecentlyPlayed(
    limit = 20
  ): Promise<{ items: Array<{ track: SpotifyTrack; played_at: string }> }> {
    return this.makeRequest(`/me/player/recently-played?limit=${limit}`)
  }

  async getCurrentPlayback(): Promise<{
    is_playing: boolean
    item: SpotifyTrack
    progress_ms: number
    device: {
      name: string
      type: string
      volume_percent: number
    }
  } | null> {
    try {
      return await this.makeRequest('/me/player')
    } catch {
      // Return null if no active playback
      return null
    }
  }
}
