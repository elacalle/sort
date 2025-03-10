import { describe, test, expect } from 'vitest'
import sort from './index'
import Token from '../../token'

describe('sort', () => {
  test('sort values in asc order', () => {
    const values = [
      23, 5, 77, 92, 16, 33, 49, 60, 87, 3, 41, 99, 27, 11, 58, 75, 19, 46, 84,
      2, 39, 71, 95, 14, 50, 8, 64, 29, 90, 6, 36, 78, 52, 12, 68, 25, 81, 4,
      43, 96, 32, 18, 54, 67, 22, 88, 10, 40, 73, 1, 30, 93, 65, 15, 48, 70, 17,
      85, 7, 57, 24, 79, 47, 13, 61, 34, 98, 21, 45, 83, 9, 63, 38, 72, 31, 94,
      20, 59, 82, 35, 56, 28, 76, 42, 100, 66, 37, 91, 53, 74, 69, 26, 62, 80,
      44, 97, 55, 86, 51, 89
    ]

    expect(sort(values.map((value) => new Token([value])))).toEqual(
      values.sort((a, b) => a - b).map((value) => new Token([value]))
    )
  })
})
