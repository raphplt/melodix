'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlertCircle, Home } from 'lucide-react'

const errorMessages: Record<string, string> = {
  Configuration: 'Il y a un problème avec la configuration du serveur.',
  AccessDenied: 'Vous avez refusé l&apos;accès à votre compte.',
  Verification: 'Le token a expiré ou a déjà été utilisé.',
  Default: 'Une erreur inattendue s&apos;est produite.',
  OAuthCallback:
    'Erreur lors de la connexion avec Spotify. Veuillez réessayer.',
}

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessage =
    error && errorMessages[error] ? errorMessages[error] : errorMessages.Default

  return (
    <div className="from-primary via-secondary to-accent flex min-h-screen items-center justify-center bg-gradient-to-br">
      <div className="glass mx-4 w-full max-w-md rounded-2xl p-8 text-center">
        <div className="mb-6">
          <AlertCircle className="text-destructive mx-auto mb-4 h-16 w-16" />
          <h1 className="gradient-text-emerald mb-2 text-2xl font-bold">
            Erreur de connexion
          </h1>
          <p className="text-muted-foreground">{errorMessage}</p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/auth/signin">Réessayer la connexion</Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/" className="inline-flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Retour à l&apos;accueil
            </Link>
          </Button>
        </div>

        {error === 'OAuthCallback' && (
          <div className="bg-muted/20 mt-6 rounded-lg p-4">
            <p className="text-muted-foreground text-sm">
              <strong>Conseil :</strong> Assurez-vous que les cookies sont
              activés et que vous utilisez la bonne URL de redirection.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
