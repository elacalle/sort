import { describe, test, expect } from 'vitest'
import sort from './index'
import Token from '../../token'

describe('sort', () => {
  test('sort values in asc order', () => {
    const numeros = [
      23, 5, 77, 92, 16, 33, 49, 60, 87, 3, 41, 99, 27, 11, 58, 75, 19, 46, 84,
      2, 39, 71, 95, 14, 50, 8, 64, 29, 90, 6, 36, 78, 52, 12, 68, 25, 81, 4,
      43, 96, 32, 18, 54, 67, 22, 88, 10, 40, 73, 1, 30, 93, 65, 15, 48, 70, 17,
      85, 7, 57, 24, 79, 47, 13, 61, 34, 98, 21, 45, 83, 9, 63, 38, 72, 31, 94,
      20, 59, 82, 35, 56, 28, 76, 42, 100, 66, 37, 91, 53, 74, 69, 26, 62, 80,
      44, 97, 55, 86, 51, 89
    ]

    expect(sort(numeros)).toEqual(numeros.sort((a, b) => a - b))
  })

  test('sorts tokens', () => {
    let tokens = [
      new Token([1, 1, 2]),
      new Token([4, 2]),
      new Token([1]),
      new Token([8, 0]),
      new Token([4, 0, 1]),
      new Token([1, 0, 2]),
      new Token([4, 0, 2]),
      new Token([6, 0, 2])
    ]

    const result = sort(tokens)?.map((x) => (x as Token).getValue())

    expect(result).toEqual([
      [1],
      [1, 0, 2],
      [1, 1, 2],
      [4, 0, 1],
      [4, 0, 2],
      [4, 2],
      [6, 0, 2],
      [8, 0]
    ])
  })

  test('sorts tokens', () => {
    let tokens = [
      Token.fromString('of'),
      Token.fromString('but'),
      Token.fromString('of'),
      Token.fromString('their'),
      Token.fromString('of')
    ]

    const result = sort(tokens)?.map((x) => (x as Token).getValue())

    expect(result).toEqual([
      [98, 117, 116],
      [111, 102],
      [111, 102],
      [111, 102],
      [116, 104, 101, 105, 114]
    ])
  })
})
