import { describe, test, expect, beforeEach, afterAll } from 'vitest'
import mock from 'mock-fs'
import fileReader from '.'

describe('file reader', () => {
  describe('tokenize lines', () => {
    beforeEach(() => {
      mock({
        'test.txt': 'foo\rbar\nbaz'
      })
    })

    test('read a line string until next token', async () => {
      const { read } = fileReader('test.txt')

      const result = await read()

      expect(result.token).toBe('foo')
      expect(result.done).toBeFalsy()
    })

    test('reaches EOF', async () => {
      const { read } = fileReader('test.txt')

      await read()
      await read()
      await read()
      const result = await read()

      expect(result.token).toBeUndefined()
      expect(result.done).toBeTruthy()
    })

    afterAll(mock.restore)
  })

  describe('BOM', () => {
    beforeEach(() => {
      mock({
        'test.txt': '﻿foo'
      })
    })

    test('ignores BOM', async () => {
      const { read } = fileReader('test.txt')

      let result = await read()
      expect(result.token).toBe('')
    })

    afterAll(mock.restore)
  })

  describe('reads special characters', () => {
    beforeEach(() => {
      mock({
        'test.txt': 'f∀o\r∈bar\nb_z√\rfoobar'
      })
    })

    test('detects utf-8 bytes', async () => {
      const { read } = fileReader('test.txt')

      let result = await read()
      expect(result.token).toBe('f∀o')

      result = await read()
      expect(result.token).toBe('∈bar')

      result = await read()
      expect(result.token).toBe('b_z√')

      result = await read()
      expect(result.token).toBe('foobar')
    })

    afterAll(mock.restore)
  })
})
