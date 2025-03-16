import { describe, test, expect } from 'vitest'
import Loader from '.'
import { Readable } from 'stream'
import bucketFactory from '../bucket/factory'
import sort from '../../algorithms/quicksort'

describe('Loader', () => {
  test('receives the sorted bucket', async () => {
    const text = `The\nProject\nGutenberg\neBook\nof\nThe\nArt\nof\nWar`
    const stream = Readable.from(text)
    const loader = new Loader(bucketFactory('dummy'), stream, sort, 64)
    const sortedBucketText: string[] = []

    await loader.call()

    const [bucket, _] = loader.getBuckets()

    do {
      sortedBucketText.push(bucket.current().toString())
      bucket.next()
    } while (bucket.hasNext())

    expect(sortedBucketText).toEqual([
      'Art',
      'eBook',
      'Gutenberg',
      'of',
      'of',
      'Project',
      'The',
      'The',
      'War'
    ])
  })
})
