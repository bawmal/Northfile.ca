import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Public routes that don't need auth (including dashboard pages for design preview)
  const publicRoutes = ['/', '/designs', '/alt', '/old', '/dashboard', '/transactions', '/receipts', '/properties', '/reports', '/login', '/signup']
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith('/designs') || 
    request.nextUrl.pathname.startsWith('/alt') || 
    request.nextUrl.pathname.startsWith('/old') ||
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/transactions') ||
    request.nextUrl.pathname.startsWith('/receipts') ||
    request.nextUrl.pathname.startsWith('/properties') ||
    request.nextUrl.pathname.startsWith('/reports') ||
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup')
  )

  // Skip Supabase auth for public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Only check auth for protected routes
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
