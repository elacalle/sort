type Address = [number, number] 

type StackType = (action: AddAction | PopAction ) => Address | undefined | null

type AddAction = {
  action: 'ADD',
  value: Address
}

type PopAction = {
  action: 'POP',
}

const stack = () => {
    const stack: Array<Address> = []
    
    const action: StackType = (command) => {
      const {action} = command
  
      switch(action) {
        case 'ADD':
            stack.push(command.value)
          break;
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