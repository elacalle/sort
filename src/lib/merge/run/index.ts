import Token from "../../token"
import Evaluator from "../evaluator"

class Run {
  id: number
  tokens: Array<Token> = []
  private evaluator: Evaluator
  private pointer: number = 0

  constructor(number: number, evaluator: Evaluator) {
    this.id = number
    this.evaluator = evaluator
  }

  setTokens(tokens: Array<Token>) {
    this.tokens = tokens
  }

  call() {
    if(!this.evaluator.current) { this.evaluator.setCurrentRun(this) }
    if(this.myself()) return
    
    if(this.canUpdate()) {
      this.evaluator.setCurrentRun(this)
    }
  }

  private myself() {
    return this.evaluator.current == this
  }

  private canUpdate() {
    const evaluatorToken = this.evaluator.current?.currentToken()

    if(!evaluatorToken) { return false }

    return this.currentToken().lowerThan(evaluatorToken)
  }

  currentToken() {
    return this.tokens[this.pointer]
  }

  isClosed() {
    return this.pointer > this.tokens.length - 1
  }

  movePointer() {
    this.pointer++
  }
}

class RunFactory {
  runs: number = 0
  evaluator: Evaluator

  constructor(evaluator: Evaluator) {
    this.evaluator = evaluator
  }

  instance(): Run {
    this.runs++

    return new Run(this.runs, this.evaluator)
  }
}

export { Run, RunFactory }