import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Headphones,
  Music,
  Users,
  Trophy,
  Brain,
  Zap,
  Target,
  Gamepad2,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Headphones,
    title: 'Entraînement auditif',
    description:
      "Développez votre oreille musicale avec des exercices scientifiquement conçus qui améliorent la reconnaissance des hauteurs, la détection du rythme et les compétences d'analyse audio.",
  },
  {
    icon: Music,
    title: 'Découverte musicale',
    description:
      'Explorez de nouveaux genres, artistes et morceaux grâce à des défis personnalisés qui élargissent vos horizons musicaux et vous font découvrir des pépites cachées.',
  },
  {
    icon: Users,
    title: 'Défis sociaux',
    description:
      'Affrontez vos amis et la communauté mondiale dans des défis musicaux en temps réel, des classements et des playlists collaboratives.',
  },
  {
    icon: Brain,
    title: 'Apprentissage adaptatif',
    description:
      "Notre système alimenté par l'IA ajuste la difficulté en fonction de votre progression, garantissant un rythme d'apprentissage optimal et des défis personnalisés.",
  },
  {
    icon: Trophy,
    title: 'Système de récompenses',
    description:
      "Débloquez des badges, gagnez des points et suivez votre parcours musical avec un suivi complet des progrès et des récompenses d'étapes.",
  },
  {
    icon: Zap,
    title: 'Retour en temps réel',
    description:
      "Obtenez un retour instantané sur vos performances avec des analyses détaillées et des suggestions d'amélioration pour chaque défi.",
  },
  {
    icon: Target,
    title: 'Entraînement de précision',
    description:
      "Concentrez-vous sur des compétences musicales spécifiques avec des exercices ciblés pour la reconnaissance d'intervalles, l'identification d'accords et la classification de genres.",
  },
  {
    icon: Gamepad2,
    title: 'Expérience gamifiée',
    description:
      'Apprenez en jouant avec des mécaniques de jeu engageantes, des séries, des défis quotidiens et des puzzles musicaux interactifs.',
  },
  {
    icon: TrendingUp,
    title: 'Analyses de progression',
    description:
      'Visualisez votre amélioration au fil du temps avec des statistiques détaillées, des graphiques de performance et un suivi du développement des compétences.',
  },
]

export default function Features() {
  return (
    <section id="features" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            Des fonctionnalités puissantes pour{' '}
            <span className="from-primary to-secondary-foreground bg-gradient-to-r bg-clip-text text-transparent">
              votre croissance musicale
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-xl">
            Découvrez une suite complète d&apos;outils conçus pour améliorer vos
            capacités musicales et vous connecter avec une communauté dynamique
            de passionnés de musique.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={index}
                className="bg-card/10 border-border/20 hover:bg-card/15 group backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="from-primary/20 to-secondary/20 border-primary/30 group-hover:from-primary/30 group-hover:to-secondary/30 rounded-lg border bg-gradient-to-br p-3 transition-all duration-300">
                      <IconComponent className="text-primary h-6 w-6" />
                    </div>
                    <CardTitle className="text-foreground text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="from-primary/10 to-secondary/10 border-border/20 inline-block bg-gradient-to-r backdrop-blur-lg">
            <CardContent className="p-8">
              <h3 className="text-foreground mb-4 text-2xl font-bold">
                Prêt à commencer votre voyage musical ?
              </h3>
              <p className="text-muted-foreground mb-6">
                Rejoignez des milliers de passionnés de musique qui améliorent
                déjà leurs compétences.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  className="from-primary to-secondary-foreground hover:from-primary/90 hover:to-secondary/90 text-primary-foreground bg-gradient-to-r"
                >
                  <Link href="/spotify" className="inline-flex items-center">
                    <Music className="mr-2 h-4 w-4" />
                    Connecter Spotify
                  </Link>
                </Button>
              </div>
              <div className="mt-4 flex flex-col justify-center gap-4 sm:flex-row">
                <span className="bg-chart-1/20 text-chart-1 border-chart-1/30 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
                  <span className="bg-chart-1 mr-2 h-2 w-2 rounded-full"></span>
                  Gratuit pendant la bêta
                </span>
                <span className="bg-chart-2/20 text-chart-2 border-chart-2/30 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
                  <span className="bg-chart-2 mr-2 h-2 w-2 rounded-full"></span>
                  Aucune carte bancaire requise
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
