import React from 'react'
import Image from 'next/image'
import { TimerControllerRowProps } from '@/types/dashboard.types'

export const TimerControllerRow: React.FC<TimerControllerRowProps> = ({
  name,
  value,
  onValueChange,
  hasToggle = false,
  isToggleOn = false,
  onToggleChange,
  isNumberInput = false,
}) => {
  const handleIncrement = () => {
    if (isNumberInput) {
      const numValue = parseInt(value) || 0
      onValueChange((numValue + 1).toString())
    } else {
      // Handle time increment logic here
      // For now, just placeholder
      onValueChange(value)
    }
  }

  const handleDecrement = () => {
    if (isNumberInput) {
      const numValue = parseInt(value) || 0
      if (numValue > 0) {
        onValueChange((numValue - 1).toString())
      }
    } else {
      // Handle time decrement logic here
      // For now, just placeholder
      onValueChange(value)
    }
  }

  const handleToggle = () => {
    if (onToggleChange) {
      onToggleChange(!isToggleOn)
    }
  }

  return (
    <div className="timer-controller-row">
      <div className="row-divider"></div>

      <div className="button-container">
        <button
          className="increment-button"
          onClick={handleIncrement}
          aria-label={`Increment ${name}`}
        >
          <Image src="/icons/plus-icon.svg" alt="Plus" width={14} height={8} />
        </button>

        <div className="button-separator"></div>

        <button
          className="decrement-button"
          onClick={handleDecrement}
          aria-label={`Decrement ${name}`}
        >
          <Image
            src="/icons/minus-icon.svg"
            alt="Minus"
            width={14}
            height={8}
          />
        </button>
      </div>

      <div className="row-input">
        <div className="input-container">
          <div className="input-background"></div>
          <div className="input-value">{value}</div>
        </div>
      </div>

      <div className="row-name">{name}</div>

      {hasToggle && (
        <div className="row-toggle">
          <button
            className={`toggle-button ${isToggleOn ? 'active' : ''}`}
            onClick={handleToggle}
            aria-label={`Toggle ${name} reps mode`}
          >
            <div className="toggle-handle"></div>
            {isToggleOn && (
              <div className="toggle-icon">
                <Image
                  src="/icons/reps-icon.svg"
                  alt="Reps"
                  width={14}
                  height={14}
                />
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
