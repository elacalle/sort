import { describe, test, expect}  from "vitest"
import { quicksort, divide } from "./quicksort"

const asc = (a: number, b: number) => a - b

describe("quicksort", () => {
  test("elements", () => {
    const list = [123,13,44,14,2,45,6]

    expect(quicksort(list)).toEqual(list.sort(asc))
  })


  test("elements", () => {
    const list = [23,83,34,4,200,45,3,698]

    expect(quicksort(list)).toEqual(list.sort(asc))
  })
})

describe("divide", () => {
  test("when criteria", () => {
    const collection = [123,13,44,14,2,45,6]

    expect(divide(collection, (x) => x < 44).sort(asc)).toEqual([2,6,13,14])
    expect(divide(collection, (x) => x > 44).sort(asc)).toEqual([45, 123])
    expect(divide(collection, (x) => x == 44).sort(asc)).toEqual([44])
  })
})

