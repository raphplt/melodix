// Export all Spotify-related components
export { default as SpotifyProfile } from '../SpotifyProfile'
export { default as SpotifySettings } from '../SpotifySettings'
export { default as UserProfile } from '../UserProfile'
export { default as TopTracks } from '../TopTracks'
export { default as TopArtists } from '../TopArtists'
export { default as SpotifyStats } from '../SpotifyStats'
export { default as SpotifyConnectionStatus } from '../SpotifyConnectionStatus'

// Export example components
export { default as ExampleSpotifyComponent } from '../examples/ExampleSpotifyComponent'

// Export the custom hook and context
export { useSpotifyData } from '@/hooks/useSpotifyData'
export { useSpotifyAuth, SpotifyAuthProvider } from '@/contexts/AuthContext'
