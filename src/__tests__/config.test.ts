import { Envs } from '../utils/config'

describe('Config', () => {
  it('should export Envs object', () => {
    expect(Envs).toBeDefined()
    expect(typeof Envs).toBe('object')
  })

  it('should have NODE_ENV property', () => {
    expect(Envs).toHaveProperty('NODE_ENV')
  })

  it('should have GITHUB_STEP_SUMMARY property', () => {
    expect(Envs).toHaveProperty('GITHUB_STEP_SUMMARY')
  })

  it('should have valid NODE_ENV value', () => {
    expect(typeof Envs.NODE_ENV).toBe('string')
  })
})
