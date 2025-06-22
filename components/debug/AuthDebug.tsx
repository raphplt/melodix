'use client'
import { useSession } from 'next-auth/react'
import { useSpotifyAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/card'

export default function AuthDebug() {
  const { data: session, status } = useSession()
  const { isAuthenticated, isLoading, user, hasSpotifyAccess, spotifyError } =
    useSpotifyAuth()

  return (
    <Card className="m-4 border-yellow-200 bg-yellow-50 p-4">
      <h3 className="mb-2 font-bold text-yellow-800">Debug Auth</h3>
      <div className="space-y-1 text-sm">
        <p>
          <strong>NextAuth Status:</strong> {status}
        </p>
        <p>
          <strong>NextAuth Session:</strong> {session ? 'Exists' : 'None'}
        </p>
        <p>
          <strong>Access Token:</strong>{' '}
          {session?.accessToken ? 'Present' : 'Missing'}
        </p>
        <p>
          <strong>Session Error:</strong> {session?.error || 'None'}
        </p>
        <hr className="my-2" />
        <p>
          <strong>Context isLoading:</strong> {isLoading.toString()}
        </p>
        <p>
          <strong>Context isAuthenticated:</strong> {isAuthenticated.toString()}
        </p>
        <p>
          <strong>Context hasSpotifyAccess:</strong>{' '}
          {hasSpotifyAccess.toString()}
        </p>
        <p>
          <strong>Context User:</strong> {user?.display_name || 'None'}
        </p>
        <p>
          <strong>Context Error:</strong> {spotifyError || 'None'}
        </p>
      </div>
    </Card>
  )
}
