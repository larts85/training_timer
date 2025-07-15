import React from 'react'
import { TimerState } from '@/types/dashboard.types'

interface TimerDisplayProps {
  timerState: TimerState
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timerState }) => {
  const getPhaseColor = (phase: TimerState['phase']) => {
    switch (phase) {
      case 'prepare':
        return '#EA6418'
      case 'warmup':
        return '#F2994A'
      case 'work':
        return '#219653'
      case 'rest':
        return '#EA6418'
      case 'cycleRest':
        return '#F2994A'
      default:
        return '#219653'
    }
  }

  return (
    <div className="timer-display">
      <div
        className="main-time"
        style={{ color: getPhaseColor(timerState.phase) }}
      >
        {timerState.currentTime}
      </div>

      <div className="total-time">{timerState.totalTime}</div>

      <div className="progress-section">
        <div className="progress-divider"></div>
        <div className="progress-container">
          <div className="progress-item">
            <div className="progress-value">
              {timerState.currentSet}/{timerState.totalSets}
            </div>
            <div className="progress-label">SETS</div>
          </div>
          <div className="progress-separator"></div>
          <div className="progress-item">
            <div className="progress-value">
              {timerState.currentCycle}/{timerState.totalCycles}
            </div>
            <div className="progress-label">CYCLES</div>
          </div>
        </div>
      </div>
    </div>
  )
}
