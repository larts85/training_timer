import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../app/[locale]/page'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/es-AR',
}))

describe('HomePage', () => {
  it('renders a heading with English locale', async () => {
    const params = { locale: 'en-US' }

    // Since HomePage is now async, we need to render it properly
    const HomePageComponent = await HomePage({ params })

    render(HomePageComponent)

    const heading = screen.getByRole('heading', {
      name: /Hello world/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders a heading with Spanish locale', async () => {
    const params = { locale: 'es-AR' }

    const HomePageComponent = await HomePage({ params })

    render(HomePageComponent)

    const heading = screen.getByRole('heading', {
      name: /hola mundo/i,
    })
    expect(heading).toBeInTheDocument()
  })
})
