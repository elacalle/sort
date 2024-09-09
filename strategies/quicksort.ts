const quicksort = (array: Array<number>): Array<number> => {
  if(array.length == 0) return array

  const pivotValue = array[Math.floor(array.length / 2)]
  const remaningValues = array.filter((x) => x != pivotValue )

  return [
    ...[
      ...quicksort(divide(remaningValues, (x) => x < pivotValue!)),
      pivotValue,
      ...quicksort(divide(remaningValues, (x) => x > pivotValue!))
    ]
  ]
}

const divide = (
  list: number[],
  comparator: (v: number) => boolean
): number[]  => {
  if(list.length == 0) return list

  const [head, ...tail] = list
  const filtered = comparator(head) ? [head] : []
  const filteredList = [...filtered, ...divide(tail, comparator)]

  return filteredList
}

export {quicksort, divide}
