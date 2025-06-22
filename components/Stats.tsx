'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Music, Users, Trophy, TrendingUp, Star, Quote } from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    icon: Users,
    value: '10K+',
    label: 'Utilisateurs en attente',
    description: 'Passionnés de musique',
  },
  {
    icon: Music,
    value: '50K+',
    label: 'Morceaux analysés',
    description: 'Dans notre base de données',
  },
  {
    icon: Trophy,
    value: '500+',
    label: 'Défis créés',
    description: 'Pour tous les niveaux',
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Amélioration moyenne',
    description: "De l'oreille musicale",
  },
]

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Musicienne professionnelle',
    content:
      "Melodix a révolutionné ma façon d'entraîner mon oreille musicale. Les défis sont addictifs et vraiment efficaces !",
    rating: 5,
  },
  {
    name: 'Alexandre Dubois',
    role: 'Amateur de jazz',
    content:
      "Grâce à cette app, j'ai découvert tant de nouveaux artistes. L'intégration Spotify est géniale !",
    rating: 5,
  },
  {
    name: 'Emma Rousseau',
    role: 'Étudiante en musicologie',
    content:
      "L'aspect social rend l'apprentissage musical fun. Je défie mes amis tous les jours !",
    rating: 5,
  },
]

export default function Stats() {
  return (
    <section className="from-primary/5 via-secondary/5 to-accent/5 bg-gradient-to-br px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Stats Section */}
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
            Rejoignez une communauté
            <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
              passionnée
            </span>
          </h2>
          <p className="text-muted-foreground mx-auto mb-12 max-w-3xl text-xl">
            Des milliers de musiciens font déjà confiance à Melodix pour
            développer leurs compétences auditives
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card
                key={index}
                className="bg-card/20 border-border/20 group text-center backdrop-blur-lg transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    <div className="from-primary/20 to-secondary/20 border-primary/30 group-hover:from-primary/30 group-hover:to-secondary/30 rounded-full border bg-gradient-to-br p-3 transition-all duration-300">
                      <IconComponent className="text-primary h-6 w-6" />
                    </div>
                  </div>
                  <div className="text-foreground mb-2 text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-foreground mb-1 text-sm font-semibold">
                    {stat.label}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Testimonials Section */}
        <div className="mb-12 text-center">
          <h3 className="text-foreground mb-4 text-2xl font-bold md:text-3xl">
            Ce que disent nos bêta-testeurs
          </h3>
          <p className="text-muted-foreground">
            Découvrez pourquoi les musiciens adorent Melodix
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card/10 border-border/20 group backdrop-blur-lg transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  <Quote className="text-primary mr-2 h-6 w-6" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-primary h-4 w-4 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <div className="text-foreground font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="from-primary/10 to-secondary/10 border-border/20 inline-block bg-gradient-to-r backdrop-blur-lg">
            <CardContent className="p-8">
              <h3 className="text-foreground mb-4 text-2xl font-bold">
                Prêt à rejoindre l&apos;aventure ?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Connectez votre Spotify et découvrez immédiatement vos
                statistiques musicales, ou rejoignez notre liste d&apos;attente
                pour être notifié du lancement complet.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground bg-gradient-to-r"
                  asChild
                >
                  <Link href="/spotify" className="inline-flex items-center">
                    <Music className="mr-2 h-5 w-5" />
                    Connecter Spotify maintenant
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border hover:bg-accent hover:border-border/60"
                >
                  <a href="#newsletter">Rejoindre la liste d&apos;attente</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
