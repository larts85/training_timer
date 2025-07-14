import React from 'react'
import Image from 'next/image'

interface MessageProps {
  text: string
  showDontShowAgain?: boolean
  isDontShowAgainChecked?: boolean
  onClose: () => void
  onDontShowAgainChange?: (checked: boolean) => void
}

export const Message: React.FC<MessageProps> = ({
  text,
  showDontShowAgain = false,
  isDontShowAgainChecked = false,
  onClose,
  onDontShowAgainChange,
}) => {
  const handleCheckboxChange = () => {
    if (onDontShowAgainChange) {
      onDontShowAgainChange(!isDontShowAgainChecked)
    }
  }

  return (
    <div className="message-overlay">
      <div className="message-container">
        <div className="message-background"></div>

        <div className="message-text-background"></div>
        <div className="message-text">{text}</div>

        <button
          className="message-close-button"
          onClick={onClose}
          aria-label="Close message"
        >
          <Image
            src="/icons/close-icon.svg"
            alt="Close"
            width={20}
            height={18}
          />
        </button>

        {showDontShowAgain && (
          <div className="message-checkbox-section">
            <div className="message-checkbox">
              <button
                className={`checkbox-button ${isDontShowAgainChecked ? 'checked' : ''}`}
                onClick={handleCheckboxChange}
                aria-label="Don't show again checkbox"
              >
                <div className="checkbox-background"></div>
                {isDontShowAgainChecked && (
                  <div className="checkbox-check">✔</div>
                )}
              </button>
            </div>
            <div className="message-checkbox-text">Don&apos;t show again.</div>
          </div>
        )}
      </div>
    </div>
  )
}
