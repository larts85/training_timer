'use client'

import React from 'react'
import LangButtons from '@/components/LangButtons/LangButtons'
import NavButtons from './NavButtons'
import useTranslations from '@/hooks/useTranslations'

interface FooterProps {
  colorMode?: 'light' | 'dark'
  cornerMode?: 'rounded' | 'square'
  isMobile?: boolean
  className?: string
}

const Footer: React.FC<FooterProps> = ({
  colorMode = 'light',
  cornerMode = 'rounded',
  isMobile = false,
  className = '',
}) => {
  const { currentLang } = useTranslations()

  const baseClasses = 'w-full p-4 border-t'
  const colorClasses =
    colorMode === 'dark'
      ? 'bg-gray-900 text-white border-gray-700'
      : 'bg-white text-gray-900 border-gray-200'
  const cornerClasses =
    cornerMode === 'rounded' ? 'rounded-t-lg' : 'rounded-none'

  return (
    <footer
      className={`${baseClasses} ${colorClasses} ${cornerClasses} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {!isMobile && (
          <div className="flex justify-center">
            <LangButtons currentLocale={currentLang || 'es-AR'} />
          </div>
        )}
        {isMobile && (
          <div className="flex justify-center">
            <NavButtons colorMode={colorMode} />
          </div>
        )}
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer
