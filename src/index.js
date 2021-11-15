import Pantone from './color-library/pantone'
import RAL from './color-library/ral'

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

/**
 * Get Colors from All Libraries
 * @param {Object} options CLI Options
 * @returns {Promise}
 */
export function getColors (options) {
  /* eslint-disable no-async-promise-executor */
  return new Promise(async (resolve, reject) => {
    // Get RAL Colors
    if (options.runAll || options.ral) {
      await getRAL(options).then(success => {
        resolve(success)
      }).catch(err => {
        reject(err)
      })
    }

    // Get Pantone Fashion Colors
    if ((options.runAll || options.pantone) && (!options.collection || options.collection.toLowerCase().indexOf('fashion') > -1)) {
      await getPantoneFashion(options).then(success => {
        resolve(success)
      }).catch(err => {
        reject(err)
      })
    }

    // Get Pantone Industrial Colors
    if ((options.runAll || options.pantone) && (!options.collection || options.collection.toLowerCase().indexOf('industrial') > -1)) {
      await getPantoneIndustrial(options).then(success => {
        resolve(success)
      }).catch(err => {
        reject(err)
      })
    }

    // Get Pantone Graphic Design Colors
    if ((options.runAll || options.pantone) && (!options.collection || options.collection.toLowerCase().indexOf('graphic') > -1)) {
      await getPantoneGraphicDesign(options).then(success => {
        resolve(success)
      }).catch(err => {
        reject(err)
      })
    }
  })
}

/**
 * Get Pantone Colors: Fashion & Interior Designers
 * @returns {Object} colors.pantone.fashion
 */
export function getPantoneFashion (options) {
  // Define Library URL and Pagination Limits
  const baseURL = 'https://www.numerosamente.it/pantone-list/fashion-and-interior-designers'
  const maxPages = 14

  // Async Function to Fetch External Colors
  const fetchColors = async (url, label, progress) => {
    await Pantone(url, label, progress, options).catch(err => {
      throw new Error(err)
    })
  }

  // Loop Through Paginated Library Pages
  return new Promise(async (resolve) => {
    for (let i = 1; i <= maxPages; i++) {
      await fetchColors(`${baseURL}/${i}`, 'fashion-and-interior-design', `${i}/${maxPages}`)
    }

    return resolve(true)
  })
}

/**
 * Get Pantone Colors: Industrial Designers
 * @param {Object} options CLI Options
 * @returns {Promise}
 */
export function getPantoneIndustrial (options) {
  // Define Library URL and Pagination Limits
  const baseURL = 'https://www.numerosamente.it/pantone-list/industrial-designers'
  const maxPages = 10

  // Async Function to Fetch External Colors
  const fetchColors = async (url, label, progress) => {
    await Pantone(url, label, progress, options).catch(err => {
      throw new Error(err)
    })
  }

  // Loop Through Paginated Library Pages
  return new Promise(async (resolve) => {
    for (let i = 1; i <= maxPages; i++) {
      await fetchColors(`${baseURL}/${i}`, 'industrial-design', `${i}/${maxPages}`)
    }

    return resolve(true)
  })
}

/**
 * Get Pantone Colors: Graphic Designers
 * @param {Object} options CLI Options
 * @returns {Promise}
 */
export function getPantoneGraphicDesign (options) {
  // Define Library URL and Pagination Limits
  const baseURL = 'https://www.numerosamente.it/pantone-list/graphic-designers'
  const maxPages = 32

  // Async Function to Fetch External Colors
  const fetchColors = async (url, label, progress) => {
    await Pantone(url, label, progress, options).catch(err => {
      throw new Error(err)
    })
  }

  // Loop Through Paginated Library Pages
  return new Promise(async (resolve) => {
    for (let i = 1; i <= maxPages; i++) {
      await fetchColors(`${baseURL}/${i}`, 'graphic-design', `${i}/${maxPages}`)
    }

    return resolve(true)
  })
}

/**
 * Get RAL Colors
 * @param {Object} options CLI Options
 * @returns {Promise}
 */
export function getRAL (options) {
  return new Promise((resolve, reject) => {
    RAL('https://www.numerosamente.it/ral-list', options).then(success => {
      if (success) {
        resolve(true)
      } else {
        reject(new Error('No RAL Colors Found'))
      }
    }).catch(err => {
      reject(err)
    })
  })
}
