import Loader from "./lib/extract/loader"
import fs from "fs"
import { program } from 'commander'
import bucketFactory from "./lib/extract/bucket/factory";
import { Run, RunFactory } from "./lib/merge/run";
import Evaluator from "./lib/merge/evaluator";
import Director from "./lib/merge/director";
import StdOutput from "./lib/output/stdOutput";
import resolvePath from "./lib/path/resolve";

const main = async () => {
  let filePath = ''

  program.name("sort").description('sort UTF-8 files').version("0.1")
  program.helpOption('-h', 'help')

  program.argument('<file>', 'file path').action((path) => {
    filePath = path
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
  const stream = fs.createReadStream(filePath);

  const bucketFileFactory = bucketFactory('file')
  const loader = new Loader(bucketFileFactory, stream)
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