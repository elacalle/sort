import { describe, test, expect } from 'vitest'
import { split } from './split'
import Token from '../../token'

describe('split', () => {
  test('splits the array in lower and higher numbers', () => {
    let characters = [
      new Token(['g']),
      new Token(['a']),
      new Token(['d']),
      new Token(['b']),
      new Token(['f']),
      new Token(['e']),
      new Token(['c']),
      new Token(['h'])
    ]

    const [min, pivot, max] = split(characters)

    expect(min).toEqual([
      new Token(['a']),
      new Token(['d']),
      new Token(['b']),
      new Token(['f']),
      new Token(['e']),
      new Token(['c'])
    ])

    expect(pivot).toEqual([new Token(['g'])])

    expect(max).toEqual([new Token(['h'])])
  })

  test('split should correctly handle a list with a single element', () => {
    let characters = [new Token(['g'])]

    const [min, pivot, max] = split(characters)

    expect(min).toEqual([])
    expect(pivot).toEqual([new Token(['g'])])
    expect(max).toEqual([])
  })

  test('split should correctly handle an empty list', () => {
    let characters: Token[] = []

    const [min, pivot, max] = split(characters)

    expect(min).toEqual([])
    expect(pivot).toEqual([])
    expect(max).toEqual([])
  })

  test('split should correctly handle a list with all elements equal', () => {
    let characters = [new Token(['g']), new Token(['g']), new Token(['g'])]

    const [min, pivot, max] = split(characters)

    expect(min).toEqual([new Token(['g']), new Token(['g'])])
    expect(pivot).toEqual([new Token(['g'])])
    expect(max).toEqual([])
  })

  test('split should correctly handle a list with elements in reverse order', () => {
    let characters = [
      new Token(['h']),
      new Token(['g']),
      new Token(['f']),
      new Token(['e']),
      new Token(['d']),
      new Token(['c']),
      new Token(['b']),
      new Token(['a'])
    ]

    const [min, pivot, max] = split(characters)

    expect(min).toEqual([
      new Token(['g']),
      new Token(['f']),
      new Token(['e']),
      new Token(['d']),
      new Token(['c']),
      new Token(['b']),
      new Token(['a'])
    ])

    expect(pivot).toEqual([new Token(['h'])])

    expect(max).toEqual([])
  })

  test('split should correctly handle a list with duplicate elements', () => {
    let characters = [
      new Token(['g']),
      new Token(['a']),
      new Token(['d']),
      new Token(['b']),
      new Token(['f']),
      new Token(['e']),
      new Token(['c']),
      new Token(['h']),
      new Token(['a']),
      new Token(['d'])
    ]

    const [min, pivot, max] = split(characters)

    expect(min).toEqual([
      new Token(['a']),
      new Token(['d']),
      new Token(['b']),
      new Token(['f']),
      new Token(['e']),
      new Token(['c']),
      new Token(['a']),
      new Token(['d'])
    ])

    expect(pivot).toEqual([new Token(['g'])])

    expect(max).toEqual([new Token(['h'])])
  })
})
