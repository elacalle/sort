import Token from '../../token'
import { split, SplittedValues } from './split'
import { stack, StackType } from '../../stack'

type Address = [number, number]

const quickSort = (originalList: Token[]) => {
  const list = [...originalList]
  const [sortStack, action] = stack<Address>()
  action({ action: 'ADD', value: [0, list.length] })

  do {
    const address = action({ action: 'POP' })

    if (!address) {
      return
    }

    const [x, y] = address
    const chunk = list.slice(x, y)
    const splittedValues = split(chunk)

    pushRemaningStack(splittedValues, address, action)
    copyValues(list, splittedValues, address)
  } while (sortStack.length)

  return list
}

const pushRemaningStack = (
  splittedValues: SplittedValues,
  address: Address,
  action: StackType<Address>
) => {
  const [minValues, _, maxValues] = splittedValues
  const [low] = address

  // adds low range
  if (minValues.length > 1) {
    action({ action: 'ADD', value: [low, low + minValues.length] })
  }

  // adds high range
  if (maxValues.length > 1) {
    action({
      action: 'ADD',
      value: [
        low + minValues.length + 1,
        low + minValues.length + maxValues.length + 1
      ]
    })
  }
}

const copyValues = (
  list: number[] | Token[],
  splittedValues: SplittedValues,
  address: Address
) => {
  const [x, y] = address
  const [minValues, pivot, maxValues] = splittedValues
  const sortedValues = [...minValues, ...pivot, ...maxValues]

  if (sortedValues.length != y - x) {
    throw 'Allocated address missmatch'
  }

  for (let i = x; i < y; i++) {
    list[i] = sortedValues[i - x]
  }
}

export default quickSort
