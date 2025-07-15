export interface SplashScreenProps {
  isVisible?: boolean
  onAnimationEnd?: () => void
  className?: string
  duration?: number
  logo?: string
  title?: string
  subtitle?: string
}

export interface SplashScreenState {
  isLoading: boolean
  progress: number
}
