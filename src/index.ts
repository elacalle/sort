import Loader from './lib/extract/loader'
import fs from 'fs'
import { program } from 'commander'
import bucketFactory from './lib/extract/bucket/factory'
import { Run, RunFactory } from './lib/merge/run'
import Evaluator from './lib/merge/evaluator'
import Director from './lib/merge/director'
import StdOutput from './lib/output/stdOutput'
import resolvePath from './lib/path/resolve'
import { default as radix } from './lib/algorithms/radixsort'
import { default as quick } from './lib/algorithms/quicksort'

const SORT_STRATEGIES = {
  quick: quick,
  radix: radix
}

type SortTypes = keyof typeof SORT_STRATEGIES

const main = async () => {
  let filePath = ''
  let sortStrategy = quick

  program.name('sort').description('sort UTF-8 files').version('0.1')
  program.helpOption('-h', 'help')

  program
    .argument('<file>', 'file path')
    .option('-a, --sort [type]', 'set the algorithm to sort your collection')
    .action((path, options) => {
      filePath = path
      const sortAlgorithm: SortTypes = (options['sort'] =
        options['sort'] || 'quick')

      sortStrategy = SORT_STRATEGIES[sortAlgorithm] || quick
    })

  program.parse()

  try {
    filePath = resolvePath(filePath)
  } catch {
    process.stderr.write('missing file\n')
    process.exitCode = 0
    process.exit()
  }

  const runs: Run[] = []
  const evaluator = new Evaluator()
  const stream = fs.createReadStream(filePath)

  const bucketFileFactory = bucketFactory('file')
  const loader = new Loader(bucketFileFactory, stream, sortStrategy)
  await loader.call()

  const buckets = loader.getBuckets()
  const runFactory = new RunFactory(evaluator)

  buckets.forEach((bucket) => {
    const run = runFactory.instance()
    run.setBucket(bucket)
    runs.push(run)
  })

  const director = new Director(evaluator, runs, new StdOutput())

  await director.call()

  buckets.forEach((bucket) => bucket.drop())
}

main()
