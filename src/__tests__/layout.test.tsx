import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import RootLayout from '../app/layout'

describe('RootLayout', () => {
  it('should render without throwing', () => {
    expect(() => {
      render(
        <RootLayout>
          <div data-testid="child-content">Test content</div>
        </RootLayout>,
      )
    }).not.toThrow()
  })

  it('should be a function component', () => {
    expect(typeof RootLayout).toBe('function')
  })
})
