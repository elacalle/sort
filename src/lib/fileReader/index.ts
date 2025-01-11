import * as fs from 'fs'
import byteDetector from './byteDetector'

let position = 0

let buffer = Buffer.alloc(1)

fs.open("words.txt", "r", async (err, fd) => {
    const read = (buffer: Buffer = Buffer.alloc(1), numberOfBytes: number = 1) => {
        return new Promise<Buffer | null>((resolve, reject) => {
            fs.read(fd, buffer, 0, numberOfBytes, position, (err, bytesRead, data) => {
                if(err) {
                    reject()
                }

                if(bytesRead == 0) {
                    fs.close(fd)
                    resolve(null)
                }

                resolve(data)
            })
        })
    }

    while(true) {
        let value = await read()

        if(!value) {
            break
        }

        const numberOfBytes = byteDetector(value)

        if(numberOfBytes != 1) {
            buffer = Buffer.alloc(numberOfBytes)
            value = await read(buffer, numberOfBytes)
            position += numberOfBytes
        } else {
            position++
        }

        if(value) {
            process.stdout.write(`${value.toString()}`)
        }
    }
})

