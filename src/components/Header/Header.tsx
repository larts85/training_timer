import { FC } from 'react'
import { getStaticTranslations } from '@/utils/translations'
import LangButtons from '@/components/LangButtons/LangButtons'

interface HeaderProps {
  locale: string
}

const Header: FC<HeaderProps> = ({ locale }) => {
  const translations = getStaticTranslations(locale)

  return (
    <header className="flex justify-between">
      <LangButtons currentLocale={locale} />
      <nav>
        <ul className="flex gap-1">
          <li>{translations.navLinks.home}</li>
          <li>{translations.navLinks.anchorTitle}</li>
        </ul>
      </nav>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
