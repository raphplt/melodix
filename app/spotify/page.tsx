'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SpotifyPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirection automatique vers la page profile
    router.push('/profile')
  }, [router])

  return (
    <div className="from-primary via-secondary to-accent flex min-h-screen items-center justify-center bg-gradient-to-br">
      <div className="text-center">
        <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-white"></div>
        <p className="text-primary-foreground text-lg">
          Redirection vers votre profil...
        </p>
      </div>
    </div>
  )
}
