const fs = require('fs')
const { promisify } = require('util')
const globby = require('globby')

const unescapeFile = async file => {
  const content = await promisify(fs.readFile)(file, 'utf8')
  const unescaped = content
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
  if (content === unescaped) {
    console.log(`${file} no change.`)
    return Promise.resolve()
  }
  console.log(`write file ${file}`)
  return promisify(fs.writeFile)(file, unescaped)
}

globby('src/pages/articles/**/*.md')
  .then(files => Promise.all(files.map(file => unescapeFile(file))))
  .then(() => console.log('all done'))
  .catch(console.log)
