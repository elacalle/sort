import { describe, expect, test } from 'vitest'
import sort, { group, max, min, stackByGroup, StackElement } from '.'

describe('max', () => {
  test('gets the maximum number', () => {
    expect(max([1, 15, 5, 10, 35, 20, 8])).toBe(35)
  })
})

describe('min', () => {
  test('gets the maximum number', () => {
    expect(min([3, 15, -2, 10, 35, 1, 8])).toBe(-2)
  })
})

describe('group', () => {
  test('references by key', () => {
    const values = [[1], [2], [0], [1]]

    const map = new Map()
    map.set(0, [[0]])
    map.set(1, [[1], [1]])
    map.set(2, [[2]])

    expect(group(values, 0)).toStrictEqual(map)
  })
})

describe('stackByGroup', () => {
  test('get the array chunks', () => {
    const map = new Map()
    map.set(0, [[0]])
    map.set(1, [[1], [1]])
    map.set(2, [[2]])

    expect(stackByGroup(map)).toEqual([
      [0, 1],
      [1, 3],
      [3, 4]
    ])
  })

  test('group boundary without groups', () => {
    const values = [[1], [1]]

    expect(stackByGroup(group(values, 2))).toStrictEqual([])
  })
})

describe('radix', () => {
  test('sorts first level', () => {
    const result = sort([[1], [2], [0], [1]])

    expect(result).toEqual([[0], [1], [1], [2]])
  })

  test('take into account zero digits', () => {
    const result = sort([[1, 1], [1], [1, 0], [1]])

    expect(result).toEqual([[1], [1], [1, 0], [1, 1]])
  })

  test('sorts nested level', () => {
    const result = sort([[1, 1], [1, 3], [0], [1]])

    expect(result).toEqual([[0], [1], [1, 1], [1, 3]])
  })

  test('sorts multi-level nested arrays', () => {
    const input = [
      [3, 2, 1, 4, 5],
      [1, 5, 2, 4],
      [2],
      [2, 3, 4],
      [2, 3],
      [2, 3, 4, 1],
      [1, 5, 2],
      [1, 5, 2, 3],
      [1, 5, 2, 4, 6],
      [1, 5, 2, 4, 5],
      [3, 2],
      [1, 5, 2, 4, 4],
      [2, 1, 0, 0, 0, 1],
      [3, 2, 1]
    ]

    const result = sort(input)

    expect(result).toEqual([
      [1, 5, 2],
      [1, 5, 2, 3],
      [1, 5, 2, 4],
      [1, 5, 2, 4, 4],
      [1, 5, 2, 4, 5],
      [1, 5, 2, 4, 6],
      [2],
      [2, 1, 0, 0, 0, 1],
      [2, 3],
      [2, 3, 4],
      [2, 3, 4, 1],
      [3, 2],
      [3, 2, 1],
      [3, 2, 1, 4, 5]
    ])
  })
})
