import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define supported locales
const locales = ['en-US', 'es-AR', 'pt-BR']
const defaultLocale = 'es-AR'

// Get the preferred locale
function getLocale(request: NextRequest): string {
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = locales.find(
      (locale) =>
        acceptLanguage.includes(locale) ||
        acceptLanguage.includes(locale.split('-')[0]),
    )
    if (preferredLocale) return preferredLocale
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip if it's a static file or API route
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Redirect to add locale
  const locale = getLocale(request)
  const newUrl = new URL(
    `/${locale}${pathname === '/' ? '' : pathname}`,
    request.url,
  )

  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths and files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}
