import {
  dashboard,
  timer,
  controllers,
  navigation,
  settings,
  messages,
} from '../constants/translations'
import {
  API_ROUTES,
  APP_ROUTES,
  EXTERNAL_URLS,
  ASSETS,
} from '../constants/urls'

describe('Translation Constants', () => {
  it('should have dashboard constants', () => {
    expect(dashboard.TITLE).toBe('dashboard.title')
  })

  it('should have timer constants', () => {
    expect(timer.CYCLES).toBe('timer.cycles')
    expect(timer.START).toBe('timer.start')
    expect(timer.PAUSE).toBe('timer.pause')
    expect(timer.RESET).toBe('timer.reset')
    expect(timer.WORK_TIME).toBe('timer.workTime')
    expect(timer.BREAK_TIME).toBe('timer.breakTime')
    expect(timer.LONG_BREAK_TIME).toBe('timer.longBreakTime')
  })

  it('should have controller constants', () => {
    expect(controllers.START).toBe('controllers.start')
    expect(controllers.PAUSE).toBe('controllers.pause')
    expect(controllers.STOP).toBe('controllers.stop')
    expect(controllers.RESET).toBe('controllers.reset')
  })

  it('should have navigation constants', () => {
    expect(navigation.HOME).toBe('navigation.home')
    expect(navigation.SETTINGS).toBe('navigation.settings')
    expect(navigation.ABOUT).toBe('navigation.about')
    expect(navigation.TIMER).toBe('navigation.timer')
  })

  it('should have settings constants', () => {
    expect(settings.TITLE).toBe('settings.title')
    expect(settings.WORK_DURATION).toBe('settings.workDuration')
    expect(settings.SHORT_BREAK).toBe('settings.shortBreak')
    expect(settings.LONG_BREAK).toBe('settings.longBreak')
    expect(settings.SOUND_ENABLED).toBe('settings.soundEnabled')
    expect(settings.NOTIFICATIONS).toBe('settings.notifications')
  })

  it('should have message constants', () => {
    expect(messages.WORK_SESSION_COMPLETE).toBe('messages.workSessionComplete')
    expect(messages.BREAK_SESSION_COMPLETE).toBe(
      'messages.breakSessionComplete',
    )
    expect(messages.ALL_SESSIONS_COMPLETE).toBe('messages.allSessionsComplete')
  })
})

describe('URL Constants', () => {
  it('should have API routes', () => {
    expect(API_ROUTES.AUTH.LOGIN).toBe('/api/auth/login')
    expect(API_ROUTES.AUTH.LOGOUT).toBe('/api/auth/logout')
    expect(API_ROUTES.AUTH.REGISTER).toBe('/api/auth/register')
    expect(API_ROUTES.AUTH.PROFILE).toBe('/api/auth/profile')
    expect(API_ROUTES.TIMER.SESSIONS).toBe('/api/timer/sessions')
    expect(API_ROUTES.TIMER.SETTINGS).toBe('/api/timer/settings')
    expect(API_ROUTES.TIMER.STATS).toBe('/api/timer/stats')
  })

  it('should have app routes', () => {
    expect(APP_ROUTES.HOME).toBe('/')
    expect(APP_ROUTES.TIMER).toBe('/timer')
    expect(APP_ROUTES.SETTINGS).toBe('/settings')
    expect(APP_ROUTES.ABOUT).toBe('/about')
    expect(APP_ROUTES.LOGIN).toBe('/login')
    expect(APP_ROUTES.REGISTER).toBe('/register')
    expect(APP_ROUTES.PROFILE).toBe('/profile')
    expect(APP_ROUTES.STATS).toBe('/stats')
  })

  it('should have external URLs', () => {
    expect(EXTERNAL_URLS.GITHUB).toBe(
      'https://github.com/larts85/training-timer',
    )
    expect(EXTERNAL_URLS.DOCUMENTATION).toBe('https://docs.example.com')
    expect(EXTERNAL_URLS.SUPPORT).toBe('mailto:support@example.com')
  })

  it('should have asset URLs', () => {
    expect(ASSETS.LOGO).toBe('/logo.svg')
    expect(ASSETS.TIMER_ICON).toBe('/icons/timer.svg')
    expect(ASSETS.FAVICON).toBe('/favicon.ico')
    expect(ASSETS.SOUNDS.NOTIFICATION).toBe('/sounds/notification.mp3')
    expect(ASSETS.SOUNDS.COMPLETE).toBe('/sounds/complete.mp3')
    expect(ASSETS.SOUNDS.TICK).toBe('/sounds/tick.mp3')
  })
})
