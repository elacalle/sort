import { describe, test, expect }  from "vitest"
import { sort, split } from "./quicksort"
import { stack } from "./stack"

describe("split", () => {
  test('splits the array in lower and higher numbers', () => {
    let numbers = [6,13,5,4,44,2,14]

    const [sortStack, action] = stack()
    action({action: "ADD", value: [0, numbers.length - 1]})  
    
    split(numbers, action)

    expect([0, 3]).toEqual(sortStack[0])
    expect([4, 6]).toEqual(sortStack[1])
  })
})

describe("sort", () => {
  test("sort values in asc order", () => {
    const numeros = [
      23, 5, 77, 92, 16, 33, 49, 60, 87, 3, 
      41, 99, 27, 11, 58, 75, 19, 46, 84, 2, 
      39, 71, 95, 14, 50, 8, 64, 29, 90, 6, 
      36, 78, 52, 12, 68, 25, 81, 4, 43, 96, 
      32, 18, 54, 67, 22, 88, 10, 40, 73, 1, 
      30, 93, 65, 15, 48, 70, 17, 85, 7, 57, 
      24, 79, 47, 13, 61, 34, 98, 21, 45, 83, 
      9, 63, 38, 72, 31, 94, 20, 59, 82, 35, 
      56, 28, 76, 42, 100, 66, 37, 91, 53, 74, 
      69, 26, 62, 80, 44, 97, 55, 86, 51, 89
    ];

    sort(numeros)
    
    expect(numeros).toBe(numeros.sort((a ,b) => a - b))
  })
})

