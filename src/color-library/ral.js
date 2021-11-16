import $ from 'cheerio'
import chalk from 'chalk'
import sanitizeHtml from 'sanitize-html'

import model from '../lib/model'
import write from '../lib/write'

import { getDOM, leftPad, makeRequest } from '../lib/utils'

// Define Library Name
const libraryCode = 'ral'

/**
 * RAL Library
 * @param {String} url URL of Library
 * @param {Object} options CLI Options
 * @returns {Promise}
 */
export default function RAL (url, options) {
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
    const hasFilters = (options.name || options.code || options.hex)

    // Load HTML into Virtual DOM
    const $html = getDOM(html)

    // Loop through Table rows
    const $rows = $html('.ral-index table tbody tr')
    $rows.each((index, element) => {
      const tds = $(element).find('td')
      const code = $(tds[0]).text() || null
      const hex = $(tds[2]).text() || null
      const name = $(tds[4]).text() || null

      // Store used filters
      const filtering = []

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
        : `Page 1/1 ${leftPad(percentComplete, 3, ' ')}%`

      // Generate Output from Model
      const output = model(libraryCode, null, null, code, name, hex, progressLabel)

      // Make sure we got output
      if (!output) {
        return false
      }

      // Create File Info
      const dir = libraryCode
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
