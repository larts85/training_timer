import { render, screen, fireEvent } from '@testing-library/react'
import { TimerMenu } from '../../components/Dashboard/TimerMenu'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    width,
    height,
    ...props
  }: {
    src: string
    alt: string
    width: number
    height: number
    [key: string]: unknown
  }) {
    return <img src={src} alt={alt} width={width} height={height} {...props} />
  }
})

type ViewType = 'timer' | 'timerSettings' | 'generalSettings' | 'about'

describe('TimerMenu', () => {
  const defaultProps = {
    activeItem: 'timer' as ViewType,
    onItemClick: jest.fn(),
    onClose: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render all menu items', () => {
    render(<TimerMenu {...defaultProps} />)

    expect(screen.getByText('Timer')).toBeInTheDocument()
    expect(screen.getByText('Timer Settings')).toBeInTheDocument()
    expect(screen.getByText('General Settings')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('should render close button with correct icon', () => {
    render(<TimerMenu {...defaultProps} />)

    const closeButton = screen.getByRole('button', { name: 'Close menu' })
    expect(closeButton).toBeInTheDocument()

    const closeIcon = screen.getByAltText('Close')
    expect(closeIcon).toBeInTheDocument()
    expect(closeIcon).toHaveAttribute('src', '/icons/close-icon.svg')
    expect(closeIcon).toHaveAttribute('width', '23')
    expect(closeIcon).toHaveAttribute('height', '20')
  })

  it('should call onClose when close button is clicked', () => {
    const mockOnClose = jest.fn()

    render(<TimerMenu {...defaultProps} onClose={mockOnClose} />)

    const closeButton = screen.getByRole('button', { name: 'Close menu' })
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should highlight active item (timer)', () => {
    render(<TimerMenu {...defaultProps} activeItem="timer" />)

    const timerItem = screen.getByText('Timer').parentElement
    expect(timerItem).toHaveClass('menu-item', 'active')

    const timerSettingsItem = screen.getByText('Timer Settings').parentElement
    expect(timerSettingsItem).toHaveClass('menu-item')
    expect(timerSettingsItem).not.toHaveClass('active')
  })

  it('should highlight active item (timerSettings)', () => {
    render(<TimerMenu {...defaultProps} activeItem="timerSettings" />)

    const timerItem = screen.getByText('Timer').parentElement
    expect(timerItem).toHaveClass('menu-item')
    expect(timerItem).not.toHaveClass('active')

    const timerSettingsItem = screen.getByText('Timer Settings').parentElement
    expect(timerSettingsItem).toHaveClass('menu-item', 'active')
  })

  it('should highlight active item (generalSettings)', () => {
    render(<TimerMenu {...defaultProps} activeItem="generalSettings" />)

    const generalSettingsItem =
      screen.getByText('General Settings').parentElement
    expect(generalSettingsItem).toHaveClass('menu-item', 'active')

    const aboutItem = screen.getByText('About').parentElement
    expect(aboutItem).toHaveClass('menu-item')
    expect(aboutItem).not.toHaveClass('active')
  })

  it('should highlight active item (about)', () => {
    render(<TimerMenu {...defaultProps} activeItem="about" />)

    const aboutItem = screen.getByText('About').parentElement
    expect(aboutItem).toHaveClass('menu-item', 'active')

    const timerItem = screen.getByText('Timer').parentElement
    expect(timerItem).toHaveClass('menu-item')
    expect(timerItem).not.toHaveClass('active')
  })

  it('should render background only for active item', () => {
    render(<TimerMenu {...defaultProps} activeItem="timer" />)

    // Check that active item has background
    const timerItem = screen.getByText('Timer').parentElement
    const background = timerItem?.querySelector('.menu-item-background')
    expect(background).toBeInTheDocument()

    // Check that other items don't have background
    const timerSettingsItem = screen.getByText('Timer Settings').parentElement
    const settingsBackground = timerSettingsItem?.querySelector(
      '.menu-item-background',
    )
    expect(settingsBackground).not.toBeInTheDocument()
  })

  it('should call onItemClick with correct item when Timer is clicked', () => {
    const mockOnItemClick = jest.fn()

    render(<TimerMenu {...defaultProps} onItemClick={mockOnItemClick} />)

    const timerItem = screen.getByText('Timer').parentElement
    if (timerItem) {
      fireEvent.click(timerItem)
    }

    expect(mockOnItemClick).toHaveBeenCalledWith('timer')
    expect(mockOnItemClick).toHaveBeenCalledTimes(1)
  })

  it('should call onItemClick with correct item when Timer Settings is clicked', () => {
    const mockOnItemClick = jest.fn()

    render(<TimerMenu {...defaultProps} onItemClick={mockOnItemClick} />)

    const timerSettingsItem = screen.getByText('Timer Settings').parentElement
    if (timerSettingsItem) {
      fireEvent.click(timerSettingsItem)
    }

    expect(mockOnItemClick).toHaveBeenCalledWith('timerSettings')
    expect(mockOnItemClick).toHaveBeenCalledTimes(1)
  })

  it('should call onItemClick with correct item when General Settings is clicked', () => {
    const mockOnItemClick = jest.fn()

    render(<TimerMenu {...defaultProps} onItemClick={mockOnItemClick} />)

    const generalSettingsItem =
      screen.getByText('General Settings').parentElement
    if (generalSettingsItem) {
      fireEvent.click(generalSettingsItem)
    }

    expect(mockOnItemClick).toHaveBeenCalledWith('generalSettings')
    expect(mockOnItemClick).toHaveBeenCalledTimes(1)
  })

  it('should call onItemClick with correct item when About is clicked', () => {
    const mockOnItemClick = jest.fn()

    render(<TimerMenu {...defaultProps} onItemClick={mockOnItemClick} />)

    const aboutItem = screen.getByText('About').parentElement
    if (aboutItem) {
      fireEvent.click(aboutItem)
    }

    expect(mockOnItemClick).toHaveBeenCalledWith('about')
    expect(mockOnItemClick).toHaveBeenCalledTimes(1)
  })

  it('should have correct CSS classes and structure', () => {
    render(<TimerMenu {...defaultProps} activeItem="timer" />)

    expect(document.querySelector('.timer-menu')).toBeInTheDocument()
    expect(document.querySelector('.menu-items')).toBeInTheDocument()
    expect(document.querySelector('.menu-close-button')).toBeInTheDocument()

    const menuItems = document.querySelectorAll('.menu-item')
    expect(menuItems).toHaveLength(4)

    const menuItemTexts = document.querySelectorAll('.menu-item-text')
    expect(menuItemTexts).toHaveLength(4)

    // Only active item should have background
    const backgrounds = document.querySelectorAll('.menu-item-background')
    expect(backgrounds).toHaveLength(1)
  })

  it('should handle multiple clicks on different items', () => {
    const mockOnItemClick = jest.fn()

    render(<TimerMenu {...defaultProps} onItemClick={mockOnItemClick} />)

    const timerItem = screen.getByText('Timer').parentElement
    const aboutItem = screen.getByText('About').parentElement

    if (timerItem) fireEvent.click(timerItem)
    if (aboutItem) fireEvent.click(aboutItem)
    if (timerItem) fireEvent.click(timerItem)

    expect(mockOnItemClick).toHaveBeenCalledTimes(3)
    expect(mockOnItemClick).toHaveBeenNthCalledWith(1, 'timer')
    expect(mockOnItemClick).toHaveBeenNthCalledWith(2, 'about')
    expect(mockOnItemClick).toHaveBeenNthCalledWith(3, 'timer')
  })

  it('should handle multiple close button clicks', () => {
    const mockOnClose = jest.fn()

    render(<TimerMenu {...defaultProps} onClose={mockOnClose} />)

    const closeButton = screen.getByRole('button', { name: 'Close menu' })

    fireEvent.click(closeButton)
    fireEvent.click(closeButton)
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(3)
  })
})
