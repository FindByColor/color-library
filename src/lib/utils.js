import $ from 'cheerio'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import md5 from 'md5'
import https from 'https'

const maxCacheAge = 2592000000 // 30 days
const cacheDir = path.join(__dirname, '../', '../', '.cache')

export function getDOM (html) {
  let $html

  if (typeof html === 'string') {
    $html = $.load(html, {
      xmlMode: true
    })
  } else if ($(html).cheerio) {
    $html = html
  } else {
    throw new Error('Invalid argument: pass valid html string or cheerio object')
  }

  return $html
}

export function getPantoneSet (code) {
  if (!code) {
    return null
  }

  let label = 'unknown'
  let num = 0
  let setCode = ''

  const basePastelsCoated = ['0131 C', '0331 C', '0521 C', '0631 C', '0821 C', '0921 C', '0961 C']
  const basePastelsUncoated = ['0131 U', '0331 U', '0521 U', '0631 U', '0821 U', '0921 U', '0961 U']

  if (code.substr(0, 2) === 'P ') {
    if (code.substr(-2) === ' C') {
      setCode = 'PC'
    } else if (code.substr(-2) === ' U') {
      setCode = 'PU'
    }
  } else if (code.substr(-2) === ' C') {
    if (code.length === 5) {
      num = parseInt(code.substr(0, 3))

      if ((num >= 801 && num <= 814) || (num >= 901 && num <= 942)) {
        setCode = 'NC'
      } else if (num >= 871 && num <= 877) {
        setCode = 'MC'
      }
    } else if (code.length === 6) {
      num = parseInt(code.substr(0, 4))
      if (num >= 8001 && num <= 8965) {
        setCode = 'MC'
      } else if ((num >= 9020 && num <= 9603) || (basePastelsCoated.indexOf(code) > -1)) {
        setCode = 'PAC'
      }
    } else if (code.length === 7) {
      num = parseInt(code.substr(0, 5))
      if (num >= 10101 && num <= 10399) {
        setCode = 'MC'
      }
    }

    setCode = 'C'
  } else if (code.substr(-2) === ' U') {
    if (code.length === 5) {
      num = parseInt(code.substr(0, 3))
      if ((num >= 801 && num <= 814) || (num >= 901 && num <= 942)) {
        setCode = 'NU'
      }
    } else if (code.length === 6) {
      num = parseInt(code.substr(0, 4))
      if ((num >= 9020 && num <= 9603) || basePastelsUncoated.indexOf(code) > -1) {
        setCode = 'PAU'
      }
    }

    setCode = 'U'
  } else if (code.substr(-3) === ' CP') {
    setCode = 'CP'
  } else if (code.substr(-3) === ' UP') {
    setCode = 'UP'
  } else if (code.substr(-3) === 'XGC') {
    setCode = 'XGC'
  } else if (code.substr(-3) === 'TCX') {
    setCode = 'TCX'
  } else if (code.substr(-3) === 'TPG') {
    setCode = 'TPG'
  } else if (code.substr(-3) === 'TPX') {
    setCode = 'TPX'
  } else if (code.substr(-3) === ' TN') {
    setCode = 'TN'
  } else if (code.substr(-3) === ' SP') {
    setCode = 'SP'
  } else if (code.substr(0, 3) === 'PQ-') {
    setCode = 'PQ'
  }

  switch (setCode) {
    // https://www.pantone.com/formula-guide-coated-uncoated
    case 'C':
      label = 'coated'
      break
    case 'U':
      label = 'uncoated'
      break

    // https://www.pantone.com/cmyk-color-guide-coated-uncoated
    case 'PC':
      label = 'cmyk-coated'
      break
    case 'PU':
      label = 'cmyk-uncoated'
      break

    // https://www.pantone.com/color-bridge-guide-set-coated-uncoated
    case 'CP':
      label = 'color-bridge-coated'
      break
    case 'UP':
      label = 'color-bridge-uncoated'
      break

    // https://www.pantone.com/extended-gamut-coated-guide
    case 'XGC':
      label = 'extended-gamut-coated'
      break

    // https://www.pantone.com/pastels-neons-guide-coated-uncoated
    case 'NC':
      label = 'neons-coated'
      break
    case 'NU':
      label = 'neons-uncoated'
      break
    case 'PAC':
      label = 'pastels-coated'
      break
    case 'PAU':
      label = 'pastels-uncoated'
      break

    // https://www.pantone.com/metallics-guide
    case 'MC':
      label = 'metallics-coated'
      break

    // https://www.pantone.com/fashion-home-interiors-color-guide
    case 'TPX':
      label = 'textile-paper-extended'
      break
    case 'TPG':
      label = 'textile-paper-green'
      break
    case 'TCX':
      label = 'textile-cotton-extended'
      break

    // https://www.pantone.com/nylon-brights-set
    case 'TN':
      label = 'nylon-brights'
      break

    // https://www.pantone.com/pantone-skintone-guide
    case 'SP':
      label = 'pantone-skin-tone'
      break

    case 'PQ':
      label = 'plastics-standard'
      break
  }

  return label
}

