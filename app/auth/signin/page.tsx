'use client'

import { signIn, getProviders } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Music } from 'lucide-react'

interface Provider {
  id: string
  name: string
}

export default function SignIn() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  )

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])

  if (!providers) {
    return (
      <div className="from-primary via-secondary to-accent flex min-h-screen items-center justify-center bg-gradient-to-br">
        <div className="text-primary-foreground">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="from-primary via-secondary to-accent flex min-h-screen items-center justify-center bg-gradient-to-br">
      <div className="glass mx-4 w-full max-w-md rounded-2xl p-8">
        <div className="mb-8 text-center">
          <h1 className="gradient-text-emerald mb-2 text-3xl font-bold">
            Connexion Melodix
          </h1>
          <p className="text-muted-foreground">
            Connectez-vous avec Spotify pour accéder à vos statistiques
            musicales
          </p>
        </div>

        {Object.values(providers).map((provider: Provider) => (
          <div key={provider.name} className="space-y-4">
            <Button
              onClick={() => signIn(provider.id, { callbackUrl: '/spotify' })}
              className="btn-spotify w-full"
              size="lg"
            >
              <Music className="mr-2 h-5 w-5" />
              Continuer avec {provider.name}
            </Button>
          </div>
        ))}

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            En vous connectant, vous acceptez nos conditions d&apos;utilisation
          </p>
        </div>
      </div>
    </div>
  )
}
