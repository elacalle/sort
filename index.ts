import {iterator} from "./strategies/iterator"
import fs, {access, constants} from "node:fs"
import Token from "./strategies/token"

const main = async () => {
  let length = 0
  let chunkIdx = 0
  let tokenList: Array<Token> = []

  for await(const chunk of process.stdin) {
    for(const byte of chunk) {
      length += 1

      const char = String.fromCharCode(byte)

      fs.writeFileSync(`/tmp/chunk_${chunkIdx}`, char, { flag: 'a+', encoding: "latin1" })

      if(byte === 10 && length > 60000) {
        length = 0
        chunkIdx++
      }
    }
  }

  const data = fs.readFileSync(`/tmp/chunk_0`, {encoding: "latin1"})

  const {next, isEndOfFile} = iterator(data)

  while(!isEndOfFile()) {
    tokenList.push(next())
  }

  for(let i = 0; i <= 5; i++) {
    access(`/tmp/chunk_${i}`, constants.F_OK, (err) => {
      if(!err) {
        fs.unlink(`/tmp/chunk_${i}`, (err) => {
          if(err) {
            throw err
          }
        })
      }
    })
  }
}

main()
