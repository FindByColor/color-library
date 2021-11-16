import $ from 'cheerio'
import chalk from 'chalk'
import sanitizeHtml from 'sanitize-html'

import model from '../lib/model'
import write from '../lib/write'

import { getDOM, getPantoneSet, leftPad, makeRequest } from '../lib/utils'

// Define Library Name
const libraryCode = 'pantone'

/**
 * Pantone Library
 * @param {String} url URL of Library
 * @param {String} collection Label for Collection
 * @param {String} progress Progress Indicator
 * @param {Object} options CLI Options
 * @returns {Promise}
 */
export default function Pantone (url, collection, progress, options) {
  return makeRequest(url).then(data => {
    let html = data.html || null

    // Cleanup HTML as parser will fail to extract data from within unclosed HTML Tags
    if (html) {
      html = sanitizeHtml(html, {
        allowedTags: false,
        allowedAttributes: false,
        allowVulnerableTags: true
      })
    }

    // Check if we have filters
    const hasFilters = (options.set || options.name || options.code || options.hex)

    // Load HTML into Virtual DOM
    const $html = getDOM(html)

    // Loop through Table rows
    const $rows = $html('.pantone-index table tbody tr')
    $rows.each((index, element) => {
      const tds = $(element).find('td')
      const code = $(tds[0]).text() || null
      const hex = $(tds[2]).text() || null
      const name = $(tds[3]).text() || null

      const set = getPantoneSet(code)

      // Store used filters
      const filtering = []

      // Check if we are filtering by Set
      if (options.set) {
        filtering.push(`SET: ${options.set}`)

        const setKeyword = options.set.toLowerCase()
        const setTarget = set.toLowerCase()

        if (setTarget.indexOf(setKeyword) === -1) {
          return true
        }
      }

      // Check if we are filtering by Name
      if (options.name) {
        filtering.push(`NAME: ${options.name}`)

        const nameKeyword = options.name.toLowerCase()
        const nameTarget = name.toLowerCase()

        if (nameTarget.indexOf(nameKeyword) === -1) {
          return true
        }
      }

      // Check if we are filtering by Code
      if (options.code) {
        filtering.push(`CODE: ${options.code}`)

        const codeKeyword = options.code.toLowerCase()
        const codeTarget = code.toLowerCase()

        if (codeTarget.indexOf(codeKeyword) === -1) {
          return true
        }
      }

      // Check if we are filtering by HEX
      if (options.hex) {
        filtering.push(`HEX: ${options.hex}`)

        const hexKeyword = options.hex.toLowerCase().replace('#', '')
        const hexTarget = hex.toLowerCase().replace('#', '')

        if (!hexTarget.startsWith(hexKeyword)) {
          return true
        }
      }

      // Calculate Progress
      const percentComplete = Math.round(((index + 1) / $rows.length) * 100)
      const progressLabel = hasFilters
        ? `Filters => ${filtering.join(' | ')}`
        : `Page ${progress} ${leftPad(percentComplete, 3, ' ')}%`

      // Generate Output from Model
      const output = model(libraryCode, collection, set, code, name, hex, progressLabel)

      // Make sure we got output
      if (!output) {
        return false
      }

      // Create File Info
      const dir = `${libraryCode}/${collection}/${set}`
      const file = `${hex.replace('#', '')}.json`

      // Write Output if not Dry Run
      if (!options.dry) {
        write(dir, file, output)
      }
    })

    // Let Script know we are Done
    return true
  }).catch(err => {
    console.log(`\n${chalk.bold.red('✖ ERROR:')} ${libraryCode} parser\n`)
    console.error(err)
  })
}
