'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSpotifyAuth } from '@/contexts/SpotifyAuthProvider'
import Image from 'next/image'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Éviter l'hydratation mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])
  const { isAuthenticated, isLoading, user, signOut, hasSpotifyAccess } =
    useSpotifyAuth()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const UserDisplay = () => {
    if (!isClient) {
      return (
        <Button className="btn-spotify border-0 shadow-lg">
          <User className="mr-2 h-4 w-4" />
          Connecter Spotify
        </Button>
      )
    }
    if (isLoading) {
      return (
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-4 w-20 animate-pulse rounded bg-gray-300"></div>
        </div>
      )
    }

    if (isAuthenticated && user) {
      return (
        <div className="flex items-center space-x-3">
          {user.images && user.images[0] && (
            <Image
              src={user.images[0].url}
              alt={user.display_name}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <div className="hidden lg:block">
            <p className="text-foreground text-sm font-medium">
              {user.display_name}
            </p>
            <p className="text-muted-foreground text-xs">
              {hasSpotifyAccess ? 'Connecté' : 'Connexion expirée'}
            </p>
          </div>
          <Button
            onClick={signOut}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:ml-2 sm:inline">Déconnexion</span>
          </Button>
        </div>
      )
    }
    return (
      <Button
        onClick={() => (window.location.href = '/auth/login')}
        className="btn-spotify border-0 shadow-lg"
      >
        <User className="mr-2 h-4 w-4" />
        Connecter Spotify
      </Button>
    )
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
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                  >
                    Accueil
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/profile"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                  >
                    Profil
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                  >
                    Fonctionnalités
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#stats"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                  >
                    Stats
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#newsletter"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden md:flex">
            <UserDisplay />
          </div>
          {/* Premium Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg p-2 transition-all duration-300 hover:scale-105 md:hidden"
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
                href="/profile"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                Profil
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
                <UserDisplay />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
