import Token from "./token"

const END_OF_LINE = 10

type IteratorType = {
  isEndOfFile: () => boolean
  next: () => Token
}

const iterator = (text: string): IteratorType => {
  let position: number = 0

  const isEndOfFile = () => position >= text.length

  const next = () => {
    let currentCharacter: string = ""
    const token: Token = new Token()
    let charIndex = 0

    if(position > text.length - 1) throw new Error('iterator cant read token outside the text memory boundary')

    while(position <= text.length - 1 && !isSeparator(text[position])) {
      currentCharacter = text[position]
      token.setCharacter(charIndex, currentCharacter)

      position++
      charIndex++
    }

    position++

    return token
  }

  return {next, isEndOfFile}
}


const isSeparator = (char: string) => charCode(char) === END_OF_LINE

const charCode = (char: string) => char.charCodeAt(0)

export {iterator}
