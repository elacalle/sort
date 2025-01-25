import { IOutput } from '..'

class StdOutput implements IOutput<unknown> {
  output: unknown[] = []

  write(value: any) {
    process.stdout.write(`${value}\n`)
  }
}

export default StdOutput
