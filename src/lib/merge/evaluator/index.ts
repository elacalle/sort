import { Run } from '../run'

class Evaluator {
  current?: Run
  closed: Set<number> = new Set()

  async call(fn: (args: unknown) => void) {
    const currentRun = this.current

    if (currentRun) {
      const value = currentRun.currentToken().toString()

      fn(value)

      await currentRun.movePointer()

      if (currentRun.isClosed()) {
        this.closeRun(currentRun)
      }

      this.current = undefined
    }
  }

  isClosedRun(run: Run) {
    return this.closed.has(run.id)
  }

  closeRun(run: Run) {
    this.closed.add(run.id)
  }

  setCurrentRun(run: Run) {
    this.current = run
  }
}

export default Evaluator
