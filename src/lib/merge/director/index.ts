import { IOutput } from "../../output";
import Evaluator from "../evaluator";
import { Run } from "../run";

class Director {
  private runs: Array<Run>
  private evaluator: Evaluator
  private closed: Array<number>
  private output: IOutput<unknown>

  constructor(evaluator: Evaluator, runs: Array<Run>, output: IOutput<unknown>) {
    this.runs = runs
    this.evaluator = evaluator
    this.closed = []
    this.output = output
  }

  validate() {
    const runs: Record<number, number> = {}

    this.runs.forEach((run) => {
      if(!runs[run.id]) { runs[run.id] = 0 }

      runs[run.id] = runs[run.id] + 1
    })

    for(const [key, value] of Object.entries(runs)) {
      if(value > 1) {
        throw `Run id ${key} its duplicated`
      }
    }
  }

  async call() {
    this.validate()

    while (this.isActive()) {
      this.runs.forEach((run) => {
        if(!this.closed.includes(run.id)) {
          run.call()  
        }
      })

      const currentRun = this.evaluator.current

      if(currentRun) {
        const value = currentRun.currentToken().toString()
        if(value.length) this.output.write(value)
        
        await currentRun.movePointer()

        if(currentRun.isClosed()) { this.closeRun(currentRun) }

        this.evaluator.current = undefined
      }
    }
  }

  private closeRun(run: Run) {
    this.closed.push(run.id)
  }

  private isActive() {
    return this.closed.length < this.runs.length
  }
}

export default Director