'use strict'

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const zip = require('cross-zip')

const { getColors } = require('../dist')

const libraryDir = path.join(__dirname, '../', 'libraries')
const zipFile = path.join(__dirname, '../', 'libraries.zip')

module.exports = options => {
  // Check if we should generate all libraries ( none were specified )
  options.runAll = (!options.pantone && !options.ral)

  getColors(options).then(() => {
    // Zip Libraries Folder when Complete
    console.log('\nCompressing Libraries ...')

    // Check if libraries.zip and delete it first
    if (fs.existsSync(zipFile)) {
      console.log('Removing Previous ZIP File ...')
      rimraf.sync(zipFile)
    }

    // Make sure libraries folder exists
    if (fs.existsSync(libraryDir)) {
      console.log('Creating ZIP File ...')
      zip.zipSync(libraryDir, zipFile)
      console.log(`Complete: ${zipFile}\n`)
    } else {
      console.log(`\n${chalk.bold.red('✖ ERROR:')} ${libraryDir} does not exist\n`)
    }
  }).catch(err => {
    console.log(`\n${chalk.bold.red('✖ ERROR:')} Get Colors\n`)
    console.error(err)
    process.exit()
  })
}