export function purgeOldCache () {
  fs.readdir(cacheDir, (err, files) => {
    if (err) return

    files.forEach((file, index) => {
      if (file === '.gitignore') return

      fs.stat(path.join(cacheDir, file), (err, stat) => {
        if (err) return

        const now = new Date().getTime()
        const endTime = new Date(stat.ctime).getTime() + maxCacheAge

        if (now > endTime) {
          return rimraf(path.join(cacheDir, file), () => {})
        }
      })
    })
  })
}

export function makeRequest (url) {
  return new Promise((resolve, reject) => {
    // Create Cache Information
    const cacheKey = md5(url)
    const cacheFile = path.join(cacheDir, cacheKey)
    const timeout = 30000

    let useCache = false

    if (fs.existsSync(cacheFile)) {
      const maxAge = maxCacheAge
      const stat = fs.statSync(cacheFile)
      const now = new Date().getTime()
      const timestamp = new Date(stat.ctime).getTime()

      if (now < timestamp + maxAge) {
        useCache = true
      }
    }

    if (useCache) {
      // Return Cached Response
      resolve({
        html: fs.readFileSync(cacheFile, {
          encoding: 'utf8'
        }).toString(),
        isCached: true
      })
    } else {
      const getOptions = {
        headers: {
          'User-Agent': 'FindByColorBot/1.0; (+http://findbycolor.com/bot; bot@findbycolor.com)'
        }
      }

      const request = https.get(url, getOptions, res => {
        if (res.statusCode !== 200) {
          request.abort()
          reject(new Error(`✖ ERROR: Received ${res.statusCode} Status Code`))
        }

        let html = ''

        res.on('data', chunk => {
          html += chunk
        })

        res.on('end', () => {
          // Cache Output from URL
          fs.writeFileSync(cacheFile, html, (e) => {
            reject(e)
          })

          // Cache Garbage Collection
          purgeOldCache()

          // Return Uncached Response
          resolve({
            html: html,
            isCached: false
          })
        })
      }).on('error', e => {
        reject(e)
      }).on('socket', (socket) => {
        socket.setTimeout(timeout, () => {
          request.abort()
        })
      })
    }
  })
}
/**
 * Convert String to Title Case
 *
 * @param str
 * @param stripDashes
 * @returns {String}
 */
export function titleCase (str, stripDashes) {
  if (typeof str === 'string') {
    if (stripDashes) {
      str = str.replace(/-/g, ' ')
    }

    return str.trim().replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
  }

  return null
}

/**
 * Left Pad String
 * @param {string} str
 * @param {number} len
 * @param {string} pad
 */
export function leftPad (str, len, pad) {
  if (typeof str !== 'string') {
    str = str.toString()
  }

  return (str.length < len) ? Array(len - String(str).length + 1).join(pad || '0') + str : str
}
