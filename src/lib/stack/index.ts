type StackType<T> = (action: AddAction<T> | PopAction) => T | undefined | null

type AddAction<T> = {
  action: 'ADD'
  value: T
}

type PopAction = {
  action: 'POP'
}

const stack = <T>() => {
  const stack: Array<T> = []

  const action: StackType<T> = (command) => {
    const { action } = command

    switch (action) {
      case 'ADD':
        stack.push(command.value)
        break
      case 'POP':
        return stack.shift()
      default:
        throw 'Unknown command'
    }
  }

  return [stack, action] as const
}

export { stack }
export type { StackType }
