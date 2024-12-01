import { describe, test, expect }  from "vitest"
import Token from "."

describe("Token", () => {
  describe("lowerThan", () => {
    test("source token is lower than target token", () => {
      const sourceToken = new Token([4, 11, 0])
      const targetToken = new Token([5])

      expect(sourceToken.lowerThan(targetToken)).toBe(true)
    })

    test("source token is greather than target token", () => {
      const sourceToken = new Token([5])
      const targetToken = new Token([4, 10])

      expect(sourceToken.lowerThan(targetToken)).toBe(false)
    })
  })
})
