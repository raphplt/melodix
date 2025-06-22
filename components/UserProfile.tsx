'use client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, LogOut } from 'lucide-react'
import { SpotifyUser } from '@/types/spotify'
import { signOut } from 'next-auth/react'
import Image from 'next/image'

interface UserProfileProps {
  userData: SpotifyUser | null
  isLoading: boolean
}

export default function UserProfile({ userData, isLoading }: UserProfileProps) {
  if (isLoading) {
    return (
      <Card className="border-border bg-card/50 p-6">
        <div className="mb-6 flex animate-pulse items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-300"></div>
            <div className="space-y-2">
              <div className="h-6 w-48 rounded bg-gray-300"></div>
              <div className="h-4 w-32 rounded bg-gray-300"></div>
              <div className="h-4 w-24 rounded bg-gray-300"></div>
            </div>
          </div>
          <div className="h-10 w-32 rounded bg-gray-300"></div>
        </div>
      </Card>
    )
  }

  if (!userData) {
    return null
  }

  return (
    <Card className="border-border bg-card/50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {userData.images && userData.images[0] && (
            <Image
              src={userData.images[0].url}
              alt={userData.display_name}
              width={64}
              height={64}
              className="rounded-full"
            />
          )}
          <div>
            <h2 className="text-foreground text-2xl font-bold">
              {userData.display_name}
            </h2>
            <p className="text-muted-foreground">{userData.email}</p>
            <div className="mt-2 flex items-center space-x-4">
              <div className="text-muted-foreground flex items-center">
                <Users className="mr-1 h-4 w-4" />
                <span className="text-sm">
                  {userData.followers.total} followers
                </span>
              </div>
              <span className="rounded-full bg-green-600 px-2 py-1 text-xs text-white">
                {userData.product}
              </span>
              {userData.country && (
                <span className="bg-muted rounded-full px-2 py-1 text-xs">
                  {userData.country}
                </span>
              )}
            </div>
          </div>
        </div>
        <Button
          onClick={() => signOut()}
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </Card>
  )
}
