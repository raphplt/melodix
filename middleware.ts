import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware() {
    // Le middleware s'exécute seulement pour les routes protégées
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    // Protéger toutes les routes sous (protected)
    '/(protected)/:path*',
    // Protéger des routes spécifiques si nécessaire
    '/profile/:path*',
  ],
}
