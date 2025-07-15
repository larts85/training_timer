import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import RootLayout from '../app/layout'

describe('RootLayout', () => {
  it('should render without throwing', () => {
    // Suppress hydration warnings for this test since we're testing a Next.js layout
    // that includes html/body tags which conflicts with the test environment
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(
        <RootLayout>
          <div data-testid="child-content">Test content</div>
        </RootLayout>,
      )
    }).not.toThrow()

    consoleSpy.mockRestore()
  })

  it('should be a function component', () => {
    expect(typeof RootLayout).toBe('function')
  })
})
