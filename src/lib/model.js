import Chroma from 'chroma-js'

import { Harmonizer } from 'color-harmony'

import { titleCase } from './utils'
import nearestColor from './nearest-color'

/**
 * Standardized Color Model
 * @param {String} library Name of Library
 * @param {String} collection Name of Collection within Library
 * @param {String} set Name of Set within Collection
 * @param {String} code Color Code used by Library to refer to Color
 * @param {String} name Color Name used by Library to refer to Color
 * @param {String} hex HEX Code of Color
 * @param {String} progressLabel Progress Indicator for Rendering Purposes
 * @returns
 */
export default function model (library, collection, set, code, name, hex, progressLabel) {
  // Check if Color is Valid
  if (!Chroma.valid(hex)) {
    return false
  }

  // Prepare Color for Output
  const chroma = Chroma(hex)
  const colorName = chroma.name()
  const harmonizer = new Harmonizer()
  const harmony = harmonizer.harmonizeAll(hex)
  const luminance = chroma.luminance()
  const nearest = nearestColor(hex, library, collection, progressLabel)

  // Create Standardized Model
  const output = {
    library: [
      {
        name: library,
        collection: collection,
        set: set,
        color: {
          code: code,
          name: titleCase(name)
        }
      }
    ],
    meta: {
      isDark: luminance <= 0.5,
      isLight: luminance > 0.5,
      luminosity: luminance
    },
    css: {
      name: colorName.toLowerCase() !== hex.toLowerCase() ? colorName : null,
      hex: hex,
      hsl: chroma.css('hsl'),
      rgb: chroma.css('rgb')
    },
    space: {
      cmyk: chroma.cmyk(),
      hcl: chroma.hcl(),
      hex: hex,
      hsi: chroma.hsi(),
      hsl: chroma.hsl(),
      hsv: chroma.hsv(),
      lab: chroma.lab(),
      lch: chroma.lch(),
      rgb: chroma.rgb()
    },
    harmony: harmony,
    nearest: nearest
  }

  return output
}
