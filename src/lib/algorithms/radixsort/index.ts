import Token from '../../token'
import { stack as useStack, StackType } from '../../stack'
import { ac } from 'vitest/dist/chunks/reporters.C_zwCd4j'

type Stack = {
  level: number
  position: [number, number]
}

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

const group = (values: Array<Token>, level: number): Map<number, Token[]> => {
  const numericValues: Array<number> = []
  const valuesGroupedByOrder: Map<number, Token[]> = new Map()

  const groupedValues: Map<number, Token[] | undefined> = values.reduce(
    (previous: Map<number, Array<Token> | undefined>, value) => {
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
    (valuesGroupedByOrder.values().next().value || []).filter((x: Token) =>
      x.at(level)
    ).length < 1
    ? new Map()
    : valuesGroupedByOrder
}

const stackByGroup = (
  grouped: Map<number, Token[]>,
  startIndex: number | undefined = 0
): Array<[number, number]> => {
  let index = startIndex || 0
  const stack: Array<[number, number]> = []

  grouped.forEach((value) => {
    stack.push([index, index + value.length])

    index += value.length
  })

  return stack
}

export interface StackElement {
  level: number
  position: [number, number]
}

const sort = (values: Token[]) => {
  const [stack, action] = useStack<Stack>()
  action({ action: 'ADD', value: { level: 0, position: [0, values.length] } })

  do {
    const stackElement = action({ action: 'POP' })

    if (stackElement == undefined) {
      break
    }

    const [start, end] = stackElement.position
    let startIndex = start
    const arrayToSort = values.slice(start, end)

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

    const nextStack = stackByGroup(groupedResult, start).map((position) => {
      return {
        level: stackElement.level + 1,
        position
      }
    })

    if (nextStack.length == 0) {
      continue
    } else {
      nextStack.forEach((element) => {
        action({ action: 'ADD', value: element })
      })
    }
  } while (stack.length)

  return values
}

export { max, min, group, stackByGroup }
export default sort
