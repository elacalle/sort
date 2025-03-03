import readline from 'readline'
import { IBucket } from '../bucket'
import Token from '../../token'

// Bytes 10kb
const CHUNK_SIZE = 10_024

class Loader {
  private chunks: number
  private chunkSize: number = 0
  private chunkLimit: number = 1
  private readLine: readline.Interface
  private bucketFactory: () => IBucket
  private buckets: IBucket[] = []
  private sort: (tokens: Token[]) => Token[] | undefined

  constructor(
    bucketFactory: () => IBucket,
    stream: NodeJS.ReadableStream,
    sort: (tokens: Token[]) => Token[] | undefined,
    chunks = CHUNK_SIZE
  ) {
    this.bucketFactory = bucketFactory
    this.readLine = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    })
    this.chunks = chunks
    this.sort = sort
  }

  async call() {
    const iterator = this.readLine[Symbol.asyncIterator]()
    let hasNext: boolean | undefined = true
    let bucket = this.bucketFactory()
    let tokens: Token[] = []

    do {
      const el = await iterator.next()
      hasNext = !el.done

      if (el.value) {
        const value = (el.value as string).toString()
        this.chunkSize += value.length

        tokens.push(Token.fromString(value))
      }

      if (this.chunkSize >= this.nextChunk() || !hasNext) {
        const sorted = this.sort(tokens) as Token[]
        bucket.addBulk(sorted)
        bucket.dump()
        this.buckets.push(bucket)

        bucket = this.bucketFactory()
        tokens = []
        this.nextChunkLimit()
      }
    } while (hasNext)
  }

  private nextChunkLimit() {
    this.chunkLimit++
  }

  private nextChunk() {
    return this.chunkLimit * this.chunks
  }

  getBuckets() {
    return this.buckets
  }
}

export default Loader
