'use client'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import {
  useSession,
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from 'next-auth/react'
import { Session } from 'next-auth'
import { SpotifyUser } from '@/types/spotify'

// Types pour le contexte
interface SpotifyAuthContextType {
  isAuthenticated: boolean
  isLoading: boolean

  user: SpotifyUser | null
  session: Session | null

  signIn: () => void
  signOut: () => void

  hasSpotifyAccess: boolean
  spotifyError: string | null
}

const SpotifyAuthContext = createContext<SpotifyAuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  session: null,
  signIn: () => {},
  signOut: () => {},
  hasSpotifyAccess: false,
  spotifyError: null,
})

export const useSpotifyAuth = () => {
  const context = useContext(SpotifyAuthContext)
  if (!context) {
    throw new Error('useSpotifyAuth must be used within a SpotifyAuthProvider')
  }
  return context
}

function SpotifyAuthProviderInner({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<SpotifyUser | null>(null)
  const [spotifyError, setSpotifyError] = useState<string | null>(null)
  useEffect(() => {
    console.log('Session status:', status)
    console.log('Session data:', session)
  }, [status, session])

  const isAuthenticated = status === 'authenticated' && !!session
  const isLoading = status === 'loading'
  const hasSpotifyAccess =
    isAuthenticated && !!session?.accessToken && !session?.error

  useEffect(() => {
    if (isAuthenticated) {
      const cachedData = localStorage.getItem('spotify-data-cache')
      if (cachedData) {
        try {
          const cache = JSON.parse(cachedData)
          if (cache.userData) {
            setUser(cache.userData)
          }
        } catch (error) {
          console.error('Error loading cached user data:', error)
        }
      }

      if (session?.error) {
        setSpotifyError(session.error)
      } else {
        setSpotifyError(null)
      }
    } else {
      setUser(null)
      setSpotifyError(null)
    }
  }, [isAuthenticated, session])

  const signIn = () => {
    nextAuthSignIn('spotify', { callbackUrl: '/profile' })
  }

  const signOut = () => {
    localStorage.removeItem('spotify-data-cache')
    setUser(null)
    setSpotifyError(null)

    nextAuthSignOut()
  }

  const contextValue: SpotifyAuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    session,
    signIn,
    signOut,
    hasSpotifyAccess,
    spotifyError,
  }

  return (
    <SpotifyAuthContext.Provider value={contextValue}>
      {children}
    </SpotifyAuthContext.Provider>
  )
}

export function SpotifyAuthProvider({ children }: { children: ReactNode }) {
  return <SpotifyAuthProviderInner>{children}</SpotifyAuthProviderInner>
}

export const useUpdateSpotifyUser = () => {
  const [, setUser] = useState<SpotifyUser | null>(null)

  return (userData: SpotifyUser | null) => {
    setUser(userData)
  }
}
