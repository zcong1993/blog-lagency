const path = require('path')
const parseArgs = require('minimist')
const tinyDate = require('tinydate')
const { exists, mkdir, render, writeFile } = require('./utils')

const argv = parseArgs(process.argv.slice(2))
const format = tinyDate(`{YYYY}-{MM}-{DD}`)

const initConfig = argv => {
  const defaultConfig = {
    title: 'new Post',
    date: new Date(argv.date || ''),
    layout: 'post',
    categories: ['default'],
  }

  const normalizedname = defaultConfig.title
    .toLowerCase()
    .split(' ')
    .join('-')

  defaultConfig.path = `/${normalizedname}/`
  defaultConfig.filePath = `${format(defaultConfig.date)}-${normalizedname}`
  defaultConfig.date = tinyDate(`{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}`)(
    defaultConfig.date
  )
  delete argv.date
  delete argv._

  const config = Object.assign({}, defaultConfig, argv)
  config.categories = Array.isArray(config.categories)
    ? [...config.categories]
    : [config.categories]
  config.categories = [...new Set(config.categories)]
  return config
}

const defaultConfig = initConfig(argv)

const folderPath = path.resolve(
  __dirname,
  '../../src/pages/articles',
  defaultConfig.filePath
)
const filePath = path.join(folderPath, 'index.md')

if (exists(folderPath)) {
  console.log(`\nfolder exists, ${folderPath}\n`)
} else {
  mkdir(folderPath)
}

if (exists(filePath)) {
  console.log(`\nfile exists, ${filePath}\n`)
  process.exit(0)
}

const file = render(defaultConfig)

writeFile(filePath, file)

console.log(`\ncreate file ${filePath}`)
