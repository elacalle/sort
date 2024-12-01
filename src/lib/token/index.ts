class Token {
  protected values: Array<number>
  public signature: number
  
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
    let meetCondition = false
    const length = this.values.length < target.values.length ? this.values.length : target.values.length

    for(let i = 0; i < length; i++) {
      const sourceValue = this.values[i]
      const targetValue = target.values[i]

      if(sourceValue == targetValue) { continue }
      
      if (condition(sourceValue, targetValue)) {
        meetCondition = true
        break
      } else {
        meetCondition = false
        break
      }
    }

    return meetCondition
  }

  getValue() {
    return this.values
  }
}

export default Token