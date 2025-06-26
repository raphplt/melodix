'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useSpotifyAuth } from '@/contexts/SpotifyAuthProvider'
import { Music, Headphones, TrendingUp } from 'lucide-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const { signIn, isAuthenticated, isLoading } = useSpotifyAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile')
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="from-primary via-secondary to-accent flex min-h-screen items-center justify-center bg-gradient-to-br">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-b-2 border-white"></div>
          <p className="text-primary-foreground text-lg">
            Vérification de l&apos;authentification...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo et titre */}
          <div className="text-center">
            <Link href="/" className="inline-block">
              <h1 className="gradient-text-emerald mb-2 text-4xl font-bold">
                Melodix
              </h1>
            </Link>
            <p className="text-primary-foreground/80 text-lg">
              Connectez-vous à votre univers musical
            </p>
          </div>

          {/* Card de connexion */}
          <Card className="bg-secondary border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-foreground text-2xl">
                Connexion Spotify
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Accédez à vos statistiques musicales et découvrez votre profil
                musical
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-4">
                <div className="text-muted-foreground flex items-center space-x-3 text-sm">
                  <Music className="text-primary h-5 w-5" />
                  <span>Vos artistes et morceaux préférés</span>
                </div>
                <div className="text-muted-foreground flex items-center space-x-3 text-sm">
                  <Headphones className="text-primary h-5 w-5" />
                  <span>Historique d&apos;écoute personnalisé</span>
                </div>
                <div className="text-muted-foreground flex items-center space-x-3 text-sm">
                  <TrendingUp className="text-primary h-5 w-5" />
                  <span>Statistiques détaillées</span>
                </div>
              </div>
              {/* Bouton de connexion */}
              <Button
                onClick={signIn}
                className="btn-spotify w-full border-0 py-3 font-semibold text-white shadow-lg"
                size="lg"
              >
                <svg
                  className="mr-3 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.599-.781 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.183 1.022zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.32 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.301.421-1.02.599-1.56.3z" />
                </svg>
                Se connecter avec Spotify
              </Button>
              {/* Info sécurité */}
              <div className="text-center">
                <p className="text-muted-foreground text-xs">
                  Nous ne stockons aucune information personnelle.
                  <br />
                  Votre connexion est sécurisée par Spotify.
                </p>
              </div>
              {/* Lien inscription */}
              <div className="text-center">
                <p className="text-muted-foreground text-sm">
                  Nouveau sur Melodix ?{' '}
                  <Link
                    href="/auth/register"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Créer un compte
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Lien retour */}
          <div className="text-center">
            <Link
              href="/"
              className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
