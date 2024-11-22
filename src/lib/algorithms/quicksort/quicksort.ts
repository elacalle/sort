import { stack, StackType } from './stack'

const split = (list: number[], stack: StackType) => {
  const range = stack({action: 'POP'})
  
  if(!range || list.length == 1) { return }

  const[low, top] = range

  const chunk = list.slice(low, top + 1)
  const [pivot, ...tail] = chunk
  
  const minValues = filter(tail, (x) => x <= pivot)
  const maxValues = filter(tail, (x) => x > pivot)

  // adds low range
  if (minValues.length > 1) { stack({action: 'ADD', value: [low, low + minValues.length]}) }
  // adds high range
  if (maxValues.length > 1) { stack({action: 'ADD', value: [low + minValues.length + 1, low + minValues.length + maxValues.length]}) }

  const sortedValues = [...minValues, pivot, ...maxValues]

  for(let i = low; i <= top; i++) {
    list[i] = sortedValues[i - low]
  }
}

const sort = (list: number[]) => {
  const [sortStack, action] = stack()
  action({action: "ADD", value: [0, list.length - 1]})  

  do {
    split(list, action)
  } while (sortStack.length)
  
}

const filter = (list: number[], condition: (x: number) => boolean) => {
  return list.filter(condition)
}

export { split, sort }