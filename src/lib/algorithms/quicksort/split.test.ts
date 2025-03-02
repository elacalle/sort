import { describe, test, expect } from 'vitest'
import { split } from './split'
import Token from '../../token'

describe('split', () => {
  test('splits the array in lower and higher numbers', () => {
    let numbers = [
      new Token([6]),
      new Token([13]),
      new Token([5]),
      new Token([4]),
      new Token([44]),
      new Token([2]),
      new Token([14])
    ]

    const [min, pivot, max] = split(numbers)

    expect(min).toEqual([new Token([5]), new Token([4]), new Token([2])])
    expect(pivot).toEqual([new Token([6])])
    expect(max).toEqual([new Token([13]), new Token([44]), new Token([14])])
  })

  test('splits tokens', () => {
    let tokens = [
      new Token([1, 1, 2]),
      new Token([4, 2]),
      new Token([1]),
      new Token([4, 0, 1]),
      new Token([1, 0, 2]),
      new Token([4, 0, 2]),
      new Token([6, 0, 2]),
      new Token([8, 0])
    ]

    const [min, pivot, max] = split(tokens) as [Token[], Token[], Token[]]

    expect(min.map((x) => x.getValue())).toEqual([[1], [1, 0, 2]])
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
