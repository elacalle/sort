import { split } from "./split"
import { stack } from "./stack"

export default (list: number[]) => {
  const [sortStack, action] = stack()
  action({action: "ADD", value: [0, list.length - 1]})  
  
  do {
    const range = action({action: 'POP'})

    if(!range) { return }

    const[low, top] = range

    const chunk = list.slice(low, top + 1)

    const [minValues, pivot, maxValues] = split(chunk)

    // adds low range
    if (minValues.length > 1) { action({action: 'ADD', value: [low, low + minValues.length]}) }
    // adds high range
    if (maxValues.length > 1) { action({action: 'ADD', value: [low + minValues.length + 1, low + minValues.length + maxValues.length]}) }

    const sortedValues = [...minValues, ...pivot, ...maxValues]

    for(let i = low; i <= top; i++) {
      list[i] = sortedValues[i - low]
    }

  } while (sortStack.length)
}