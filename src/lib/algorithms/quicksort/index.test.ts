import { describe, test, expect } from 'vitest'
import sort from './index'
import Token from '../../token'

describe('sort', () => {
  test('sort values in asc order', () => {
    const shuffledCharacters = [
      'g',
      'A',
      'm',
      'Z',
      'd',
      'K',
      'p',
      'T',
      'b',
      'L',
      'q',
      'R',
      'e',
      'H',
      'n',
      'W',
      'c',
      'Y',
      'o',
      'U',
      'a',
      'J',
      'r',
      'S',
      'f',
      'I',
      'l',
      'V',
      'h',
      'O',
      's',
      'Q',
      'i',
      'N',
      't',
      'P',
      'j',
      'M',
      'u',
      'X',
      'k',
      'D',
      'v',
      'G',
      'w',
      'B',
      'x',
      'E',
      'y',
      'C',
      'z',
      'F'
    ]

    const collator = new Intl.Collator('en')

    const sortedCharacters = [...shuffledCharacters].sort((a, b) =>
      collator.compare(a, b)
    )

    expect(sort(shuffledCharacters.map((x) => new Token([x])))).toEqual(
      sortedCharacters.map((char) => new Token([char]))
    )
  })
})
