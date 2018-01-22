const fs = require('fs')
const handlebars = require('handlebars')

exports.exists = p => {
  return fs.existsSync(p)
}

exports.mkdir = p => {
  return fs.mkdirSync(p)
}

exports.writeFile = fs.writeFileSync

const tpl = `
---
title: {{title}}
date: "{{date}}"
layout: {{layout}}
path: "{{path}}"
categories:
{{#each categories as |categorie|}}
  - {{categorie}}
{{/each}}
---

> {{title}}
`

exports.tpl = tpl

exports.render = handlebars.compile(tpl)
