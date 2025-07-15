import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../components/Button/Button'
import { ButtonProps } from '../components/Button/button.types'

// Mock props for testing
const defaultProps: ButtonProps = {
  cta: 'Click me',
  className: 'test-button',
}

describe('Button Component', () => {
  it('should render button with correct text and className', () => {
    render(<Button {...defaultProps} />)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('test-button')
    expect(button).toHaveTextContent('Click me')
  })

  it('should render button as enabled by default', () => {
    render(<Button {...defaultProps} />)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).not.toBeDisabled()
  })

  it('should render button as disabled when isDisable is true', () => {
    render(<Button {...defaultProps} isDisable={true} />)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeDisabled()
  })

  it('should render button as enabled when isDisable is false', () => {
    render(<Button {...defaultProps} isDisable={false} />)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).not.toBeDisabled()
  })

  it('should accept onChange prop without errors', () => {
    const mockOnChange = jest.fn()

    // Test that component renders without errors when onChange is provided
    expect(() => {
      render(<Button {...defaultProps} onChange={mockOnChange} />)
    }).not.toThrow()

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
  })

  it('should not call onChange when no onChange prop is provided', () => {
    // This test ensures no errors occur when onChange is undefined
    expect(() => {
      render(<Button {...defaultProps} />)
      const button = screen.getByRole('button', { name: 'Click me' })
      fireEvent.change(button, { target: { value: 'test' } })
    }).not.toThrow()
  })

  it('should render with custom cta text', () => {
    render(<Button {...defaultProps} cta="Custom Text" />)

    const button = screen.getByRole('button', { name: 'Custom Text' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Custom Text')
  })

  it('should render with custom className', () => {
    render(<Button {...defaultProps} className="custom-class another-class" />)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toHaveClass('custom-class', 'another-class')
  })

  it('should have correct displayName', () => {
    expect(Button.displayName).toBe('Button')
  })

  it('should render with all props combined', () => {
    const mockOnChange = jest.fn()

    render(
      <Button
        cta="Submit Form"
        className="primary-button large"
        isDisable={true}
        onChange={mockOnChange}
      />,
    )

    const button = screen.getByRole('button', { name: 'Submit Form' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Submit Form')
    expect(button).toHaveClass('primary-button', 'large')
    expect(button).toBeDisabled()

    // Verify that onChange prop is accepted without errors
    // Note: onChange events on buttons don't work the same as input elements
    expect(typeof mockOnChange).toBe('function')
  })
})
