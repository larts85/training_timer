import React from 'react'
import Image from 'next/image'

interface TimerActionsProps {
  isPlaying: boolean
  onPlayPause: () => void
  onStop: () => void
  onNext: () => void
  onPrevious: () => void
}

export const TimerActions: React.FC<TimerActionsProps> = ({
  isPlaying,
  onPlayPause,
  onStop,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="timer-actions">
      {/* Primera fila: Play/Pause */}
      <div className="actions-row actions-row-top">
        <button
          className="action-button play-pause-button"
          onClick={onPlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Image
              src="/icons/pause-large.svg"
              alt="Pause"
              width={75}
              height={75}
            />
          ) : (
            <Image
              src="/icons/play-action.svg"
              alt="Play"
              width={65}
              height={65}
            />
          )}
        </button>
      </div>

      {/* Segunda fila: Previous, Stop, Next */}
      <div className="actions-row actions-row-bottom">
        <button
          className="action-button previous-button"
          onClick={onPrevious}
          aria-label="Previous"
        >
          <Image
            src="/icons/prev-action.svg"
            alt="Previous"
            width={26}
            height={26}
          />
        </button>

        <button
          className="action-button stop-button"
          onClick={onStop}
          aria-label="Stop"
        >
          <Image
            src="/icons/stop-action.svg"
            alt="Stop"
            width={36}
            height={36}
          />
        </button>

        <button
          className="action-button next-button"
          onClick={onNext}
          aria-label="Next"
        >
          <Image
            src="/icons/next-action.svg"
            alt="Next"
            width={26}
            height={26}
          />
        </button>
      </div>
    </div>
  )
}
