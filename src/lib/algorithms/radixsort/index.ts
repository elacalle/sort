const count = (values: [number, number][]) => {
  const indexes = values.map(([value, _]) => value)
  const list: Record<number, Array<number>> = {}

  const min = Math.min(...indexes)
  const max = Math.max(...indexes)

  for (let i = min; i <= max; i++) {
    list[i] = []
  }

  values.forEach(([index, arrayPosition]) => {
    list[index].push(arrayPosition)
  })

  return list
}

const sort = (values: Array<Array<number>>) => {
  const sortedArray: Array<Array<number>> = []

  const boo = values.map((value, index): [number, number] => [
    value.at(0)!,
    index
  ])

  Object.values(count(boo))
    .flatMap((position) => position)
    .forEach((index) => {
      sortedArray.push(values[index])
    })

  return sortedArray
}

export default sort
