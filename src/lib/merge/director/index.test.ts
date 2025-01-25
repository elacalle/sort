import { describe, test, expect, vi } from 'vitest'
import { Run } from '../run'
import Evaluator from '../evaluator'
import Token from '../../token'
import Director from '.'
import DummyOutput from '../../output/dummyOutput'
import DummyBucket from '../../extract/bucket/dummyBucket'

describe('Director', () => {
  describe('validate', () => {
    test('throws and error when the runner id is duplicated', async () => {
      const evaluator = new Evaluator()
      const runs: Run[] = []

      const firstRun = new Run(1, evaluator)
      const firstDummyBucket = new DummyBucket(0)
      firstDummyBucket.addBulk([new Token([4, 1]), new Token([5])])
      firstRun.setBucket(firstDummyBucket)
      runs.push(firstRun)

      const secondRun = new Run(1, evaluator)
      const secondDummyBucket = new DummyBucket(1)
      secondDummyBucket.addBulk([new Token([4, 2]), new Token([5, 1])])
      secondRun.setBucket(secondDummyBucket)
      runs.push(secondRun)

      const dummy = new DummyOutput()

      const director = new Director(evaluator, runs, dummy)
      await expect(director.call()).rejects.toThrow('Run id 1 its duplicated')
    })
  })

  test('order the runs values', async () => {
    const evaluator = new Evaluator()
    const runs: Run[] = []

    const firstRun = new Run(1, evaluator)
    const firstDummyBucket = new DummyBucket(0)
    firstDummyBucket.addBulk([new Token([99, 98]), new Token([100])])
    firstRun.setBucket(firstDummyBucket)
    runs.push(firstRun)

    const secondRun = new Run(2, evaluator)
    const secondDummyBucket = new DummyBucket(1)
    secondDummyBucket.addBulk([new Token([99, 100]), new Token([100, 99])])
    secondRun.setBucket(secondDummyBucket)
    runs.push(secondRun)

    const thirdRun = new Run(3, evaluator)
    const thirdDummyBucket = new DummyBucket(2)
    thirdDummyBucket.addBulk([new Token([97, 98]), new Token([98])])
    thirdRun.setBucket(thirdDummyBucket)
    runs.push(thirdRun)

    const dummy = new DummyOutput()
    const spy = vi.spyOn(dummy, 'write')

    const director = new Director(evaluator, runs, dummy)
    await director.call()

    expect(spy.mock.calls).toEqual([
      ['ab'],
      ['b'],
      ['cb'],
      ['cd'],
      ['d'],
      ['dc']
    ])
  })
})
