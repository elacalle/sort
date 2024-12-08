import { IBucket } from ".."
import Token from "../../../token"

class FileBucket implements IBucket {
  private id: number = 0
  private tokens: Token[] = []
  private index: number = 0
  
  constructor(id: number) {
    this.id = id
  }

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
}

export default FileBucket