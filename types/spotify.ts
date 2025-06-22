declare module 'next-auth' {
  interface Session {
    accessToken?: string
    error?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    username?: string
    accessTokenExpires?: number
    error?: string
  }
}

export interface SpotifyUser {
  id: string
  display_name: string
  email: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  followers: {
    total: number
  }
  country: string
  product: string
}

export interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{
    id: string
    name: string
  }>
  album: {
    id: string
    name: string
    images: Array<{
      url: string
      height: number
      width: number
    }>
  }
  duration_ms: number
  preview_url: string | null
}

export interface SpotifyPlaylist {
  id: string
  name: string
  description: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  tracks: {
    total: number
  }
  public: boolean
}

export interface SpotifyTopArtist {
  id: string
  name: string
  genres: string[]
  images: Array<{
    url: string
    height: number
    width: number
  }>
  followers: {
    total: number
  }
  popularity: number
}
