import { IOutput } from ".."

class DummyOutput implements IOutput<unknown> {
  output: unknown[] = []
  
  write(value: any) {
    this.output.push(value)
  }
}
  
export default DummyOutput