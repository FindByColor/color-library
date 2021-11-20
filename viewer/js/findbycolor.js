const FindByColor = function (img_selector, opt) {
  // vars
  let x = ''; let y = ''
  const inst = this
  const d = document

  // constructor
  opt = (typeof opt === 'object') ? opt : {}

  inst.img = _(img_selector)

  if (!inst.img) {
    return
  }

  inst.img.style.cursor = 'crosshair'

  // create canvas
  if (opt.canvas) {
    inst.canvas = opt.canvas
  } else {
    inst.canvas = d.createElement('canvas')
    inst.img.parentNode.insertBefore(inst.canvas, inst.img.nextSibling)
  }

  inst.canvas.id = 'findbycolor'
  inst.canvas.style.display = 'none'

  // optional public containers
  inst.preview = opt.preview ? _(opt.preview) : d.createElement('div')
  inst.marker = opt.marker ? _(opt.marker) : d.createElement('div')

  // reset UI
  inst.marker.style.opacity = 0

  // default
  inst.result_hex = ''
  inst.result_rgb = []
  inst.result_rgb_string = ''

  // callbacks
  const clicked = opt.clicked || function () {}

  function clickEvent (e) {
    e.stopImmediatePropagation()

    // chrome
    if (e.offsetX) {
      x = e.offsetX
      y = e.offsetY
    }
    // firefox
    else if (e.layerX) {
      x = e.layerX
      y = e.layerY
    }

    useCanvas(inst.canvas, inst.img, function () {
      // exit if out of bounds
      if (x < 0 || y < 0 || x > inst.img.width || y > inst.img.height) {
        return
      }

      // get image data
      inst.result_rgb = inst.canvas.getContext('2d').getImageData(x, y, 1, 1).data

      const p = inst.result_rgb

      // show info
      inst.result_hex = rgbToHex(p[0], p[1], p[2])
      inst.result_rgb_string = 'rgb(' + p[0] + ',' + p[1] + ',' + p[2] + ')'

      // update marker position
      inst.marker.style.opacity = 1
      inst.marker.style.left = `${x - 6}px`
      inst.marker.style.top = `${y - 6}px`

      // callback
      clicked(inst)
    })
  }

  function mouseMove (e) {
    e.stopImmediatePropagation()

    // chrome
    if (e.offsetX) {
      x = e.offsetX
      y = e.offsetY
    }
    // firefox
    else if (e.layerX) {
      x = e.layerX
      y = e.layerY
    }

    useCanvas(inst.canvas, inst.img, function () {
      // exit if out of bounds
      if (x < 0 || y < 0 || x > inst.img.width || y > inst.img.height) {
        return
      }

      // get image data
      const p = inst.canvas.getContext('2d').getImageData(x, y, 1, 1).data

      if (!p) {
        return
      }

      // show preview color
      inst.preview.style.background = rgbToHex(p[0], p[1], p[2])
    })
  }

  // click function
  inst.img.removeEventListener('click', clickEvent, false)
  inst.img.addEventListener('click', clickEvent, false)

  // preview function mousemove
  inst.img.removeEventListener('mousemove', mouseMove, false)
  inst.img.addEventListener('mousemove', mouseMove, false)

  setTimeout(function () {
    // default first pixel canvas
    useCanvas(inst.canvas, inst.img, function () {
      // exit if out of bounds
      if (x < 0 || y < 0 || x > inst.img.width || y > inst.img.height) {
        return
      }

      // get image data
      const p = inst.canvas.getContext('2d').getImageData(x, y, 1, 1).data

      if (!p) {
        return
      }

      // show info
      inst.result_hex = rgbToHex(p[0], p[1], p[2])
      inst.result_rgb_string = 'rgb(' + p[0] + ',' + p[1] + ',' + p[2] + ')'

      // show preview color
      inst.preview.style.background = inst.result_hex
      document.body.style.background = inst.result_hex
    })
  }, 1)

  // check img resize
  function checkCanvasSize (el, image) {
    return el.width == image.width && el.height == image.height
  }

  // canvas function
  function useCanvas (el, image, callback) {
    if (!checkCanvasSize(el, image)) {
      el.width = image.width // img width
      el.height = image.height // img height

      // draw image in canvas tag
      el.getContext('2d').drawImage(image, 0, 0, image.width, image.height)
    }

    return callback()
  }

  // short querySelector
  function _ (el) {
    return d.querySelector(el)
  }

  // convert rgba to hex
  function componentToHex (c) {
    const hex = c.toString(16)
    return hex.length == 1 ? '0' + hex : hex
  }

  function rgbToHex (r, g, b) {
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
  }

  function findPos (obj) {
    let curleft = 0; let curtop = 0

    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft
        curtop += obj.offsetTop
      } while (obj = obj.offsetParent)

      return { x: curleft, y: curtop }
    }
  }
}
