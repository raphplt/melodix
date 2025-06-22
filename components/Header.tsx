'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="glass border-primary/20 fixed top-0 right-0 left-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Premium Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
          >
            <span className="gradient-text-emerald text-2xl font-bold">
              Melodix
            </span>
          </Link>
          {/* Premium Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105">
                    Accueil
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>{' '}
              <NavigationMenuItem>
                <Link href="/spotify" legacyBehavior passHref>
                  <NavigationMenuLink className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105">
                    Spotify
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#features" legacyBehavior passHref>
                  <NavigationMenuLink className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105">
                    Fonctionnalités
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#stats" legacyBehavior passHref>
                  <NavigationMenuLink className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105">
                    Stats
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#newsletter" legacyBehavior passHref>
                  <NavigationMenuLink className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105">
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* Premium CTA Button */}
          <div className="hidden md:flex">
            <Button
              variant="default"
              className="btn-spotify border-0 shadow-lg"
              asChild
            >
              <Link href="/spotify">Connecter Spotify</Link>
            </Button>
          </div>
          {/* Premium Mobile Menu Button */}{' '}
          <button
            onClick={toggleMobileMenu}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg p-2 transition-all duration-300 hover:scale-105 md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {/* Premium Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="glass-dark border-primary/20 border-t py-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                Accueil
              </Link>
              <Link
                href="/spotify"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                Spotify
              </Link>
              <Link
                href="#features"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                Fonctionnalités
              </Link>
              <Link
                href="#stats"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                Stats
              </Link>
              <Link
                href="#newsletter"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
              <div className="px-4 pt-2">
                <Button
                  className="btn-spotify w-full border-0 shadow-lg"
                  asChild
                >
                  <Link href="/spotify">Connecter Spotify</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
