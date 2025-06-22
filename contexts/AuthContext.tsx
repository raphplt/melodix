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
  SessionProvider,
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from 'next-auth/react'
import { Session } from 'next-auth'
import { SpotifyUser } from '@/types/spotify'

// Types pour le contexte
interface SpotifyAuthContextType {
  // État de la session
  isAuthenticated: boolean
  isLoading: boolean

  // Données utilisateur
  user: SpotifyUser | null
  session: Session | null

  // Méthodes d'authentification
  signIn: () => void
  signOut: () => void

  // État de connexion Spotify
  hasSpotifyAccess: boolean
  spotifyError: string | null
}

// Contexte avec valeurs par défaut
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

// Hook pour utiliser le contexte
export const useSpotifyAuth = () => {
  const context = useContext(SpotifyAuthContext)
  if (!context) {
    throw new Error('useSpotifyAuth must be used within a SpotifyAuthProvider')
  }
  return context
}

// Provider interne qui utilise NextAuth
function SpotifyAuthProviderInner({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState<SpotifyUser | null>(null)
  const [spotifyError, setSpotifyError] = useState<string | null>(null)

  // Vérifier l'état de l'authentification
  const isAuthenticated = !!session?.accessToken && status === 'authenticated'
  const isLoading = status === 'loading'
  const hasSpotifyAccess = !!session?.accessToken && !session?.error

  // Charger les données utilisateur depuis le cache si disponible
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

      // Gérer les erreurs de session
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
  // Méthodes d'authentification
  const signIn = () => {
    nextAuthSignIn('spotify')
  }

  const signOut = () => {
    // Nettoyer le cache local
    localStorage.removeItem('spotify-data-cache')
    setUser(null)
    setSpotifyError(null)

    // Déconnexion NextAuth
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

// Provider principal qui englobe SessionProvider
export function SpotifyAuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SpotifyAuthProviderInner>{children}</SpotifyAuthProviderInner>
    </SessionProvider>
  )
}

// Hook pour mettre à jour les données utilisateur (utilisé par les composants)
export const useUpdateSpotifyUser = () => {
  const [, setUser] = useState<SpotifyUser | null>(null)

  return (userData: SpotifyUser | null) => {
    setUser(userData)
  }
}
