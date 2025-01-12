import Token from "../../token";

interface IBucket {
  addBulk(tokens: Token[]): void

  next(): Promise<any>

  hasNext(): boolean

  dump(): void

  drop(): void

  current(): Token
}



export { IBucket }