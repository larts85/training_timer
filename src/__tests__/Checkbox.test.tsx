import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Checkbox from '../components/CheckBox/Checkbox'

describe('Checkbox', () => {
  it('should render checkbox', () => {
    render(<Checkbox selected={false} handleChange={() => {}} />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('should be checked when selected prop is true', () => {
    render(<Checkbox selected={true} handleChange={() => {}} />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('should be unchecked when selected prop is false', () => {
    render(<Checkbox selected={false} handleChange={() => {}} />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('should call handleChange when clicked', () => {
    const mockHandleChange = jest.fn()

    render(<Checkbox selected={false} handleChange={mockHandleChange} />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(mockHandleChange).toHaveBeenCalledTimes(1)
  })

  it('should render within a label element', () => {
    render(<Checkbox selected={false} handleChange={() => {}} />)

    const label = screen.getByRole('checkbox').closest('label')
    expect(label).toBeInTheDocument()
  })
})
