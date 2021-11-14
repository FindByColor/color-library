'use strict'

import chalk from 'chalk'
import chroma from 'chroma-js'
import Color from 'color'

import namedColors from './named-colors'

export default function nearestColor (hex, space, label, progress) {
  const activeColor = chroma(hex)
  const colorObj = Color(hex)
  const textColor = colorObj.isDark() ? '#FFFFFF' : '#000000'

  // Store Comparison Results
  const results = []

  // Generate Comparison of Color against Named Reference Colors
  namedColors.forEach(color => {
    const deltaE = chroma.deltaE(activeColor, chroma(color.hex))
    const distance = chroma.distance(activeColor, chroma(color.hex))

    // Push Color Comparison
    results.push({
      name: color.name,
      hex: color.hex,
      deltaE: deltaE,
      distance: distance
    })

    // If deltaE is less than one, we can exit the loop since it's a near perfect match
    if (deltaE <= 1) {
      // Exit loop early
      return false
    }

    return true
  })

  // Sort Results by Best Match
  results.sort((a, b) => (a.deltaE > b.deltaE) ? 1 : -1)

  // Get Best Match Info
  const matchDeltaE = parseFloat(results[0].deltaE).toFixed(4)
  const matchHex = results[0].hex

  // Setup String for Output
  let comparison = matchDeltaE

  // Use Delta E to check visual perception rating ( SEE: http://zschuessler.github.io/DeltaE/learn/ )
  if (matchDeltaE <= 1) {
    // Not perceptible by human eyes
    comparison = chalk.bold.green(matchDeltaE)
  } else if (matchDeltaE < 2) {
    // Perceptible through close observation.
    comparison = chalk.green(matchDeltaE)
  } else if (matchDeltaE < 5) {
    // Perceptible at a glance
    comparison = chalk.yellow(matchDeltaE)
  } else if (matchDeltaE < 10) {
    // More Perceptible at a glance
    comparison = chalk.magenta(matchDeltaE)
  } else {
    // Colors are more similar than opposite until ( >= 50 they do not look similar )
    comparison = chalk.red(matchDeltaE)
  }

  // Generate Pretty Output
  console.log(`${chalk.cyan(space)} ${label} ${chalk.dim(progress)} ${chalk.dim(':')} ${chalk.bgHex(hex).hex(textColor).bold(' ' + hex + ' ')} <=> ${chalk.bgHex(matchHex).hex(textColor).bold(' ' + matchHex + ' ')} ${chalk.dim('ΔE')} ${comparison}`)

  // Send back best result
  return results[0]
}
