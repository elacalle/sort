import { describe, test, expect } from "vitest"
import {iterator} from "./iterator"

describe("iterator", () => {
  describe("next", () => {
    test("advances to the next token", () => {
      const text = "manzana\nalmendra"

      const {next} = iterator(text)

      expect(next().toString()).toBe("manzana")
      expect(next().toString()).toBe("almendra")
    })

    test("when iterator reaches the text length", () => {
      const text = "manzana\nalmendra"

      const {next} = iterator(text)

      next()
      next()

      expect(() => next()).toThrowError(/^iterator cant read token outside the text memory boundary$/)
    })
  })

  describe("isEndOfFile", () => {
    test("when iterator doesn't reach the text length", () => {
      const text = "manzana\nalmendra"

      const {next, isEndOfFile} = iterator(text)

      next()

      expect(isEndOfFile()).toBe(false)
    })

    test("when iterator reaches the text length", () => {
      const text = "manzana\nalmendra"

      const {next, isEndOfFile} = iterator(text)

      next()
      next()

      expect(isEndOfFile()).toBe(true)
    })
  })
})
