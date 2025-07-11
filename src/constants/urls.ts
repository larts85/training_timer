// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    PROFILE: '/api/auth/profile',
  },
  TIMER: {
    SESSIONS: '/api/timer/sessions',
    SETTINGS: '/api/timer/settings',
    STATS: '/api/timer/stats',
  },
} as const

// App Routes
export const APP_ROUTES = {
  HOME: '/',
  TIMER: '/timer',
  SETTINGS: '/settings',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  STATS: '/stats',
} as const

// External URLs
export const EXTERNAL_URLS = {
  GITHUB: 'https://github.com/larts85/training-timer',
  DOCUMENTATION: 'https://docs.example.com',
  SUPPORT: 'mailto:support@example.com',
} as const

// Asset URLs
export const ASSETS = {
  LOGO: '/logo.svg',
  TIMER_ICON: '/icons/timer.svg',
  FAVICON: '/favicon.ico',
  SOUNDS: {
    NOTIFICATION: '/sounds/notification.mp3',
    COMPLETE: '/sounds/complete.mp3',
    TICK: '/sounds/tick.mp3',
  },
} as const

// Type definitions
export type ApiRoutes = typeof API_ROUTES
export type AppRoutes = (typeof APP_ROUTES)[keyof typeof APP_ROUTES]
export type ExternalUrls = (typeof EXTERNAL_URLS)[keyof typeof EXTERNAL_URLS]
export type AssetUrls = typeof ASSETS
