import Token from "../../token"
import { split, SplittedValues } from "./split"
import { Address, stack, StackType } from "./stack"

const quickSort = (originalList: (number[] | Token[])) => {
  const list = [...originalList] as  number[] | Token[]
  const [sortStack, action] = stack()
  action({action: "ADD", value: [0, list.length - 1]})  
  
  do {
    const address = action({action: 'POP'})

    if(!address) { return }

    const[x, y] = address
    const chunk = list.slice(x, y + 1)
    const splittedValues = split(chunk)

    pushRemaningStack(splittedValues, address, action)
    copyValues(list, splittedValues, address)
  } while (sortStack.length)

  return list
}

const pushRemaningStack = (splittedValues: SplittedValues, address: Address, action: StackType) => {
  const [minValues, _, maxValues] = splittedValues
  const[low,] = address

   // adds low range
   if (minValues.length > 1) { action({action: 'ADD', value: [low, low + minValues.length - 1]}) }
   // adds high range
   if (maxValues.length > 1) { action({action: 'ADD', value: [low + minValues.length + 1, low + minValues.length + maxValues.length]}) }
}

const copyValues = (list: number[] | Token[], splittedValues: SplittedValues, address: Address) => {
  const[x, y] = address
  const [minValues, pivot, maxValues] = splittedValues
  const sortedValues = [...minValues, ...pivot, ...maxValues]

  for(let i = x; i <= y; i++) {
    // FIXME: if statement in order to avoid null pointer error
    if(sortedValues[i - x]) {
      list[i] = sortedValues[i - x]
    }
  }
}

export default quickSort