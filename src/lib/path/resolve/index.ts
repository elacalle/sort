import { existsSync } from 'fs'
import { isAbsolute, resolve } from 'path'

const resolvePath = (path: string) => {
  const filePath = isAbsolute(path) ? path : resolve(process.cwd(), path)

  if (!existsSync(filePath)) throw new Error('File does not exist')

  return filePath
}

export default resolvePath
