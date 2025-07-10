import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Logo from '../components/Logo/Logo'

describe('Logo', () => {
  it('should render logo component', () => {
    const { container } = render(<Logo />)

    const logo = container.querySelector('div')
    expect(logo).toBeInTheDocument()
  })

  it('should have correct CSS class', () => {
    const { container } = render(<Logo />)

    const logo = container.querySelector('div')
    expect(logo).toHaveClass('p-2')
  })

  it('should render without throwing', () => {
    const { container } = render(<Logo />)

    expect(container).toBeInTheDocument()
  })
})
