import { Run } from '../run'

class Evaluator {
  current?: Run

  setCurrentRun(run: Run) {
    this.current = run
  }
}

export default Evaluator
