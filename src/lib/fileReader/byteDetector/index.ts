const BYTES = {
  1: 0,
  2: 192,
  3: 224,
  4: 240
}

const BYTE_UNIT = 8

type BytesPositions = keyof typeof BYTES

const byteDetector = (buffer: Buffer) => {
  const firstByte = buffer.at(0)

  if (!firstByte) {
    throw 'Wrong alloc'
  }

  // Order it's important do not change!
  if (has(firstByte, 4)) return 4
  if (has(firstByte, 3)) return 3
  if (has(firstByte, 2)) return 2
  if (has(firstByte, 1)) return 1

  throw 'Invalid byte'
}

const has = (byte: number, nBytes: BytesPositions) => {
  const movePosition = BYTE_UNIT - nBytes

  return byte >> movePosition === BYTES[nBytes] >> movePosition
}

export default byteDetector
