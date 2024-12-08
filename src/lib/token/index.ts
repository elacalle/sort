const EMPTY_VALUE = 0 // NULL

class Token {
  protected values: Array<number>
  protected signature: number
  
  constructor(values: Array<number>) {
    this.values = values
    this.signature = this.generateSignature()
  }

  private generateSignature() {
    let signature = 0

    for(let i = this.values.length; i > 0; i--) {
      signature = (i * this.values[this.values.length - i]) + signature
    }

    return signature
  }

  greatherThan(target: Token) {
    return this.compare(target, (sourceValue, targetValue) => sourceValue > targetValue)
  }

  lowerThan(target: Token) {
    return this.compare(target, (sourceValue, targetValue) => sourceValue < targetValue)
  }

  equal(target: Token) {
    return this.signature == target.signature
  }

  lowerThanOrEqual(target: Token) {
    return this.equal(target) || this.lowerThan(target)
  }

  compare(target: Token, condition: (x: number, y: number) => boolean ) {
    let index = 0
    let meetCondition = false
    let sourceValue = 0
    let targetValue = 0
    const length = this.values.length > target.values.length 
      ? this.values.length : target.values.length
    
    do {
      sourceValue = this.values[index] || EMPTY_VALUE
      targetValue = target.values[index] || EMPTY_VALUE

      index++
    } while(index < length && sourceValue == targetValue)

    meetCondition = condition(sourceValue, targetValue)

    return meetCondition
  }

  getValue() {
    return this.values
  }

  toString() {
    return String.fromCharCode(...this.values)
  }

  static fromString(value: string) {
    const digits = []

    for(let i = 0; i < value.length; i++) {
      digits.push(value.charCodeAt(i))
    }

    return new Token(digits)
  }
}

export default Token