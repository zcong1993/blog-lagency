const fs = require(fs)
const glob = require('glob')
const { promisify } = require('util')

const escapeFile = async file => {
  const content = await fs.readFile(file, 'utf8')
  const unescaped = content
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '')
    .replace(/&#039;/g, "'")
  if (content === unescaped) {
    console.log(`${file} no change.`)
    return Promise.resolve()
  }
  console.log(`write file ${file}.`)
  return fs.writeFile(file, unescaped)
}

promisify(glob)('src/pages/articles/**/*.md').then(console.log)

escapeFile('src/pages/articles/koa-graphql-support-image-upload/index.md')
