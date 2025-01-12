import { IBucket } from ".."
import fileReader, {Token as FileToken} from "../../../fileReader"
import Token from "../../../token"
import fs from "fs"

class FileBucket implements IBucket {
  private id: number = 0
  private tokens: Token[] = []
  private read: () => Promise<FileToken>
  private currentToken: Token
  private done = false
  
  constructor(id: number) {
    this.id = id
    this.currentToken = new Token([])
  
    const { read } = fileReader(this.path())
    this.read = read
  }

  addBulk(tokens: Token[]) {
    this.tokens = [...tokens]
  }
  
  async next() {
    if(this.done) { return }

    const { done, token } = await this.read()

    if(token && !done) {
      this.currentToken = Token.fromString(token)
    }

    this.done = done
  }
  
  hasNext() {
    return !this.done
  }
  
  dump() {
    this.tokens.forEach((token) => this.write(`${token.toString()}\n`))
  }
  
  current() {
    return this.currentToken
  }

  drop() {
    if(fs.existsSync(this.path())) {
      fs.unlinkSync(this.path())
    }
  }

  private write(data: string) {
    fs.appendFileSync(this.path(), data)
  }

  private path() {
    return `/tmp/sort_${this.id}.txt`
  }
}

export default FileBucket