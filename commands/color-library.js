'use strict'

const chalk = require('chalk')

const { getColors } = require('../dist')

module.exports = options => {
  options.noParams = (process.argv.slice(2).length === 0)

  getColors(options).catch(err => {
    console.log(`\n${chalk.bold.red('✖ ERROR:')} Get Colors\n`)
    console.error(err)
    process.exit()
  })
}
