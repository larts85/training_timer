export interface TimerProps {
  colorMode?: 'light' | 'dark'
  cornerMode?: 'rounded' | 'square'
  className?: string
}

export interface TimerState {
  time: number
  isRunning: boolean
  cycles: number
}

export type TimerMode = 'work' | 'break' | 'longBreak'
