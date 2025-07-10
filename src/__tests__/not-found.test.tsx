import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NotFound from '../app/not-found'

describe('NotFound', () => {
  it('should render not found message', () => {
    render(<NotFound />)

    const heading = screen.getByText('Page Not Found')
    expect(heading).toBeInTheDocument()
  })

  it('should render without throwing', () => {
    const { container } = render(<NotFound />)

    expect(container).toBeInTheDocument()
  })
})
