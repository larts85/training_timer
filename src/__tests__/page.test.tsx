import { render, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage, { generateMetadata } from '../app/[locale]/page'

// Mock timers to avoid waiting for SplashScreen
jest.useFakeTimers()

// Mock the translations utility
jest.mock('@/utils/translations', () => ({
  getTranslations: jest.fn().mockResolvedValue({
    home: {
      pageTitle: 'Test Title',
      metaDescription: 'Test Description',
      greeting: 'Test Greeting',
    },
  }),
  getStaticTranslations: jest.fn().mockReturnValue({
    navLinks: {
      home: 'Home',
      anchorTitle: 'Anchor Title',
    },
  }),
}))

describe('HomePage', () => {
  const mockParams = Promise.resolve({ locale: 'en-US' })

  beforeEach(() => {
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
  })

  it('should render header and main content after splash screen', async () => {
    const PageComponent = await HomePage({ params: mockParams })

    const { getByRole } = render(PageComponent)

    // Fast-forward through the splash screen timer
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    await waitFor(() => {
      expect(getByRole('banner')).toBeInTheDocument()
    })

    expect(getByRole('main')).toBeInTheDocument()
  })

  it('should generate metadata correctly', async () => {
    const metadata = await generateMetadata({ params: mockParams })

    expect(metadata.title).toBe('Test Title')
    expect(metadata.description).toBe('Test Description')
  })
})
