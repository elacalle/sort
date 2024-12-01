import { describe, test, expect, vi }  from "vitest"
import { Run } from "../run"
import Evaluator from "../evaluator"
import Token from "../../token"
import Director from "."
import DummyOutput from "../../output/dummyOutput"

describe('Director', () => {
  describe('validate', () => {
    test('throws and error when the runner id is duplicated', () => {
      const evaluator = new Evaluator()
      const runs: Run[] = []

      const firstRun = new Run(1, evaluator)
      firstRun.setTokens([new Token([4,1]), new Token([5])])
      runs.push(firstRun)
    
      const secondRun = new Run(1, evaluator)
      secondRun.setTokens([new Token([4,2]), new Token([5,1])])
      runs.push(secondRun)

      const dummy = new DummyOutput()

      const director = new Director(evaluator, runs, dummy)
      expect(() => director.call()).toThrow('Run id 1 its duplicated')
    })
  })

  test('order the runs values', () => {
    const evaluator = new Evaluator()
    const runs: Run[] = []

    const firstRun = new Run(1, evaluator)
    firstRun.setTokens([new Token([4,1]), new Token([5])])
    runs.push(firstRun)
    
    const secondRun = new Run(2, evaluator)
    secondRun.setTokens([new Token([4,2]), new Token([5,1])])
    runs.push(secondRun)

    const thirdRun = new Run(3, evaluator)
    thirdRun.setTokens([new Token([1,2]), new Token([3])])
    runs.push(thirdRun)

    const dummy = new DummyOutput()

    const director = new Director(evaluator, runs, dummy)
    director.call()

    expect(dummy.output).toEqual([[1,2], [3], [4,1], [4,2], [5], [5,1]])
  })
})