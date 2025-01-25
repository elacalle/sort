const byteDetector = (buffer: Buffer) => {
  const firstByte = buffer.at(0)

  if (!firstByte) {
    throw 'Wrong alloc'
  }

  const byte = toBinary(firstByte)

  if (byte.startsWith('0')) return 1
  if (byte.startsWith('110')) return 2
  if (byte.startsWith('1110')) return 3
  if (byte.startsWith('11110')) return 4

  throw 'Invalid byte'
}

const toBinary = (decimal: number) => decimal.toString(2).padStart(8, '0')

export default byteDetector
