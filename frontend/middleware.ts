import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/client/dashboard',
  '/client/profile',
  '/client/settings',
  '/client/campaigns',
  '/client/analytics',
  '/client/reports'
]

export async function middleware(req: NextRequest) {
  // Get the access token from cookies
  const accessToken = req.cookies.get('access_token')?.value
  const refreshToken = req.cookies.get('refresh_token')?.value

  // Check if the current path is protected
  const isProtected = protectedRoutes.some(path => 
    req.nextUrl.pathname.startsWith(path)
  )

  // If the route is protected and there's no access token
  if (isProtected && !accessToken) {
    // Store the original URL to redirect back after login
    const from = req.nextUrl.pathname
    const loginUrl = new URL('/client/login', req.url)
    loginUrl.searchParams.set('from', from)
    
    // Redirect to login page
    return NextResponse.redirect(loginUrl)
  }

  // If the route is protected and there's an access token but no refresh token
  if (isProtected && accessToken && !refreshToken) {
    // Clear the access token and redirect to login
    const response = NextResponse.redirect(new URL('/client/login', req.url))
    response.cookies.delete('access_token')
    return response
  }

  // If not protected or authenticated, continue
  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Match only protected routes
    '/dashboard/:path*',
    '/profile/:path*',
    '/client/dashboard/:path*',
    '/client/profile/:path*',
    '/client/settings/:path*',
    '/client/campaigns/:path*',
    '/client/analytics/:path*',
    '/client/reports/:path*'
  ]
} 