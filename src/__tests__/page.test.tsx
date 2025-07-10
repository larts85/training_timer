import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage, { generateMetadata } from '../app/[locale]/page'

// Mock the components
jest.mock('@/components/Header/Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>
  }
})

jest.mock('@/components/Button/Button', () => {
  return function MockButton() {
    return <div data-testid="button">Button</div>
  }
})

// Mock the translations utility
jest.mock('@/utils/translations', () => ({
  getTranslations: jest.fn().mockResolvedValue({
    home: {
      pageTitle: 'Test Title',
      metaDescription: 'Test Description',
      greeting: 'Test Greeting',
    },
  }),
}))

describe('HomePage', () => {
  const mockParams = Promise.resolve({ locale: 'en-US' })

  it('should render header and main content', async () => {
    const PageComponent = await HomePage({ params: mockParams })

    const { getByTestId } = render(PageComponent)

    expect(getByTestId('header')).toBeInTheDocument()
    expect(getByTestId('button')).toBeInTheDocument()
  })

  it('should generate metadata correctly', async () => {
    const metadata = await generateMetadata({ params: mockParams })

    expect(metadata.title).toBe('Test Title')
    expect(metadata.description).toBe('Test Description')
  })
})
