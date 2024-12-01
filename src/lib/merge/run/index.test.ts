import { describe, test, expect, vi }  from "vitest"
import Token from "../../token"
import { Run, RunFactory } from "../run"
import Evaluator from "../evaluator"

describe('Evaluator', () => {
  test("Pick smallest value", () => {
    const evaluator = new Evaluator()
    const runFactory =  new RunFactory(evaluator)
    const runs: Array<Run> = [] 
    
    const first = runFactory.instance()
    first.setTokens([new Token([4,1]), new Token([5])])
    runs.push(first)
    
    const second = runFactory.instance()
    second.setTokens([new Token([3,1]), new Token([4,2])])
    runs.push(second)
    
    const third = runFactory.instance()
    third.setTokens([new Token([6]), new Token([7,1])])
    runs.push(third)
    
    runs.forEach(run => run.call())
    
    expect(evaluator.current).toBe(second)
  })

  test('Skips grather values', () => {
    const evaluator = new Evaluator()
    const spy = vi.spyOn(evaluator, "setCurrentRun")

    const runFactory = new RunFactory(evaluator)

    const first = runFactory.instance()
    const second = runFactory.instance()

    first.setTokens([new Token([4,1]), new Token([5])])
    first.call()

    second.setTokens([new Token([6])])
    second.call()

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
