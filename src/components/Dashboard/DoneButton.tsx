import React from 'react'

interface DoneButtonProps {
  onClick: () => void
}

export const DoneButton: React.FC<DoneButtonProps> = ({ onClick }) => {
  return (
    <div className="done-button-container">
      <button className="done-button" onClick={onClick} aria-label="Done">
        Done
      </button>
    </div>
  )
}
