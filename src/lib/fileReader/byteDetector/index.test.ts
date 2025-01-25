import { describe, test, expect, vi } from 'vitest'
import byteDetector from '.'

describe('byteDetector', () => {
  test('finds a character with 1 byte', () => {
    const buffer = Buffer.alloc(1)
    buffer[0] = 0x61

    expect(byteDetector(buffer)).toBe(1)
  })

  test('finds a character with 2 bytes', () => {
    const buffer = Buffer.alloc(1)
    buffer[0] = 0xc3

    expect(byteDetector(buffer)).toBe(2)
  })

  test('finds a character with 3 bytes', () => {
    const buffer = Buffer.alloc(1)
    buffer[0] = 0xe2

    expect(byteDetector(buffer)).toBe(3)
  })

  test('finds a character with 4 bytes', () => {
    const buffer = Buffer.alloc(1)
    buffer[0] = 0xf0

    expect(byteDetector(buffer)).toBe(4)
  })
})
