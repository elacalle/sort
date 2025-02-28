import { IOutput } from '../../output'
import Evaluator from '../evaluator'
import { Run } from '../run'

class Director {
  private runs: Array<Run>
  private evaluator: Evaluator
  private output: IOutput<unknown>

  constructor(
    evaluator: Evaluator,
    runs: Array<Run>,
    output: IOutput<unknown>
  ) {
    this.runs = runs
    this.evaluator = evaluator
    this.output = output
  }

  validate() {
    const runs: Record<number, number> = {}

    this.runs.forEach((run) => {
      if (!runs[run.id]) {
        runs[run.id] = 0
      }

      runs[run.id] = runs[run.id] + 1
    })

    for (const [key, value] of Object.entries(runs)) {
      if (value > 1) {
        throw `Run id ${key} its duplicated`
      }
    }
  }

  async call() {
    this.validate()

    while (this.isActive()) {
      this.runs.forEach((run) => {
        if (!this.evaluator.isClosedRun(run)) {
          run.call()
        }
      })

      await this.evaluator.call((value) => {
        if (value) this.output.write(value)
      })
    }
  }

  private isActive() {
    return this.evaluator.closed.size < this.runs.length
  }
}

export default Director
