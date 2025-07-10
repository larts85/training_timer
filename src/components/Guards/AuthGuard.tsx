'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

interface User {
  id: string
  name: string
  email: string
}

// Mock auth context - in a real app this would come from your auth provider
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking auth status
    const checkAuth = async () => {
      try {
        // This would be your actual auth check
        const token = localStorage.getItem('auth-token')
        if (token) {
          // Simulate API call to validate token
          setUser({ id: '1', name: 'User', email: 'user@example.com' })
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login: (userData: User) => setUser(userData),
    logout: () => setUser(null),
  }
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallback,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null,
  )

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      if (pathname !== requestedLocation) {
        setRequestedLocation(pathname)
      }
      router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`)
    }
  }, [
    isAuthenticated,
    isLoading,
    pathname,
    requestedLocation,
    router,
    redirectTo,
  ])

  useEffect(() => {
    if (
      isAuthenticated &&
      requestedLocation &&
      pathname !== requestedLocation
    ) {
      setRequestedLocation(null)
      router.push(requestedLocation)
    }
  }, [isAuthenticated, requestedLocation, pathname, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

AuthGuard.displayName = 'AuthGuard'

export default AuthGuard
export { useAuth }
