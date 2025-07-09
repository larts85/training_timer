import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

// Define the type for supported locales
type Locale = 'en-US' | 'es-AR' | 'pt-BR'

// Define supported locales
const locales: Locale[] = ['en-US', 'es-AR', 'pt-BR']

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  // Validate that the locale is supported
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return <div lang={locale}>{children}</div>
}

// Generate static params for all supported locales
export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }))
}
