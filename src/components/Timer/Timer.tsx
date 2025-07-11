'use client'

import React from 'react'
import useTranslations from '@/hooks/useTranslations'

interface TimerProps {
  colorMode?: 'light' | 'dark'
  cornerMode?: 'rounded' | 'square'
  className?: string
}

const Timer: React.FC<TimerProps> = ({
  colorMode = 'light',
  cornerMode = 'rounded',
  className = '',
}) => {
  const { t } = useTranslations()

  const baseClasses =
    'flex flex-col items-center justify-center p-8 min-h-[400px]'
  const colorClasses =
    colorMode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
  const cornerClasses = cornerMode === 'rounded' ? 'rounded-lg' : 'rounded-none'

  return (
    <div
      className={`${baseClasses} ${colorClasses} ${cornerClasses} ${className}`}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          {t('dashboard.title')}
        </h1>
        <div className="text-6xl font-mono font-bold mb-8 text-secondary">
          00:00:00
        </div>
        <div className="flex gap-4 justify-center">
          <button
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
            aria-label={t('controllers.start')}
          >
            {t('controllers.start')}
          </button>
          <button
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
            aria-label={t('controllers.pause')}
          >
            {t('controllers.pause')}
          </button>
        </div>
        <div className="mt-6 text-lg text-gray-600">{t('timer.cycles')}: 0</div>
      </div>
    </div>
  )
}

Timer.displayName = 'Timer'

export default Timer
