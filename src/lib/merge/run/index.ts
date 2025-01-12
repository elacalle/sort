import { IBucket } from "../../extract/bucket"
import DummyBucket from "../../extract/bucket/dummyBucket"
import Token from "../../token"
import Evaluator from "../evaluator"

class Run {
  id: number
  tokens: Array<Token> = []
  private evaluator: Evaluator
  private bucket: IBucket

  constructor(number: number, evaluator: Evaluator) {
    this.id = number
    this.evaluator = evaluator
    this.bucket = new DummyBucket(0)
  }

  setBucket(bucket: IBucket) {
    this.bucket = bucket
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
    return this.bucket.current()
  }

  isClosed() {
    return !this.bucket.hasNext()
  }

  async movePointer() {
    await this.bucket.next();
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