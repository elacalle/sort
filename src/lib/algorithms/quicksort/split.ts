type SplittedValues = [number[], number[], number[]]

const split = (list: number[]): [number[], number[], number[]] => {
  const [pivot, ...tail] = list
  
  const minValues = filter(tail, (x) => x <= pivot)
  const maxValues = filter(tail, (x) => x > pivot)

  return [minValues, [pivot], maxValues]
}

const filter = (list: number[], condition: (x: number) => boolean) => {
  return list.filter(condition)
}

export { split }
export type { SplittedValues }