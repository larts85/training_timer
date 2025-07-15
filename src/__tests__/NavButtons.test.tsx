import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavButtons from '../components/Footer/NavButtons'

describe('NavButtons Component', () => {
  it('should render all navigation items', () => {
    render(<NavButtons />)

    expect(screen.getByText('Timer')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Subtract')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('should render with correct links', () => {
    render(<NavButtons />)

    const timerLink = screen.getByRole('link', { name: 'Go to timer' })
    const settingsLink = screen.getByRole('link', { name: 'Go to settings' })
    const subtractLink = screen.getByRole('link', { name: 'Subtract time' })
    const aboutLink = screen.getByRole('link', { name: 'About this app' })

    expect(timerLink).toHaveAttribute('href', '/')
    expect(settingsLink).toHaveAttribute('href', '/settings')
    expect(subtractLink).toHaveAttribute('href', '/subtract')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('should have proper accessibility attributes', () => {
    render(<NavButtons />)

    const timerLink = screen.getByRole('link', { name: 'Go to timer' })
    const settingsLink = screen.getByRole('link', { name: 'Go to settings' })
    const subtractLink = screen.getByRole('link', { name: 'Subtract time' })
    const aboutLink = screen.getByRole('link', { name: 'About this app' })

    expect(timerLink).toHaveAttribute('aria-label', 'Go to timer')
    expect(settingsLink).toHaveAttribute('aria-label', 'Go to settings')
    expect(subtractLink).toHaveAttribute('aria-label', 'Subtract time')
    expect(aboutLink).toHaveAttribute('aria-label', 'About this app')
  })

  it('should render with light color mode styling', () => {
    render(<NavButtons colorMode="light" />)

    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveClass('text-gray-600', 'hover:text-gray-900')
    })
  })

  it('should render with dark color mode styling', () => {
    render(<NavButtons colorMode="dark" />)

    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveClass('text-white', 'hover:text-gray-300')
    })
  })

  it('should apply custom className', () => {
    const customClass = 'custom-nav-class'
    const { container } = render(<NavButtons className={customClass} />)

    const nav = container.querySelector('nav')
    expect(nav).toHaveClass(customClass)
  })

  it('should have proper navigation structure', () => {
    const { container } = render(<NavButtons />)

    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('flex', 'gap-6')
  })

  it('should render SVG icons', () => {
    const { container } = render(<NavButtons />)

    const svgs = container.querySelectorAll('svg')
    expect(svgs).toHaveLength(4) // One for each navigation item

    svgs.forEach((svg) => {
      expect(svg).toHaveClass('w-6', 'h-6')
    })
  })

  it('should have correct link styling', () => {
    render(<NavButtons />)

    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveClass(
        'flex',
        'flex-col',
        'items-center',
        'gap-1',
        'p-2',
        'rounded-lg',
        'transition-colors',
      )
    })
  })

  it('should render text labels with correct styling', () => {
    const { container } = render(<NavButtons />)

    const textLabels = container.querySelectorAll('span')
    expect(textLabels).toHaveLength(4)

    textLabels.forEach((span) => {
      expect(span).toHaveClass('text-xs')
    })
  })

  it('should have correct displayName', () => {
    expect(NavButtons.displayName).toBe('NavButtons')
  })

  it('should render with default light color mode when no colorMode provided', () => {
    render(<NavButtons />)

    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveClass('text-gray-600', 'hover:text-gray-900')
    })
  })
})
