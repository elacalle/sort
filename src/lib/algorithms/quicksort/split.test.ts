import { describe, test, expect }  from "vitest"
import { split } from "./split"
import { stack } from "./stack"

describe("split", () => {
  test('splits the array in lower and higher numbers', () => {
    let numbers = [6,13,5,4,44,2,14]
    
    const [min, pivot, max] = split(numbers)

    expect(min).toEqual([5,4,2])
    expect(pivot).toEqual([6])
    expect(max).toEqual([13,44,14])
  })
})

