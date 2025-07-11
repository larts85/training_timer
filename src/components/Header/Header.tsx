import { FC } from 'react'
import { getStaticTranslations } from '@/utils/translations'
import LangButtons from '@/components/LangButtons/LangButtons'

interface HeaderProps {
  locale: string
}

const Header: FC<HeaderProps> = ({ locale }) => {
  const translations = getStaticTranslations(locale)

  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Training Timer
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:block">
              <ul className="flex gap-6">
                <li className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  {translations.navLinks.home}
                </li>
                <li className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  {translations.navLinks.anchorTitle}
                </li>
              </ul>
            </nav>
            <LangButtons currentLocale={locale} />
          </div>
        </div>
      </div>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
