import $ from 'cheerio'
import chalk from 'chalk'
import Color from 'color'
import sanitizeHtml from 'sanitize-html'

import { Harmonizer } from 'color-harmony'

import nearestColor from '../lib/nearest-color'
import write from '../lib/write'

import { getDOM, leftPad, makeRequest, titleCase } from '../lib/utils'

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

      // Prepare Color for Output
      const color = Color(hex)
      const harmonizer = new Harmonizer()
      const percentComplete = Math.round(((index + 1) / $rows.length) * 100)
      const harmony = harmonizer.harmonizeAll(hex)
      const nearest = nearestColor(hex, 'RAL', 'Colors', hasFilters
        ? `Filters => ${filtering.join(' | ')}`
        : `Page 1/1 ${leftPad(percentComplete, 3, ' ')}%`)

      // Generate Output
      const output = {
        library: [
          {
            space: 'ral',
            collection: null,
            set: null,
            color: {
              code: code,
              name: titleCase(name)
            }
          }
        ],
        color: {
          hex: hex,
          rgb: color.object(),
          cmyk: color.cmyk().round().object(),
          hsl: color.hsl().round().object(),
          cssHSL: color.hsl().round().toString(),
          cssRGB: color.toString()
        },
        harmony: harmony,
        nearest: nearest,
        meta: {
          grayscale: color.grayscale().hex(),
          inverse: color.negate().hex(),
          isDark: color.isDark(),
          isLight: color.isLight(),
          luminosity: color.luminosity()
        }
      }

      // Create File Info
      const dir = 'pal'
      const file = `${hex.replace('#', '')}.json`

      // Write Output
      if (!options.dry) {
        write(dir, file, output)
      }
    })

    // Let Script know we are Done
    return true
  }).catch(err => {
    console.log(`\n${chalk.bold.red('✖ ERROR:')} RAL Parser\n`)
    console.error(err)
  })
}
