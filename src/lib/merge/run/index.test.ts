import { describe, test, expect, vi } from 'vitest'
import Token from '../../token'
import { Run, RunFactory } from '../run'
import Evaluator from '../evaluator'
import DummyBucket from '../../extract/bucket/dummyBucket'

describe('Evaluator', () => {
  test('pick smallest value', () => {
    const evaluator = new Evaluator()
    const runFactory = new RunFactory(evaluator)
    const runs: Array<Run> = []

    const first = runFactory.instance()
    const firstDummyBucket = new DummyBucket(0)
    firstDummyBucket.addBulk([new Token([4, 1]), new Token([5])])
    first.setBucket(firstDummyBucket)
    runs.push(first)

    const second = runFactory.instance()
    const secondDummyBucket = new DummyBucket(1)
    secondDummyBucket.addBulk([new Token([3, 1]), new Token([4, 2])])
    second.setBucket(secondDummyBucket)
    runs.push(second)

    const third = runFactory.instance()
    const thirdDummyBucket = new DummyBucket(2)
    thirdDummyBucket.addBulk([new Token([6]), new Token([7, 1])])
    third.setBucket(thirdDummyBucket)
    runs.push(third)

    runs.forEach((run) => run.call())

    expect(evaluator.current).toBe(second)
  })

  test('skips grather values', () => {
    const evaluator = new Evaluator()
    const spy = vi.spyOn(evaluator, 'setCurrentRun')

    const runFactory = new RunFactory(evaluator)

    const first = runFactory.instance()
    const second = runFactory.instance()

    const firstDummyBucket = new DummyBucket(1)
    firstDummyBucket.addBulk([new Token([4, 1]), new Token([5])])
    first.setBucket(firstDummyBucket)
    first.call()

    const secondDummyBucket = new DummyBucket(2)
    secondDummyBucket.addBulk([new Token([6])])
    second.setBucket(secondDummyBucket)
    second.call()

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
