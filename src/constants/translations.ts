export const dashboard = {
  TITLE: 'dashboard.title',
} as const

export const timer = {
  CYCLES: 'timer.cycles',
  START: 'timer.start',
  PAUSE: 'timer.pause',
  RESET: 'timer.reset',
  WORK_TIME: 'timer.workTime',
  BREAK_TIME: 'timer.breakTime',
  LONG_BREAK_TIME: 'timer.longBreakTime',
} as const

export const controllers = {
  START: 'controllers.start',
  PAUSE: 'controllers.pause',
  STOP: 'controllers.stop',
  RESET: 'controllers.reset',
} as const

export const navigation = {
  HOME: 'navigation.home',
  SETTINGS: 'navigation.settings',
  ABOUT: 'navigation.about',
  TIMER: 'navigation.timer',
} as const

export const settings = {
  TITLE: 'settings.title',
  WORK_DURATION: 'settings.workDuration',
  SHORT_BREAK: 'settings.shortBreak',
  LONG_BREAK: 'settings.longBreak',
  SOUND_ENABLED: 'settings.soundEnabled',
  NOTIFICATIONS: 'settings.notifications',
} as const

export const messages = {
  WORK_SESSION_COMPLETE: 'messages.workSessionComplete',
  BREAK_SESSION_COMPLETE: 'messages.breakSessionComplete',
  ALL_SESSIONS_COMPLETE: 'messages.allSessionsComplete',
} as const

// Type definitions for translation keys
export type DashboardKeys = (typeof dashboard)[keyof typeof dashboard]
export type TimerKeys = (typeof timer)[keyof typeof timer]
export type ControllerKeys = (typeof controllers)[keyof typeof controllers]
export type NavigationKeys = (typeof navigation)[keyof typeof navigation]
export type SettingsKeys = (typeof settings)[keyof typeof settings]
export type MessageKeys = (typeof messages)[keyof typeof messages]

export type TranslationKeys =
  | DashboardKeys
  | TimerKeys
  | ControllerKeys
  | NavigationKeys
  | SettingsKeys
  | MessageKeys
