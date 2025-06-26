'use client'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Menu, X, LogOut, User, Settings } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSpotifyAuth } from '@/contexts/SpotifyAuthProvider'
import Image from 'next/image'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  const { isAuthenticated, isLoading, user, signOut } = useSpotifyAuth()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const UserDisplay = () => {
    if (!isClient) {
      return null
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
        <Popover>
          <PopoverTrigger asChild>
            <button className="hover:bg-primary/10 flex items-center space-x-2 rounded-lg p-2 transition-all duration-300">
              {user.images && user.images[0] && (
                <Image
                  src={user.images[0].url}
                  alt={user.display_name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div className="hidden text-left lg:block">
                <p className="text-foreground text-sm font-medium">
                  {user.display_name}
                </p>
                {/* <p className="text-muted-foreground text-xs">Voir le profil</p> */}
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="end">
            <div className="space-y-1">
              <div className="border-b px-3 py-2">
                <p className="text-sm font-medium">{user.display_name}</p>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </div>
              <Link
                href="/profile"
                className="hover:bg-accent hover:text-accent-foreground flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Profil</span>
              </Link>
              <Link
                href="/settings"
                className="hover:bg-accent hover:text-accent-foreground flex items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Paramètres</span>
              </Link>
              <div className="border-t pt-1">
                <button
                  onClick={signOut}
                  className="text-destructive hover:bg-destructive/10 flex w-full items-center space-x-2 rounded-md px-3 py-2 text-sm transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )
    }

    // Pour les visiteurs non connectés, on n'affiche rien car les liens sont dans la navigation
    return null
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
          {/* Desktop Navigation */}
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
              {isAuthenticated ? (
                // Navigation pour utilisateur connecté
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/play"
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                      >
                        Jouer
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/duels"
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                      >
                        Duels
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/classements"
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                      >
                        Classements
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/tournois"
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                      >
                        Tournois
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
                        href="/boutique"
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                      >
                        Boutique
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              ) : (
                // Navigation pour visiteur non connecté
                <>
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
                        href="/tarifs"
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                      >
                        Tarifs / Premium
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/faq"
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                      >
                        FAQ
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/auth/login"
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                      >
                        Connexion
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/auth/register"
                        className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
                      >
                        Inscription
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
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
        {/* Mobile Navigation */}
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
              {isAuthenticated ? (
                // Navigation mobile pour utilisateur connecté
                <>
                  <Link
                    href="/jouer"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Jouer
                  </Link>
                  <Link
                    href="/duels"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Duels
                  </Link>
                  <Link
                    href="/classements"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Classements
                  </Link>
                  <Link
                    href="/tournois"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Tournois
                  </Link>
                  <Link
                    href="/profile"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Profil
                  </Link>
                  <Link
                    href="/boutique"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Boutique
                  </Link>
                </>
              ) : (
                // Navigation mobile pour visiteur non connecté
                <>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Fonctionnalités
                  </Link>
                  <Link
                    href="/tarifs"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Tarifs / Premium
                  </Link>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/auth/login"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg px-4 py-2 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Inscription
                  </Link>
                </>
              )}
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
