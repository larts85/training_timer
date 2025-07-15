import { render, screen, fireEvent } from '@testing-library/react'
import { Message } from '../../components/Dashboard/Message'

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

describe('Message', () => {
  const defaultProps = {
    text: 'This is a test message',
    onClose: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render message with text and close button', () => {
    render(<Message {...defaultProps} />)

    expect(screen.getByText('This is a test message')).toBeInTheDocument()

    const closeButton = screen.getByRole('button', { name: 'Close message' })
    expect(closeButton).toBeInTheDocument()

    const closeIcon = screen.getByAltText('Close')
    expect(closeIcon).toBeInTheDocument()
    expect(closeIcon).toHaveAttribute('src', '/icons/close-icon.svg')
    expect(closeIcon).toHaveAttribute('width', '20')
    expect(closeIcon).toHaveAttribute('height', '18')
  })

  it('should call onClose when close button is clicked', () => {
    const mockOnClose = jest.fn()

    render(<Message {...defaultProps} onClose={mockOnClose} />)

    const closeButton = screen.getByRole('button', { name: 'Close message' })
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should not render checkbox section when showDontShowAgain is false', () => {
    render(<Message {...defaultProps} showDontShowAgain={false} />)

    expect(screen.queryByText("Don't show again.")).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: "Don't show again checkbox" }),
    ).not.toBeInTheDocument()
  })

  it('should not render checkbox section when showDontShowAgain is not provided (default false)', () => {
    render(<Message {...defaultProps} />)

    expect(screen.queryByText("Don't show again.")).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: "Don't show again checkbox" }),
    ).not.toBeInTheDocument()
  })

  it('should render checkbox section when showDontShowAgain is true', () => {
    render(<Message {...defaultProps} showDontShowAgain={true} />)

    expect(screen.getByText("Don't show again.")).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: "Don't show again checkbox" }),
    ).toBeInTheDocument()
  })

  it('should render unchecked checkbox by default', () => {
    render(<Message {...defaultProps} showDontShowAgain={true} />)

    const checkboxButton = screen.getByRole('button', {
      name: "Don't show again checkbox",
    })
    expect(checkboxButton).not.toHaveClass('checked')
    expect(screen.queryByText('✔')).not.toBeInTheDocument()
  })

  it('should render unchecked checkbox when isDontShowAgainChecked is false', () => {
    render(
      <Message
        {...defaultProps}
        showDontShowAgain={true}
        isDontShowAgainChecked={false}
      />,
    )

    const checkboxButton = screen.getByRole('button', {
      name: "Don't show again checkbox",
    })
    expect(checkboxButton).not.toHaveClass('checked')
    expect(screen.queryByText('✔')).not.toBeInTheDocument()
  })

  it('should render checked checkbox when isDontShowAgainChecked is true', () => {
    render(
      <Message
        {...defaultProps}
        showDontShowAgain={true}
        isDontShowAgainChecked={true}
      />,
    )

    const checkboxButton = screen.getByRole('button', {
      name: "Don't show again checkbox",
    })
    expect(checkboxButton).toHaveClass('checked')
    expect(screen.getByText('✔')).toBeInTheDocument()
  })

  it('should call onDontShowAgainChange with opposite value when checkbox is clicked', () => {
    const mockOnDontShowAgainChange = jest.fn()

    render(
      <Message
        {...defaultProps}
        showDontShowAgain={true}
        isDontShowAgainChecked={false}
        onDontShowAgainChange={mockOnDontShowAgainChange}
      />,
    )

    const checkboxButton = screen.getByRole('button', {
      name: "Don't show again checkbox",
    })
    fireEvent.click(checkboxButton)

    expect(mockOnDontShowAgainChange).toHaveBeenCalledWith(true)
  })

  it('should call onDontShowAgainChange with false when checked checkbox is clicked', () => {
    const mockOnDontShowAgainChange = jest.fn()

    render(
      <Message
        {...defaultProps}
        showDontShowAgain={true}
        isDontShowAgainChecked={true}
        onDontShowAgainChange={mockOnDontShowAgainChange}
      />,
    )

    const checkboxButton = screen.getByRole('button', {
      name: "Don't show again checkbox",
    })
    fireEvent.click(checkboxButton)

    expect(mockOnDontShowAgainChange).toHaveBeenCalledWith(false)
  })

  it('should not call onDontShowAgainChange when no callback is provided', () => {
    // This test ensures no error occurs when onDontShowAgainChange is undefined
    expect(() => {
      render(
        <Message
          {...defaultProps}
          showDontShowAgain={true}
          isDontShowAgainChecked={false}
        />,
      )

      const checkboxButton = screen.getByRole('button', {
        name: "Don't show again checkbox",
      })
      fireEvent.click(checkboxButton)
    }).not.toThrow()
  })

  it('should have correct CSS classes and structure', () => {
    render(
      <Message
        {...defaultProps}
        showDontShowAgain={true}
        isDontShowAgainChecked={true}
      />,
    )

    expect(document.querySelector('.message-overlay')).toBeInTheDocument()
    expect(document.querySelector('.message-container')).toBeInTheDocument()
    expect(document.querySelector('.message-background')).toBeInTheDocument()
    expect(
      document.querySelector('.message-text-background'),
    ).toBeInTheDocument()
    expect(document.querySelector('.message-text')).toBeInTheDocument()
    expect(document.querySelector('.message-close-button')).toBeInTheDocument()
    expect(
      document.querySelector('.message-checkbox-section'),
    ).toBeInTheDocument()
    expect(document.querySelector('.message-checkbox')).toBeInTheDocument()
    expect(document.querySelector('.checkbox-button')).toBeInTheDocument()
    expect(document.querySelector('.checkbox-background')).toBeInTheDocument()
    expect(document.querySelector('.checkbox-check')).toBeInTheDocument()
    expect(document.querySelector('.message-checkbox-text')).toBeInTheDocument()
  })

  it('should render different message text correctly', () => {
    render(<Message {...defaultProps} text="Custom message text here" />)

    expect(screen.getByText('Custom message text here')).toBeInTheDocument()
    expect(screen.queryByText('This is a test message')).not.toBeInTheDocument()
  })

  it('should handle multiple close button clicks', () => {
    const mockOnClose = jest.fn()

    render(<Message {...defaultProps} onClose={mockOnClose} />)

    const closeButton = screen.getByRole('button', { name: 'Close message' })

    fireEvent.click(closeButton)
    fireEvent.click(closeButton)
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(3)
  })

  it('should handle multiple checkbox clicks', () => {
    const mockOnDontShowAgainChange = jest.fn()

    render(
      <Message
        {...defaultProps}
        showDontShowAgain={true}
        isDontShowAgainChecked={false}
        onDontShowAgainChange={mockOnDontShowAgainChange}
      />,
    )

    const checkboxButton = screen.getByRole('button', {
      name: "Don't show again checkbox",
    })

    fireEvent.click(checkboxButton)
    fireEvent.click(checkboxButton)
    fireEvent.click(checkboxButton)

    expect(mockOnDontShowAgainChange).toHaveBeenCalledTimes(3)
    expect(mockOnDontShowAgainChange).toHaveBeenNthCalledWith(1, true)
    expect(mockOnDontShowAgainChange).toHaveBeenNthCalledWith(2, true)
    expect(mockOnDontShowAgainChange).toHaveBeenNthCalledWith(3, true)
  })
})
