import mock from 'mock-fs'
import { describe, test, beforeEach, afterEach, expect, vi } from 'vitest'
import resolvePath from '.'

describe('path', () => {
  beforeEach(() => {
    vi.spyOn(process, 'cwd').mockReturnValue('/tmp/')

    mock({
      '/tmp/foo/bar/foobar.txt': 'Hello world'
    })
  })

  test('path is absolute returns same path', () => {
    expect(resolvePath('/tmp/foo/bar/foobar.txt')).toBe(
      '/tmp/foo/bar/foobar.txt'
    )
  })

  test('when a path is relative resolves to the absolute path', () => {
    expect(resolvePath('foo/bar/foobar.txt')).toBe('/tmp/foo/bar/foobar.txt')
  })

  test('when a path is relative resolves to the absolute path', () => {
    vi.spyOn(process, 'cwd').mockReturnValue('/tmp/foo/bar/baz')
    mock({
      '/tmp/foo/foobar.txt': 'asdad',
      '/tmp/foo/bar/baz': {}
    })

    expect(resolvePath('../../../foo/foobar.txt')).toBe('/tmp/foo/foobar.txt')
  })

  test('when the file doesnt exists', () => {
    vi.spyOn(process, 'cwd').mockReturnValue('/tmp/foo/bar/baz')
    mock({
      '/tmp/foo': {},
      '/tmp/foo/bar/baz': {}
    })

    expect(() => resolvePath('../../../foo/foobar.txt')).toThrow(
      'File does not exist'
    )
  })

  afterEach(() => {
    vi.spyOn(process, 'cwd').mockRestore()
    mock.restore()
  })
})
