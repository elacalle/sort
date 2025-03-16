const EMPTY_VALUE = '' // NULL

class Token {
  protected values: Array<string>
  private coll: Intl.Collator

  constructor(values: Array<string>) {
    this.values = values
    this.coll = new Intl.Collator('es-ES')
  }

  greatherThan(target: Token) {
    return this.compare(target, (sourceValue, targetValue) => {
      return this.coll.compare(sourceValue, targetValue) == 1
    })
  }

  lowerThan(target: Token) {
    return this.compare(
      target,
      (sourceValue, targetValue) =>
        this.coll.compare(sourceValue, targetValue) == -1
    )
  }

  equal(target: Token) {
    let matches = true
    if (target.values.length != this.values.length) return false

    for (let i = 0; i < this.values.length; i++) {
      if (this.values.at(i) != target.values.at(i)) {
        matches = false

        break
      }
    }

    return matches
  }

  lowerThanOrEqual(target: Token) {
    return this.equal(target) || this.lowerThan(target)
  }

  compare(target: Token, condition: (x: string, y: string) => boolean) {
    let index = 0
    let meetCondition = false
    let sourceValue = ''
    let targetValue = ''
    const length =
      this.values.length > target.values.length
        ? this.values.length
        : target.values.length

    do {
      sourceValue = this.values[index] || EMPTY_VALUE
      targetValue = target.values[index] || EMPTY_VALUE

      index++
    } while (index < length && sourceValue == targetValue)

    meetCondition = condition(sourceValue, targetValue)

    return meetCondition
  }

  getValue() {
    return this.values
  }

  toString() {
    return this.values.join('')
  }

  at(index: number) {
    return this.values.at(index)
  }

  static fromString(value: string) {
    const characters: string[] = []

    for (let i = 0; i < value.length; i++) {
      characters.push(value[i])
    }

    return new Token(characters)
  }
}

export default Token
