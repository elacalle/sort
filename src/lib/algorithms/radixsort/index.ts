const max = (numbers: Array<number>) => {
  return numbers.reduce((prev, current) => {
    return current > prev ? current : prev
  }, Number.MIN_SAFE_INTEGER)
}

const min = (numbers: Array<number>) => {
  return numbers.reduce((prev, current) => {
    return current < prev ? current : prev
  }, Number.MAX_SAFE_INTEGER)
}

const group = (values: Array<Array<number>>, level: number) => {
  const numericValues: Array<number> = []
  const valuesGroupedByOrder: Map<number, Array<Array<number>>> = new Map()

  const groupedValues: Map<number, Array<Array<number>>> = values.reduce(
    (previous: Map<number, Array<Array<number>> | undefined>, value) => {
      const postionValue = value.at(level)
      const key =
        postionValue != undefined && postionValue >= 0 ? value.at(level) : -1

      if (typeof key == 'number' && !previous.has(key)) {
        numericValues.push(key)
        previous.set(key, [])
      }

      if (typeof key == 'number' && previous.has(key)) {
        previous.get(key)?.push(value)
      }

      return previous
    },
    new Map()
  )

  const minValue = min(numericValues)
  const maxValue = max(numericValues)

  for (let i = minValue; i <= maxValue; i++) {
    const value = groupedValues.get(i)

    if (value) {
      valuesGroupedByOrder.set(i, value)
    }
  }

  return valuesGroupedByOrder.size == 1 &&
    (valuesGroupedByOrder.values().next().value || []).filter((x) =>
      x.at(level)
    ).length < 1
    ? new Map()
    : valuesGroupedByOrder
}

const stackByGroup = (
  grouped: Map<number, Array<Array<number>>>
): Array<[number, number]> => {
  let index = 0
  const stack: Array<Array<number>> = []

  grouped.forEach((value) => {
    stack.push([index, index + value.length])

    index += value.length
  })

  return stack
}

interface StackElement {
  level: number
  position: [number, number]
}

const sort = (values: Array<Array<number>>) => {
  let stack: Array<StackElement> = [{ level: 0, position: [0, values.length] }]

  do {
    const stackElement = stack.pop()

    if (stackElement == undefined) {
      break
    }

    const [start, end] = stackElement.position
    let startIndex = start
    const arrayToSort = values.slice(start, end)

    console.log(stackElement)

    if (
      arrayToSort
        .map((values) => values.at(stackElement.level))
        .every(
          (x) => x == arrayToSort[0].at(stackElement.level) && x != undefined
        )
    ) {
      if (stackElement) {
        stack.push({ ...stackElement, level: stackElement.level + 1 })

        continue
      }
    }

    const groupedResult = group(arrayToSort, stackElement.level)

    groupedResult.forEach((sortedValues) => {
      sortedValues.forEach((value) => {
        values[startIndex] = value
        startIndex += 1
      })
    })

    const nextStack = stackByGroup(groupedResult).map((position) => ({
      level: stackElement.level + 1,
      position
    }))

    if (nextStack.length == 0) {
      continue
    } else {
      stack = nextStack
    }
  } while (stack.length)

  return values
}

export { max, min, group, stackByGroup }
export default sort
