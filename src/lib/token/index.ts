class Token {
  protected values: Array<number>
  
  constructor(values: Array<number>) {
    this.values = values
  }
  
  lowerThan(target: Token) {
    let meetCondition = false
    const length = this.values.length < target.values.length ? this.values.length : target.values.length


    for(let i = 0; i < length; i++) {
      const sourceValue = this.values[i]
      const targetValue = target.values[i]

      if (sourceValue < targetValue) {
        meetCondition = true
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