'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const locales = ['en-US', 'es-AR', 'pt-BR']

interface LangButtonsProps {
  currentLocale: string
}

const LangButtons = ({ currentLocale }: LangButtonsProps) => {
  const pathname = usePathname()

  // Remove the current locale from the pathname to get the base path
  const basePath = pathname
    ? pathname.replace(`/${currentLocale}`, '') || '/'
    : '/'

  return (
    <nav className="flex gap-2">
      {locales.map(
        (locale) =>
          currentLocale !== locale && (
            <Link key={locale} href={`/${locale}${basePath}`}>
              <div role="button" className="cursor-pointer hover:underline">
                {locale.split('-')[0]}
              </div>
            </Link>
          ),
      )}
    </nav>
  )
}

LangButtons.displayName = 'LangButtons'

export default LangButtons
