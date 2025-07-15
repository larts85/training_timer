export interface TimerState {
  currentTime: string
  totalTime: string
  currentSet: number
  totalSets: number
  currentCycle: number
  totalCycles: number
  isPlaying: boolean
  isPaused: boolean
  phase: 'prepare' | 'warmup' | 'work' | 'rest' | 'cycleRest'
}

export interface TimerSettings {
  prepare: string
  warmUp: string
  work: string
  rest: string
  sets: number
  cycles: number
  cycleRest: string
  workReps: boolean
  restReps: boolean
}

export interface MenuState {
  isOpen: boolean
  activeItem: 'timer' | 'timerSettings' | 'generalSettings' | 'about'
}

export interface MessageState {
  isVisible: boolean
  text: string
  showDontShowAgain: boolean
  isDontShowAgainChecked: boolean
}

export interface DashboardProps {
  locale: string
}

export interface TimerControllerRowProps {
  name: string
  value: string
  onValueChange: (value: string) => void
  hasToggle?: boolean
  isToggleOn?: boolean
  onToggleChange?: (value: boolean) => void
  isNumberInput?: boolean
}
