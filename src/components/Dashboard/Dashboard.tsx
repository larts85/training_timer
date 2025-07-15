'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  TimerState,
  TimerSettings,
  MessageState,
} from '@/types/dashboard.types'
import { DashboardContent } from './DashboardContent'
import { TimerMenu } from './TimerMenu'
import { Message } from './Message'
import Image from 'next/image'
import '@/styles/dashboard.css'

type ViewType = 'timer' | 'timerSettings' | 'generalSettings' | 'about'

// Utility functions for time conversion
const timeStringToSeconds = (timeString: string): number => {
  const [minutes, seconds] = timeString.split(':').map(Number)
  return minutes * 60 + seconds
}

const secondsToTimeString = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const calculateTotalSessionTime = (settings: TimerSettings): number => {
  const prepare = timeStringToSeconds(settings.prepare)
  const warmUp = timeStringToSeconds(settings.warmUp)
  const work = timeStringToSeconds(settings.work)
  const rest = timeStringToSeconds(settings.rest)
  const cycleRest = timeStringToSeconds(settings.cycleRest)

  const totalCycleTime = (work + rest) * settings.sets + cycleRest
  const totalTime =
    prepare + warmUp + totalCycleTime * settings.cycles - cycleRest // Remove last cycle rest

  return totalTime
}

