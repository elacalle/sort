import DummyBucket from '../dummyBucket'
import FileBucket from '../fileBucket'

type FactoryKind = 'dummy' | 'file'

const bucketFactory = (kind: FactoryKind) => {
  switch (kind) {
    case 'dummy':
      let dummyFactory = () => {
        let id = 0

        return () => {
          id++

          return new DummyBucket(id)
        }
      }

      return dummyFactory()
    case 'file':
      let fileFactory = () => {
        let id = 0

        return () => {
          id++

          return new FileBucket(id)
        }
      }

      return fileFactory()
    default:
      throw new Error('Unknown bucket factory')
  }
}

export default bucketFactory
