import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const isLoggedIn = !!token
  const isAuthPage = req.nextUrl.pathname.startsWith('/login')
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard') || 
                          req.nextUrl.pathname.startsWith('/saved') || 
                          req.nextUrl.pathname.startsWith('/compare')

  const isDemoMode = req.nextUrl.searchParams.get('demo') === 'true'

  // Redirect logged-in users away from login page
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (isProtectedRoute && !isLoggedIn && !isDemoMode) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.webp$).*)'],
}
