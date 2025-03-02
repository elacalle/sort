import Token from '../../token'

type SplittedValues = [Token[], Token[], Token[]]

const split = (list: Token[]): SplittedValues => {
  const [pivot, ...tail] = list

  const minValues = filter(tail, (x) => {
    return x.lowerThanOrEqual(pivot)
  })

  const maxValues = filter(tail, (x) => {
    return x.greatherThan(pivot)
  })

  return [minValues, [pivot], maxValues] as SplittedValues
}

const filter = (list: Token[], condition: (x: Token) => boolean) => {
  return list.filter(condition)
}

export { split }
export type { SplittedValues }
