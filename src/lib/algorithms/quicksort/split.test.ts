import { describe, test, expect }  from "vitest"
import { split } from "./split"
import Token from "../../token"

describe("split", () => {
  test('splits the array in lower and higher numbers', () => {
    let numbers = [6,13,5,4,44,2,14]
    
    const [min, pivot, max] = split(numbers)

    expect(min).toEqual([5,4,2])
    expect(pivot).toEqual([6])
    expect(max).toEqual([13,44,14])
  })

  test('splits tokens', () => {
    let tokens = [
      new Token([1,1,2]),
      new Token([4,2]),
      new Token([1]),
      new Token([4,0,1]),
      new Token([1,0,2]),
      new Token([4,0,2]),
      new Token([6,0,2]),
      new Token([8,0])
    ]

    const [min, pivot, max] = split(tokens) as [Token[], Token[], Token[]]

    expect(min.map((x) => x.getValue())).toEqual([[1], [1 ,0 ,2]])
    expect(pivot.map((x) => x.getValue())).toEqual([[1, 1, 2]])
    expect(max.map((x) => x.getValue())).toEqual([
      [4, 2],
      [4, 0, 1],
      [4, 0, 2],
      [6, 0, 2],
      [8, 0]
    ])
  })
})

