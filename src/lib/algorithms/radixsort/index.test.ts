import { describe, expect, test } from 'vitest'
import sort, { group, max, min, stackByGroup } from '.'
import Token from '../../token'

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
    const values = [
      new Token([1]),
      new Token([2]),
      new Token([0]),
      new Token([1])
    ]

    const map = new Map()
    map.set(0, [new Token([0])])
    map.set(1, [new Token([1]), new Token([1])])
    map.set(2, [new Token([2])])

    expect(group(values, 0)).toStrictEqual(map)
  })
})

describe('stackByGroup', () => {
  test('get the array chunks', () => {
    const map = new Map()
    map.set(0, [new Token([0])])
    map.set(1, [new Token([1]), new Token([1])])
    map.set(2, [new Token([2])])

    expect(stackByGroup(map)).toEqual([
      [0, 1],
      [1, 3],
      [3, 4]
    ])
  })

  test('group boundary without groups', () => {
    const values = [new Token([1]), new Token([1])]

    expect(stackByGroup(group(values, 2))).toStrictEqual([])
  })
})

describe('radix', () => {
  test('sorts first level', () => {
    const result = sort([
      new Token([1]),
      new Token([2]),
      new Token([0]),
      new Token([1])
    ])

    expect(result).toEqual([
      new Token([0]),
      new Token([1]),
      new Token([1]),
      new Token([2])
    ])
  })

  test('take into account zero digits', () => {
    const result = sort([
      new Token([1, 1]),
      new Token([1]),
      new Token([1, 0]),
      new Token([1])
    ])

    expect(result).toEqual([
      new Token([1]),
      new Token([1]),
      new Token([1, 0]),
      new Token([1, 1])
    ])
  })

  test('sorts nested level', () => {
    const result = sort([
      new Token([1, 1]),
      new Token([1, 3]),
      new Token([0]),
      new Token([1])
    ])

    expect(result).toEqual([
      new Token([0]),
      new Token([1]),
      new Token([1, 1]),
      new Token([1, 3])
    ])
  })

  test('sorts multi-level nested arrays', () => {
    const input = [
      new Token([3, 2, 1, 4, 5]),
      new Token([1, 5, 2, 4]),
      new Token([2]),
      new Token([2, 3, 4]),
      new Token([2, 3]),
      new Token([2, 3, 4, 1]),
      new Token([1, 5, 2]),
      new Token([1, 5, 2, 3]),
      new Token([1, 5, 2, 4, 6]),
      new Token([1, 5, 2, 4, 5]),
      new Token([3, 2]),
      new Token([1, 5, 2, 4, 4]),
      new Token([2, 1, 0, 0, 0, 1]),
      new Token([3, 2, 1])
    ]

    const result = sort(input)

    expect(result).toEqual([
      new Token([1, 5, 2]),
      new Token([1, 5, 2, 3]),
      new Token([1, 5, 2, 4]),
      new Token([1, 5, 2, 4, 4]),
      new Token([1, 5, 2, 4, 5]),
      new Token([1, 5, 2, 4, 6]),
      new Token([2]),
      new Token([2, 1, 0, 0, 0, 1]),
      new Token([2, 3]),
      new Token([2, 3, 4]),
      new Token([2, 3, 4, 1]),
      new Token([3, 2]),
      new Token([3, 2, 1]),
      new Token([3, 2, 1, 4, 5])
    ])
  })
})
