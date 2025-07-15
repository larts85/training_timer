'use client'

import React from 'react'
import { TimerState, TimerSettings } from '@/types/dashboard.types'
import { TimerDisplay } from './TimerDisplay'
import { TimerActions } from './TimerActions'
import { TimerControllers } from './TimerControllers'
import { DoneButton } from './DoneButton'

type ViewType = 'timer' | 'timerSettings' | 'generalSettings' | 'about'

interface DashboardContentProps {
  currentView: ViewType
  timerState: TimerState
  timerSettings: TimerSettings
  onPlayPause: () => void
  onStop: () => void
  onNext: () => void
  onPrevious: () => void
  onSettingsChange: (
    key: keyof TimerSettings,
    value: string | number | boolean,
  ) => void
  onDone: () => void
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  currentView,
  timerState,
  timerSettings,
  onPlayPause,
  onStop,
  onNext,
  onPrevious,
  onSettingsChange,
  onDone,
}) => {
  switch (currentView) {
    case 'timer':
      return (
        <>
          <TimerDisplay timerState={timerState} />
          <TimerActions
            isPlaying={timerState.isPlaying}
            onPlayPause={onPlayPause}
            onStop={onStop}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        </>
      )
    case 'timerSettings':
      return (
        <>
          <TimerControllers
            settings={timerSettings}
            onSettingsChange={onSettingsChange}
          />
          <DoneButton onClick={onDone} />
        </>
      )
    case 'generalSettings':
      return (
        <>
          <div className="general-settings">
            <div className="general-settings-content">
              <div className="settings-section">
                <h3>Sounds</h3>
                <div className="setting-row">
                  <span>Volume</span>
                  <div className="volume-slider">
                    <input type="range" min="0" max="100" defaultValue="70" />
                  </div>
                </div>
                <div className="setting-row">
                  <span>Vibrate</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="setting-row">
                  <span>Ending Bips</span>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
              <div className="settings-section">
                <h3>Speaking Coach</h3>
                <div className="setting-row">
                  <span>Ending Count</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="setting-row">
                  <span>Pausing sesion</span>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
          </div>
          <DoneButton onClick={onDone} />
        </>
      )
    case 'about':
      return (
        <div className="about-content">
          <h2>About Training Timer</h2>
          <p>Version 1.0.0</p>
          <p>A simple and effective training timer for your workouts.</p>
        </div>
      )
    default:
      return null
  }
}
