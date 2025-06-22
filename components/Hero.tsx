import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Music, Headphones, Star } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Premium background with emerald theme */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="gradient-emerald float-animation absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-30 blur-3xl"></div>
        <div
          className="gradient-emerald-subtle float-animation absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-40 blur-3xl"
          style={{ animationDelay: '1s' }}
        ></div>
        <div className="bg-primary/10 pulse-glow absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full blur-3xl"></div>
        {/* Premium grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Card className="glass card-hover border-primary/20 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            {/* Premium Badge */}
            <div className="border-primary/30 from-primary/20 to-accent/20 mb-8 inline-flex items-center rounded-full border bg-gradient-to-r px-6 py-3 backdrop-blur-md">
              <Star className="text-primary glow-pulse mr-2 h-4 w-4" />
              <span className="text-foreground/90 text-sm font-medium">
                Bientôt disponible - Accès anticipé disponible
              </span>
            </div>
            {/* Premium Main Heading */}
            <h1 className="text-foreground mb-6 text-4xl leading-tight font-bold text-balance md:text-6xl lg:text-7xl">
              Défiez votre oreille.{' '}
              <span className="gradient-text-emerald">
                Découvrez de nouvelles musiques.
              </span>
            </h1>{' '}
            {/* Premium Subheading */}
            <p className="text-muted-foreground mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-balance md:text-2xl">
              Entraînez votre oreille musicale avec des défis interactifs,
              découvrez des pépites cachées, et affrontez vos amis sur la
              plateforme ultime de découverte musicale.
            </p>
            {/* Premium CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="btn-spotify px-8 py-4 text-lg font-semibold shadow-xl"
              >
                Accès anticipé gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>{' '}
              <Button
                variant="outline"
                size="lg"
                className="glass border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 border-2 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/spotify" className="inline-flex items-center">
                  <Music className="mr-2 h-5 w-5" />
                  Connecter Spotify
                </Link>
              </Button>
            </div>
            {/* Premium Feature highlights */}
            <div className="border-primary/20 mt-12 flex flex-wrap items-center justify-center gap-8 border-t pt-8">
              <div className="text-muted-foreground hover:text-primary flex items-center transition-all duration-300 hover:scale-105">
                <Headphones className="text-primary glow-pulse mr-2 h-5 w-5" />
                <span className="text-sm font-medium">
                  Entraînement auditif
                </span>
              </div>
              <div className="text-muted-foreground hover:text-primary flex items-center transition-all duration-300 hover:scale-105">
                <Music
                  className="text-accent glow-pulse mr-2 h-5 w-5"
                  style={{ animationDelay: '1s' }}
                />
                <span className="text-sm font-medium">Découverte musicale</span>
              </div>
              <div className="text-muted-foreground hover:text-primary flex items-center transition-all duration-300 hover:scale-105">
                <Star
                  className="text-primary glow-pulse mr-2 h-5 w-5"
                  style={{ animationDelay: '2s' }}
                />
                <span className="text-sm font-medium">Défis sociaux</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
