class Token {
  private characters: Array<string>

  constructor() {
    this.characters = []
  }

  setCharacter(index: number, character: string) {
    this.characters[index] = character
  }

  toString() {
    return this.characters.join("")
  }
}

export default Token
