import React from 'react'
import Image from 'next/image'

type ViewType = 'timer' | 'timerSettings' | 'generalSettings' | 'about'

interface TimerMenuProps {
  activeItem: ViewType
  onItemClick: (item: ViewType) => void
  onClose: () => void
}

export const TimerMenu: React.FC<TimerMenuProps> = ({
  activeItem,
  onItemClick,
  onClose,
}) => {
  const menuItems: Array<{ id: ViewType; label: string }> = [
    { id: 'timer', label: 'Timer' },
    { id: 'timerSettings', label: 'Timer Settings' },
    { id: 'generalSettings', label: 'General Settings' },
    { id: 'about', label: 'About' },
  ]

  return (
    <div className="timer-menu">
      <div className="menu-items">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onItemClick(item.id)}
          >
            {activeItem === item.id && (
              <div className="menu-item-background"></div>
            )}
            <span className="menu-item-text">{item.label}</span>
          </div>
        ))}
      </div>

      <button
        className="menu-close-button"
        onClick={onClose}
        aria-label="Close menu"
      >
        <Image src="/icons/close-icon.svg" alt="Close" width={23} height={20} />
      </button>
    </div>
  )
}
