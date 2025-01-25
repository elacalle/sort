import Token from '../../token'

type SplittedValues =
  | [number[], number[], number[]]
  | [Token[], Token[], Token[]]

const split = (list: number[] | Token[]): SplittedValues => {
  const [pivot, ...tail] = list

  const minValues = filter(tail, (x) => {
    if (typeof x == 'number' && typeof pivot == 'number') {
      return x <= pivot
    } else if (typeof x != 'number' && typeof pivot != 'number') {
      return x.lowerThanOrEqual(pivot)
    } else {
      throw 'Invalid type'
    }
  })

  const maxValues = filter(tail, (x) => {
    if (typeof x == 'number' && typeof pivot == 'number') {
      return x > pivot
    } else if (typeof x != 'number' && typeof pivot != 'number') {
      return x.greatherThan(pivot)
    } else {
      throw 'Invalid type'
    }
  })

  return [minValues, [pivot], maxValues] as SplittedValues
}

const filter = (
  list: (number | Token)[],
  condition: (x: number | Token) => boolean
) => {
  return list.filter(condition)
}

export { split }
export type { SplittedValues }
