'use client'

import React from 'react'
import Link from 'next/link'
// Simple SVG icons as components
const TimerIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const SettingsIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
)

const RemoveIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 12H4"
    />
  </svg>
)

const InfoIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

interface NavButtonsProps {
  colorMode?: 'light' | 'dark'
  className?: string
}

const NavButtons: React.FC<NavButtonsProps> = ({
  colorMode = 'light',
  className = '',
}) => {
  const iconClasses =
    colorMode === 'dark'
      ? 'text-white hover:text-gray-300'
      : 'text-gray-600 hover:text-gray-900'

  const navItems = [
    {
      href: '/',
      icon: TimerIcon,
      label: 'Timer',
      ariaLabel: 'Go to timer',
    },
    {
      href: '/settings',
      icon: SettingsIcon,
      label: 'Settings',
      ariaLabel: 'Go to settings',
    },
    {
      href: '/subtract',
      icon: RemoveIcon,
      label: 'Subtract',
      ariaLabel: 'Subtract time',
    },
    {
      href: '/about',
      icon: InfoIcon,
      label: 'About',
      ariaLabel: 'About this app',
    },
  ]

  return (
    <nav className={`flex gap-6 ${className}`}>
      {navItems.map((item) => {
        const IconComponent = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${iconClasses}`}
            aria-label={item.ariaLabel}
          >
            <IconComponent />
            <span className="text-xs">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

NavButtons.displayName = 'NavButtons'

export default NavButtons
