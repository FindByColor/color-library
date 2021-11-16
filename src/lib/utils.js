import $ from 'cheerio'
import fs from 'fs'
import https from 'https'
import md5 from 'md5'
import path from 'path'
import rimraf from 'rimraf'

// Setup Cache for External HTTP Requests
const cacheDir = path.join(__dirname, '../', '../', '.cache')
const maxCacheAge = 2592000000 // 30 days

/**
 * Get DOM from Provided HTML
 * @param {Object} html
 * @returns {Object} HTML DOM
 */
export function getDOM (html) {
  let $html

  // Check how we need to load this HTML
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

/**
 * Get Pantone Set from Code
 * @param {String} code Pantone Code
 * @returns {String} Pantone Set
 */
export function getPantoneSet (code) {
  // Exist if we do not have a code
  if (!code) {
    return null
  }

  // Setup Defaults
  let label = 'unknown'
  let num = 0
  let setCode = ''

  // Define Common Sets
  const basePastelsCoated = ['0131 C', '0331 C', '0521 C', '0631 C', '0821 C', '0921 C', '0961 C']
  const basePastelsUncoated = ['0131 U', '0331 U', '0521 U', '0631 U', '0821 U', '0921 U', '0961 U']

  // Break down Code into Parts to figure out what it is
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

  // Now that we have a Set Code, we can make a human readable version
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
      label = 'skin-tone'
      break

    case 'PQ':
      label = 'plastics-standard'
      break
  }

  // Return Matching Set Label
  return label
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

/**
 *
 * @param {String} url Absolute URL for HTTP Request
 * @returns {Promise}
 */
export function makeRequest (url) {
  return new Promise((resolve, reject) => {
    // Create Cache Information
    const cacheKey = md5(url)
    const cacheFile = path.join(cacheDir, cacheKey)
    const timeout = 30000

    let useCache = false

    // Check if we have a Cached version of this request
    if (fs.existsSync(cacheFile)) {
      const maxAge = maxCacheAge
      const stat = fs.statSync(cacheFile)
      const now = new Date().getTime()
      const timestamp = new Date(stat.ctime).getTime()

      // Check if Cached File is expired
      if (now < timestamp + maxAge) {
        useCache = true
      }
    }

    // If the Cache is still valid, use it
    if (useCache) {
      // Return Cached Response
      resolve({
        html: fs.readFileSync(cacheFile, {
          encoding: 'utf8'
        }).toString(),
        isCached: true
      })
    } else {
      // Setup HTTP Request Headers
      const getOptions = {
        headers: {
          'User-Agent': 'FindByColorBot/1.0; (+http://findbycolor.com/bot; bot@findbycolor.com)'
        }
      }

      // Make new HTTP Request
      const request = https.get(url, getOptions, res => {
        // Make sure we got an HTTP Success Response of 200
        if (res.statusCode !== 200) {
          request.abort()
          reject(new Error(`✖ ERROR: Received ${res.statusCode} Status Code`))
        }

        // Keep track of HTML as it is read
        let html = ''

        // Read HTML Stream
        res.on('data', chunk => {
          html += chunk
        })

        // We are done reading the HTML
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
 * Cache Garbage Collection
 */
export function purgeOldCache () {
  // Get Files from Cache Directory
  fs.readdir(cacheDir, (err, files) => {
    if (err) return

    // Loop through Cache Directory Files
    files.forEach((file, index) => {
      if (file === '.gitignore') return

      // Get Statistics of Cache File
      fs.stat(path.join(cacheDir, file), (err, stat) => {
        if (err) return

        // Generate Time Comparison
        const now = new Date().getTime()
        const endTime = new Date(stat.ctime).getTime() + maxCacheAge

        // Check if File is Expired and Delete it if needed
        if (now > endTime) {
          return rimraf(path.join(cacheDir, file), () => {})
        }
      })
    })
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