export const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('timer')
  const [showMenu, setShowMenu] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState<number>(0)
  const [totalElapsedTime, setTotalElapsedTime] = useState<number>(0)

  const [timerState, setTimerState] = useState<TimerState>({
    currentTime: '00:00',
    totalTime: '00:00',
    currentSet: 1,
    totalSets: 8,
    currentCycle: 1,
    totalCycles: 4,
    isPlaying: false,
    isPaused: false,
    phase: 'prepare',
  })

  const [timerSettings, setTimerSettings] = useState<TimerSettings>({
    prepare: '00:03',
    warmUp: '05:00',
    work: '00:30',
    rest: '00:20',
    sets: 3,
    cycles: 5,
    cycleRest: '00:30',
    workReps: false,
    restReps: true,
  })

  const [messageState, setMessageState] = useState<MessageState>({
    isVisible: false,
    text: 'Notice that on reps mode you need to resume manually the session.',
    showDontShowAgain: true,
    isDontShowAgainChecked: false,
  })

  // Initialize timer when settings change
  useEffect(() => {
    const totalSessionTime = calculateTotalSessionTime(timerSettings)
    const initialPhaseTime = timeStringToSeconds(timerSettings.prepare)

    setTimerState((prev) => ({
      ...prev,
      totalTime: secondsToTimeString(totalSessionTime),
      totalSets: timerSettings.sets,
      totalCycles: timerSettings.cycles,
    }))

    setCurrentTimeInSeconds(initialPhaseTime)
    setTotalElapsedTime(0)
  }, [timerSettings])

  // Update current time display when currentTimeInSeconds changes
  useEffect(() => {
    setTimerState((prev) => ({
      ...prev,
      currentTime: secondsToTimeString(currentTimeInSeconds),
      totalTime: secondsToTimeString(totalElapsedTime),
    }))
  }, [currentTimeInSeconds, totalElapsedTime])

  const handlePhaseComplete = useCallback(() => {
    const { phase, currentSet, currentCycle, totalSets, totalCycles } =
      timerState

    let newPhase = phase
    let newSet = currentSet
    let newCycle = currentCycle
    let newTimeInSeconds = 0

    switch (phase) {
      case 'prepare':
        newPhase = 'warmup'
        newTimeInSeconds = timeStringToSeconds(timerSettings.warmUp)
        break

      case 'warmup':
        newPhase = 'work'
        newTimeInSeconds = timeStringToSeconds(timerSettings.work)
        break

      case 'work':
        // Always go to rest after work
        newPhase = 'rest'
        newTimeInSeconds = timeStringToSeconds(timerSettings.rest)
        break

      case 'rest':
        if (currentSet < totalSets) {
          // Go to next set
          newPhase = 'work'
          newSet = currentSet + 1
          newTimeInSeconds = timeStringToSeconds(timerSettings.work)
        } else if (currentCycle < totalCycles) {
          // Go to next cycle
          newPhase = 'cycleRest'
          newSet = 1
          newCycle = currentCycle + 1
          newTimeInSeconds = timeStringToSeconds(timerSettings.cycleRest)
        } else {
          // Session complete
          setTimerState((prev) => ({ ...prev, isPlaying: false }))
          return
        }
        break

      case 'cycleRest':
        newPhase = 'work'
        newTimeInSeconds = timeStringToSeconds(timerSettings.work)
        break
    }

    // Update timer state and time separately for better synchronization
    setTimerState((prev) => ({
      ...prev,
      phase: newPhase,
      currentSet: newSet,
      currentCycle: newCycle,
    }))

    setCurrentTimeInSeconds(newTimeInSeconds)
  }, [timerState, timerSettings])

  // Main timer logic
  useEffect(() => {
    if (timerState.isPlaying && currentTimeInSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentTimeInSeconds((prev) => {
          if (prev <= 1) {
            // Time's up, move to next phase
            handlePhaseComplete()
            return 0
          }
          return prev - 1
        })

        setTotalElapsedTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerState.isPlaying, currentTimeInSeconds, handlePhaseComplete])

  const handlePlayPause = () => {
    setTimerState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
      isPaused: prev.isPlaying,
    }))
  }

  const handleStop = () => {
    setTimerState((prev) => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      phase: 'prepare',
      currentSet: 1,
      currentCycle: 1,
    }))

    setCurrentTimeInSeconds(timeStringToSeconds(timerSettings.prepare))
    setTotalElapsedTime(0)
  }

  const handleNext = () => {
    const { currentCycle, totalCycles, phase, currentSet, totalSets } =
      timerState

    let newCycle = currentCycle
    let newSet = currentSet

    // Determine next cycle (with wrap around)
    if (currentCycle < totalCycles) {
      newCycle = currentCycle + 1
    } else {
      // If we're on the last cycle, go back to first
      newCycle = 1
      newSet = currentSet < totalSets ? currentSet + 1 : 1
    }

    // Keep exactly the same relative position (set and phase)
    setTimerState((prev) => ({
      ...prev,
      currentCycle: newCycle,
      currentSet: newSet,
      // DO NOT change set or phase during manual navigation
    }))

    // Keep time according to current phase
    const timeToSet =
      phase === 'rest'
        ? timeStringToSeconds(timerSettings.rest)
        : timeStringToSeconds(timerSettings.work)

    setCurrentTimeInSeconds(timeToSet)
  }

  const handlePrevious = () => {
    const { currentCycle, totalCycles, phase, currentSet, totalSets } =
      timerState

    let newCycle = currentCycle
    let newSet = currentSet

    // Determine previous cycle (with wrap around)
    if (currentCycle > 1) {
      newCycle = currentCycle - 1
    } else {
      // If we're on the first cycle, go to last cycle
      newCycle = totalCycles
      newSet = currentSet > 1 ? currentSet - 1 : totalSets
    }

    // Keep exactly the same relative position (set and phase)
    setTimerState((prev) => ({
      ...prev,
      currentCycle: newCycle,
      currentSet: newSet,
      // DO NOT change set or phase during manual navigation
    }))

    // Keep time according to current phase
    const timeToSet =
      phase === 'rest'
        ? timeStringToSeconds(timerSettings.rest)
        : timeStringToSeconds(timerSettings.work)

    setCurrentTimeInSeconds(timeToSet)
  }

  const handleMenuToggle = () => {
    setShowMenu(!showMenu)
  }

  const handleMenuClose = () => {
    setShowMenu(false)
  }

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view)
    setShowMenu(false)
  }

  const handleMessageClose = () => {
    setMessageState((prev) => ({ ...prev, isVisible: false }))
  }

  const handleSettingsChange = (
    key: keyof TimerSettings,
    value: string | number | boolean,
  ) => {
    setTimerSettings((prev) => ({
      ...prev,
      [key]: value,
    }))

    // Show message when reps mode is activated
    if ((key === 'workReps' || key === 'restReps') && value === true) {
      setMessageState({
        isVisible: true,
        text: 'Notice that on reps mode you need to resume manually the session.',
        showDontShowAgain: true,
        isDontShowAgainChecked: false,
      })
    }
  }

  const handleDone = () => {
    // if mobile go to display
    if (window.innerWidth < 768) {
      setCurrentView('timer')
    } else {
      setCurrentView('timerSettings')
    }
  }

  const renderPageTitle = () => {
    switch (currentView) {
      case 'timer':
        return 'Timer'
      case 'timerSettings':
        return 'Timer Settings'
      case 'generalSettings':
        return 'General Settings'
      case 'about':
        return 'About'
      default:
        return 'Timer'
    }
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Training Timer</h1>
        <button className="menu-button" onClick={handleMenuToggle}>
          <Image src="/icons/menu-icon.svg" alt="Menu" width={24} height={15} />
        </button>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Page Title */}
        <div className="page-title">
          <p className="page-title-text">{renderPageTitle()}</p>
        </div>

        {/* Current View Content */}
        <div className="view-content">
          <DashboardContent
            currentView={currentView}
            timerState={timerState}
            timerSettings={timerSettings}
            onPlayPause={handlePlayPause}
            onStop={handleStop}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSettingsChange={handleSettingsChange}
            onDone={handleDone}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <button
          className={`footer-icon ${currentView === 'timer' ? 'active' : ''}`}
          onClick={() => handleViewChange('timer')}
        >
          <Image
            src="/icons/timer-footer.svg"
            alt="Timer"
            width={28}
            height={33}
          />
        </button>
        <button
          className={`footer-icon ${currentView === 'timerSettings' ? 'active' : ''}`}
          onClick={() => handleViewChange('timerSettings')}
        >
          <Image
            src="/icons/timer-settings-footer.svg"
            alt="Timer Settings"
            width={28}
            height={33}
          />
        </button>
        <button
          className={`footer-icon ${currentView === 'generalSettings' ? 'active' : ''}`}
          onClick={() => handleViewChange('generalSettings')}
        >
          <Image
            src="/icons/general-settings-footer.svg"
            alt="General Settings"
            width={30}
            height={30}
          />
        </button>
        <button
          className={`footer-icon ${currentView === 'about' ? 'active' : ''}`}
          onClick={() => handleViewChange('about')}
        >
          <Image
            src="/icons/about-footer.svg"
            alt="About"
            width={30}
            height={30}
          />
        </button>
      </footer>

      {/* Menu Overlay */}
      {showMenu && (
        <TimerMenu
          activeItem={currentView}
          onItemClick={handleViewChange}
          onClose={handleMenuClose}
        />
      )}

      {/* Message Overlay */}
      {messageState.isVisible && (
        <Message
          text={messageState.text}
          showDontShowAgain={messageState.showDontShowAgain}
          isDontShowAgainChecked={messageState.isDontShowAgainChecked}
          onClose={handleMessageClose}
        />
      )}
    </div>
  )
}
