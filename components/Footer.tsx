import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Music, 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  MapPin,
  Phone
} from 'lucide-react'

const footerLinks = {
  product: [
    { name: 'Fonctionnalités', href: '#features' },
    { name: 'Statistiques', href: '#stats' },
    { name: 'Défis Musicaux', href: '#challenges' },
    { name: 'Classements', href: '#leaderboard' },
    { name: 'Intégration Spotify', href: '/spotify' },
  ],
  company: [
    { name: 'À Propos', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Carrières', href: '/careers' },
    { name: 'Kit Presse', href: '/press' },
  ],
  support: [
    { name: "Centre d'Aide", href: '/help' },
    { name: 'Contact', href: '/contact' },
    { name: 'Politique de Confidentialité', href: '/privacy' },
    { name: "Conditions d'Utilisation", href: '/terms' },
  ],
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/melodix' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/melodix' },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/company/melodix',
  },
  { name: 'GitHub', icon: Github, href: 'https://github.com/melodix' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="glass border-primary/20 relative overflow-hidden border-t">
      {/* Premium Gradient Background */}
      <div className="gradient-emerald-subtle pointer-events-none absolute inset-0 opacity-30"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.1),transparent_50%)]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Premium Brand Section */}
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="mb-6 flex items-center space-x-2 transition-all duration-300 hover:scale-105"
              >
                <Music className="text-primary glow-pulse h-8 w-8" />
                <span className="gradient-text-emerald text-2xl font-bold">
                  Melodix
                </span>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md text-balance">
                Défiez vos oreilles, découvrez de nouvelles musiques et
                connectez-vous avec une communauté mondiale de passionnés de
                musique. Entraînez vos capacités musicales avec des défis
                interactifs et des retours alimentés par l&apos;IA.
              </p>
              <div className="space-y-3">
                <div className="text-muted-foreground hover:text-primary flex items-center transition-all duration-300">
                  <Mail className="text-primary mr-3 h-4 w-4" />
                  <span className="text-sm">hello@melodix.com</span>
                </div>
                <div className="text-muted-foreground hover:text-primary flex items-center transition-all duration-300">
                  <Phone className="text-primary mr-3 h-4 w-4" />
                  <span className="text-sm">+33 1 23 45 67 89</span>
                </div>
                <div className="text-muted-foreground hover:text-primary flex items-center transition-all duration-300">
                  <MapPin className="text-primary mr-3 h-4 w-4" />
                  <span className="text-sm">Paris, France</span>
                </div>
              </div>
            </div>
            {/* Premium Product Links */}
            <div>
              <h3 className="text-foreground gradient-text-primary mb-6 text-lg font-semibold">
                Produit
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Premium Company Links */}
            <div>
              <h3 className="text-foreground gradient-text-primary mb-6 text-lg font-semibold">
                Entreprise
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Premium Support Links */}
            <div>
              <h3 className="text-foreground gradient-text-primary mb-6 text-lg font-semibold">
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Premium Newsletter Signup */}
        <div className="border-primary/20 border-t py-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-6 md:mb-0">
              <h3 className="text-foreground gradient-text-primary mb-2 text-lg font-semibold">
                Restez informé
              </h3>
              <p className="text-muted-foreground text-balance">
                Recevez les dernières mises à jour sur les nouvelles
                fonctionnalités et défis.
              </p>
            </div>
            <Button className="btn-spotify border-0 shadow-xl" asChild>
              <Link href="#newsletter">S&apos;inscrire à la Newsletter</Link>
            </Button>
          </div>
        </div>
        {/* Premium Bottom Section */}
        <div className="border-primary/20 border-t py-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            {/* Copyright */}
            <div className="text-muted-foreground mb-6 text-sm md:mb-0">
              © {currentYear} Melodix. Tous droits réservés.
            </div>
            {/* Premium Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground mr-2 text-sm">
                Suivez-nous :
              </span>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 glow-pulse p-2 transition-all duration-300 hover:scale-110"
                    style={{ animationDelay: `${index * 0.5}s` }}
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Suivez-nous sur ${social.name}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
