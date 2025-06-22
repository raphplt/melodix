'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, CheckCircle, AlertCircle, Music } from 'lucide-react'
import Link from 'next/link'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setStatus('error')
      setMessage('Veuillez saisir votre adresse e-mail.')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setMessage('Veuillez saisir une adresse e-mail valide.')
      return
    }

    setStatus('loading')

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
      setMessage('Merci ! Vous serez notifié lors du lancement.')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage("Une erreur s'est produite. Veuillez réessayer.")
    }
  }
  return (
    <section id="newsletter" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="bg-card/10 border-border/20 relative overflow-hidden shadow-2xl backdrop-blur-lg">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="bg-primary/10 absolute top-0 right-0 h-32 w-32 rounded-full blur-2xl"></div>
            <div className="bg-secondary/10 absolute bottom-0 left-0 h-32 w-32 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10">
            <CardHeader className="pb-8 text-center">
              <div className="from-primary/20 to-secondary/20 border-primary/30 mx-auto mb-6 w-fit rounded-full border bg-gradient-to-br p-4">
                <Mail className="text-primary h-8 w-8" />
              </div>
              <CardTitle className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
                Accès anticipé gratuit
              </CardTitle>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                Soyez les premiers informés du lancement de Melodix. Rejoignez
                notre liste d&apos;attente exclusive et obtenez un accès
                prioritaire aux fonctionnalités bêta, aux tarifs spéciaux et aux
                défis musicaux.
              </p>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="mx-auto max-w-md">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Entrez votre adresse e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`bg-card/20 border-border/30 placeholder:text-muted-foreground text-foreground focus:bg-card/30 focus:border-primary h-12 backdrop-blur-sm transition-all duration-300 ${
                        status === 'error'
                          ? 'border-destructive focus:border-destructive'
                          : ''
                      }`}
                      disabled={status === 'loading'}
                      aria-describedby={
                        status === 'error' || status === 'success'
                          ? 'form-message'
                          : undefined
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground h-12 bg-gradient-to-r px-8 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <div className="flex items-center">
                        <div className="border-primary-foreground mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                        Inscription...
                      </div>
                    ) : (
                      'Rejoindre la liste'
                    )}
                  </Button>
                </div>

                {/* Status Message */}
                {(status === 'success' || status === 'error') && (
                  <div
                    id="form-message"
                    className={`mt-4 flex items-center rounded-lg p-4 ${
                      status === 'success'
                        ? 'bg-chart-1/20 border-chart-1/30 text-chart-1 border backdrop-blur-sm'
                        : 'bg-destructive/20 border-destructive/30 text-destructive border backdrop-blur-sm'
                    }`}
                    role="alert"
                  >
                    {status === 'success' ? (
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">{message}</span>
                  </div>
                )}
              </form>

              {/* Spotify CTA */}
              <div className="mt-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-muted-foreground text-sm">
                    Ou connectez votre compte Spotify dès maintenant
                  </p>
                  <Button
                    variant="outline"
                    className="border-border hover:bg-accent hover:border-border/60"
                    asChild
                  >
                    <Link href="/spotify" className="inline-flex items-center">
                      <Music className="mr-2 h-4 w-4" />
                      Connecter Spotify
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4 text-sm">
                  Rejoignez 10 000+ passionnés de musique déjà sur la liste
                  d&apos;attente
                </p>
                <div className="text-muted-foreground flex justify-center space-x-6 text-xs">
                  <span>✓ Aucun spam, jamais</span>
                  <span>✓ Désabonnement à tout moment</span>
                  <span>✓ Avantages d&apos;accès anticipé</span>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  )
}
