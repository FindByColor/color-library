#!/usr/bin/env node

'use strict'

const chalk = require('chalk')
const path = require('path')
const yargs = require('yargs')

// Generate CLI Options
const cli = yargs
  .scriptName('color-library')
  .usage(`\n${chalk.cyan.bold('Usage:')} ${chalk.bold.green('color-library')} ${chalk.dim('--options')}`)
  .updateStrings({
    'Options:': chalk.cyan('Options:\n'),
    'Examples:': chalk.cyan('Examples:\n')
  })
  .fail((msg, err, yargs) => {
    yargs.showHelp()
    console.log(`\n${chalk.bold.red('✖ ERROR:')} CLI\n`)
    console.error(msg)
    process.exitCode = 1
  })
  .options({
    pantone: {
      alias: 'p',
      describe: 'Generate Pantone Color Library',
      type: 'boolean',
      default: false
    },
    ral: {
      alias: 'r',
      describe: 'Generate RAL Color Library',
      type: 'boolean',
      default: false
    },
    collection: {
      alias: 'c',
      describe: 'Filter Colors by Collection',
      type: 'string',
      default: null
    },
    set: {
      alias: 's',
      describe: 'Filter Colors by Set',
      type: 'string',
      default: null
    },
    name: {
      alias: 'n',
      describe: 'Filter Colors by Name',
      type: 'string',
      default: null
    },
    code: {
      alias: 'x',
      describe: 'Filter Colors by Code',
      type: 'string',
      default: null
    },
    hex: {
      alias: 'h',
      describe: 'Filter Colors by HEX',
      type: 'string',
      default: null
    }
  })
  .command('*', 'Run Color Library Generator')
  .wrap(100)
  .example('color-library', 'Generate All Libraries')
  .example('color-library --ral', 'Generate RAL Library')
  .example('color-library --pantone', 'Generate Pantone Library')
  .example('color-library -p -collection=fashion', 'Generate Pantone Fashion Library')
  .example('color-library -p -c=fashion --set=cotton', 'Generate Pantone Fashion Cotton Library')
  .example('color-library --name=blue', 'Generate Library from Names Containing "blue"')
  .example('color-library --code=tpx', 'Generate Library from Codes Containing "tpx"')
  .example('color-library --hex=abc', 'Generate Library from HEX Colors Starting with "abc"')
  .help('help')
  .epilogue(`${chalk.bold.cyan('Need Help?')} https://github.com/FindByColor/color-library`)
  .version().argv

// Load CLI Command
require(path.join(__dirname, '../commands/color-library.js'))(cli)

module.exports = cli
