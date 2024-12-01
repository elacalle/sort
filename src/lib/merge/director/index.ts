import { IOutput } from "../../output";
import Evaluator from "../evaluator";
import { Run } from "../run";

class Director {
  private runners: Array<Run>
  private evaluator: Evaluator
  private closed: Array<number>
  private output: IOutput<unknown>

  constructor(evaluator: Evaluator, runners: Array<Run>, output: IOutput<unknown>) {
    this.runners = runners
    this.evaluator = evaluator
    this.closed = []
    this.output = output
  }

  validate() {
    const runners: Record<number, number> = {}

    this.runners.forEach((runner) => {
      if(!runners[runner.id]) { runners[runner.id] = 0 }

      runners[runner.id] = runners[runner.id] + 1
    })

    for(const [key, value] of Object.entries(runners)) {
      if(value > 1) {
        throw `Run id ${key} its duplicated`
      }
    }
  }

  call() {
    this.validate()

    while (this.isActive()) {
      this.runners.forEach((runner) => {
        if(!this.closed.includes(runner.id)) {
          runner.call()  
        }
      })

      const currentRunner = this.evaluator.current

      if(currentRunner) {
        this.output.write(currentRunner.currentToken().getValue())

        currentRunner.movePointer()

        if(currentRunner.isClosed()) { this.closeRunner(currentRunner) }

        this.evaluator.current = undefined
      }
    }
  }

  private closeRunner(runner: Run) {
    this.closed.push(runner.id)
  }

  private isActive() {
    return this.closed.length < this.runners.length
  }
}

export default Director