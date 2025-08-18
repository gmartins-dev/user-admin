import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const { token } = req.nextauth

    // Redirect authenticated users away from auth pages
    if (token && (pathname.startsWith('/login') || pathname.startsWith('/register'))) {
      if (token.role === 'ADMIN') {
        return Response.redirect(new URL('/admin', req.url))
      }
      return Response.redirect(new URL('/dashboard', req.url))
    }
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
