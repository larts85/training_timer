'use client'

import React from 'react'

interface SplashScreenProps {
  isVisible?: boolean
  onAnimationEnd?: () => void
  className?: string
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  isVisible = true,
  onAnimationEnd,
  className = '',
}) => {
  const handleAnimationEnd = () => {
    if (onAnimationEnd) {
      onAnimationEnd()
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 ${className}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="text-center animate-pulse">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
          <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center">
            {/* Timer Icon SVG */}
            <svg
              className="w-10 h-10 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Training Timer</h1>
        <p className="text-white/80 text-lg">Get ready to train!</p>
        <div className="mt-8">
          <div className="w-32 h-1 bg-white/30 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

SplashScreen.displayName = 'SplashScreen'

export default SplashScreen
