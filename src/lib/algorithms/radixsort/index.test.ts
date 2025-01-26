import { describe, expect, test } from 'vitest'
import sort from '.'

describe('radix', () => {
  test('Sorts first level', () => {
    const result = sort([[1], [2], [0]])

    expect(result).toEqual([[0], [1], [2]])
  })
})
