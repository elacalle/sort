import {expect, test } from "vitest"
import { sort } from "./sort"

test.skip("sort", () => {
  const text = "mango\nbanana"
  expect(sort(text)).toBe("banana\nmango")
})
