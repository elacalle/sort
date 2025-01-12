import * as fs from 'fs/promises'
import byteDetector from './byteDetector'


interface Token {
  token?: string,
  done: boolean 
}

const fileReader = (path: string) => {
  let position = 0
  let buffer = Buffer.alloc(1)
  let done = false

  const read : () => Promise<Token> = async () => {
    let token: Array<Buffer> = []

    if(done) return Promise.resolve({ token: undefined, done })

    const fileHandle = await fs.open(path, "r")
    const readFile = async (buffer: Buffer = Buffer.alloc(1), numberOfBytes: number = 1) => {
      return await fileHandle.read(buffer, 0, numberOfBytes, position)
    }

    while(true) {
      let readData = await readFile()
      let value = readData.buffer
       
      if(readData.bytesRead == 0) { 
        done = true
        break
      }

      if(!value || value.toString() == "\r" || value.toString() == "\n") {
        position++
        break
      }
       
      const numberOfBytes = byteDetector(value)
       
      if(numberOfBytes != 1) {
        buffer = Buffer.alloc(numberOfBytes)
        value = (await readFile(buffer, numberOfBytes)).buffer
        position += numberOfBytes
      } else {
        position++
      }
       
      if(value) {
        token.push(value)
      }
    }

    await fileHandle.close()

    return Promise.resolve({ token: stringify(token), done })
  }

  return { read }
}

const stringify = (buffers: Array<Buffer>) => buffers.map((buffer) => buffer.toString()).join("")

export default fileReader
