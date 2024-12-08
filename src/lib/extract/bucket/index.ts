import Token from "../../token";

interface IBucket {
  addBulk(tokens: Token[]): void

  next(): void

  hasNext(): boolean

  dump(): void

  current(): Token
}



export { IBucket }