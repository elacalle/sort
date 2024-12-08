import { IBucket } from ".."
import Token from "../../../token"

class DummyBucket implements IBucket{
  private tokens: Token[] = []
  private index: number = 0
  
  addBulk(tokens: Token[]) {
    this.tokens = [...tokens]
  }
  
  next() {
    this.index += 1
  }
  
  hasNext() {
    return this.index < this.tokens.length
  }
  
  dump() {
    // This class doest not have a external IO
  }
  
  current() {
    return this.tokens[this.index]
  }
  
  instance(): IBucket {
    return new DummyBucket()
  }
}

export default DummyBucket