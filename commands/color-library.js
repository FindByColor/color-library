'use strict'

const chalk = require('chalk')

const { getColors } = require('../dist')

module.exports = options => {
  // Check if we should generate all libraries ( none were specified )
  options.runAll = (!options.pantone && !options.ral)

  getColors(options).catch(err => {
    console.log(`\n${chalk.bold.red('✖ ERROR:')} Get Colors\n`)
    console.error(err)
    process.exit()
  })
}
