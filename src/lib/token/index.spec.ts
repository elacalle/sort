import { describe, test, expect } from 'vitest'
import Token from '.'

describe('Token', () => {
  describe('lowerThan', () => {
    test('source token greater than target token', () => {
      const sourceToken = new Token([1])
      const targetToken = new Token([1, 2])

      expect(sourceToken.lowerThan(targetToken)).toBe(true)
    })

    test('source token greater than target token', () => {
      const sourceToken = new Token([4, 2])
      const targetToken = new Token([4, 1])

      expect(sourceToken.lowerThan(targetToken)).toBe(false)
    })

    test('source token is lower than target token', () => {
      const sourceToken = new Token([4, 11, 0])
      const targetToken = new Token([5])

      expect(sourceToken.lowerThan(targetToken)).toBe(true)
    })

    test('source token is greather than target token', () => {
      const sourceToken = new Token([5])
      const targetToken = new Token([4, 10])

      expect(sourceToken.lowerThan(targetToken)).toBe(false)
    })

    test('source token is greather than target token', () => {
      const sourceToken = new Token([5, 1])
      const targetToken = new Token([4, 10])

      expect(sourceToken.lowerThan(targetToken)).toBe(false)
    })

    test('source token is greater than target token', () => {
      const sourceToken = new Token([4, 1, 70])
      const targetToken = new Token([4, 1, 0])

      expect(sourceToken.lowerThan(targetToken)).toBe(false)
    })

    test('source token is lower than target token', () => {
      const sourceToken = new Token([4, 1, 70, 1])
      const targetToken = new Token([4, 1, 70])

      expect(sourceToken.lowerThan(targetToken)).toBe(false)
    })
  })

  describe('greatherThan', () => {
    test('source token greater than target token', () => {
      const sourceToken = new Token([4, 2])
      const targetToken = new Token([4, 1])

      expect(sourceToken.greatherThan(targetToken)).toBe(true)
    })

    test('source token is lower than target token', () => {
      const sourceToken = new Token([4, 0])
      const targetToken = new Token([4, 1])

      expect(sourceToken.greatherThan(targetToken)).toBe(false)
    })

    test('source token is lower than target token', () => {
      const sourceToken = new Token([4, 0])
      const targetToken = new Token([4, 1])

      expect(sourceToken.greatherThan(targetToken)).toBe(false)
    })

    test('source token is greather than target token', () => {
      const sourceToken = new Token([5])
      const targetToken = new Token([4, 10])

      expect(sourceToken.greatherThan(targetToken)).toBe(true)
    })

    test('source token is lower than target token', () => {
      const sourceToken = new Token([4, 1])
      const targetToken = new Token([4, 1, 70, 1])

      expect(sourceToken.greatherThan(targetToken)).toBe(false)
    })
  })

  describe('equal', () => {
    test('same numbers in the same position', () => {
      const sourceToken = new Token([4, 1, 70])
      const targetToken = new Token([4, 1, 70])

      expect(sourceToken.equal(targetToken)).toBe(true)
    })

    test('same numbers in the different position', () => {
      const sourceToken = new Token([1, 4, 70])
      const targetToken = new Token([4, 1, 70])

      expect(sourceToken.equal(targetToken)).toBe(false)
    })
  })

  describe('lowerThanOrEqual', () => {
    test('source token is lower than target token', () => {
      const sourceToken = new Token([4, 11, 0])
      const targetToken = new Token([5])

      expect(sourceToken.lowerThanOrEqual(targetToken)).toBe(true)
    })

    test('source token is equal to target token', () => {
      const sourceToken = new Token([4, 0])
      const targetToken = new Token([4, 0])

      expect(sourceToken.lowerThanOrEqual(targetToken)).toBe(true)
    })

    test('source token is greater to target token', () => {
      const sourceToken = new Token([4, 2])
      const targetToken = new Token([4, 1])

      expect(sourceToken.lowerThanOrEqual(targetToken)).toBe(false)
    })
  })
})
