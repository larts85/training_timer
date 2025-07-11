'use client'

import React, { useState, useEffect } from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Timer from '@/components/Timer/Timer'
import SplashScreen from '@/components/SplashScreen/SplashScreen'

interface AppClientProps {
  locale: string
  greeting: string
}

const AppClient: React.FC<AppClientProps> = ({ locale, greeting }) => {
  const [showSplash, setShowSplash] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Hide splash screen after 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (showSplash) {
    return <SplashScreen onAnimationEnd={() => setShowSplash(false)} />
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header locale={locale} />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {greeting}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Training Timer App
            </p>
          </div>
          <Timer />
        </div>
      </main>
      <Footer isMobile={isMobile} />
    </div>
  )
}

AppClient.displayName = 'AppClient'

export default AppClient
