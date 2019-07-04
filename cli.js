#!/usr/bin/env node

const fs = require('fs')
const theredoc = require('theredoc')

const htmlToPreactH = require('./index')

const file = process.argv[2]

if (file) {
  fs.readFile(file, (err, data) => {
    if (err) throw err
    console.log(htmlToPreactH(data.toString()))
  })
} else {
  console.warn(theredoc`
    Usage:
      html-to-preact-h [FILE]
  `)
  process.exit(1)
}
