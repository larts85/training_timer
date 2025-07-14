import React from 'react'
import { TimerSettings } from '@/types/dashboard.types'
import { TimerControllerRow } from './TimerControllerRow'

interface TimerControllersProps {
  settings: TimerSettings
  onSettingsChange: (
    key: keyof TimerSettings,
    value: string | number | boolean,
  ) => void
}

export const TimerControllers: React.FC<TimerControllersProps> = ({
  settings,
  onSettingsChange,
}) => {
  return (
    <div className="timer-controllers">
      <div className="controllers-scroll">
        <TimerControllerRow
          name="Prepare"
          value={settings.prepare}
          onValueChange={(value) => onSettingsChange('prepare', value)}
        />

        <TimerControllerRow
          name="Warm Up"
          value={settings.warmUp}
          onValueChange={(value) => onSettingsChange('warmUp', value)}
        />

        <TimerControllerRow
          name="Work"
          value={settings.work}
          onValueChange={(value) => onSettingsChange('work', value)}
          hasToggle={true}
          isToggleOn={settings.workReps}
          onToggleChange={(value) => onSettingsChange('workReps', value)}
        />

        <TimerControllerRow
          name="Rest"
          value={settings.rest}
          onValueChange={(value) => onSettingsChange('rest', value)}
          hasToggle={true}
          isToggleOn={settings.restReps}
          onToggleChange={(value) => onSettingsChange('restReps', value)}
        />

        <TimerControllerRow
          name="Sets"
          value={settings.sets.toString()}
          onValueChange={(value) =>
            onSettingsChange('sets', parseInt(value) || 0)
          }
          isNumberInput={true}
        />

        <TimerControllerRow
          name="Cycles"
          value={settings.cycles.toString()}
          onValueChange={(value) =>
            onSettingsChange('cycles', parseInt(value) || 0)
          }
          isNumberInput={true}
        />

        <TimerControllerRow
          name="Cycle Rest"
          value={settings.cycleRest}
          onValueChange={(value) => onSettingsChange('cycleRest', value)}
        />
      </div>

      <div className="scroll-indicator">
        <div className="scroll-track"></div>
        <div className="scroll-thumb"></div>
      </div>
    </div>
  )
}
