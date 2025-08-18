import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Security headers
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

function addSecurityHeaders(response: NextResponse) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const { token } = req.nextauth
    const response = NextResponse.next()

    // Add security headers to all responses
    addSecurityHeaders(response)

    // Redirect authenticated users away from auth pages
    if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
      if (token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return response
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to public routes
        if (pathname === '/' || pathname.startsWith('/_next') || pathname.startsWith('/api/cep') || pathname.startsWith('/api/users/register')) {
          return true
        }

        // Allow access to auth pages without token
        if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
          return true
        }

        // Require token for protected routes
        if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
          if (!token) return false

          // Admin routes require ADMIN role
          if (pathname.startsWith('/admin')) {
            return token.role === 'ADMIN'
          }

          return true
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
