var colorPicker;

var isAdvancedUpload = function() {
  var div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

window.onload = function() {
  if (isAdvancedUpload) {
    var $form = document.getElementById('image-upload');
    console.log('isAdvancedUpload');

    $form.addEventListener('drag', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });

    $form.addEventListener('dragstart', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });

    $form.addEventListener('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });

    $form.addEventListener('dragenter', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $form.classList.add('is-dragover');
    });

    $form.addEventListener('dragend', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });

    $form.addEventListener('dragleave', function(e) {
      console.log('dragleave');
      e.preventDefault();
      e.stopPropagation();
      $form.classList.remove('is-dragover');
    });

    $form.addEventListener('drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $form.classList.remove('is-dragover');
      updateImage(e.dataTransfer.files);
    });
  }

  colorPicker = new FindByColor ('.thumbnail img', {
    preview: '.preview',
    marker: '.marker',
    clicked: function(data){
      document.body.style.background = data.result_hex;
      handleChange(data.result_hex);
    }
  });
}

function updateImage(drop) {
  document.getElementById('findbycolor').remove();
  document.querySelector('.color-data').style.display = 'none';

  const img = document.querySelector('img');
  const file = drop ? drop[0] : document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function () {
    // convert image file to base64 string
    img.src = reader.result;

    delete colorPicker;

    colorPicker = new FindByColor ('.thumbnail img', {
      preview: '.preview',
      marker: '.marker',
      clicked: function(data){
        document.body.style.background = data.result_hex;
        handleChange(data.result_hex);
      }
    });
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function handleChange(result_hex) {
  // Store Comparison Results
  var results = []

  var color = chroma(result_hex)

  library.every(hex => {
    const deltaE = chroma.deltaE(color, chroma(`#${hex}`))

    results.push({
      hex: hex,
      deltaE: deltaE
    })

    if (deltaE <= 1) {
      // Exit loop early
      return false
    }

    return true
  })

  // Sort Results by Best Match
  results.sort((a, b) => (a.deltaE > b.deltaE) ? 1 : -1);

  getColorData(results[0].hex, result_hex);
}

function getColorData(hex, result_hex) {
  var AJAX = new XMLHttpRequest();
  AJAX.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      generateColorData(this.responseText, hex, result_hex);
    }
  };

  AJAX.open('GET', `libraries/all/${hex}.json`, true);
  AJAX.send();
}

function generateColorData(response, hex, result_hex) {
  try {
    const data = JSON.parse(response);

    document.querySelector('#library-match-1 .title').innerText = data.library[0].name;
    document.querySelector('#library-match-1 .color-code').innerText = data.library[0].color.code;
    document.querySelector('#library-match-1 .color-name').innerText = data.library[0].color.name;

    if (data.library.length > 1) {
      document.querySelector('#library-match-2').style.display = 'inline-block';
      document.querySelector('#library-match-2 .title').innerText = data.library[1].name;
      document.querySelector('#library-match-2 .color-code').innerText = data.library[1].color.code;
      document.querySelector('#library-match-2 .color-name').innerText = data.library[1].color.name;
    } else {
      document.querySelector('#library-match-2').style.display = 'none';
    }

    if (data.library.length > 2) {
      document.querySelector('#library-match-3').style.display = 'inline-block';
      document.querySelector('#library-match-3 .title').innerText = data.library[2].name;
      document.querySelector('#library-match-3 .color-code').innerText = data.library[2].color.code;
      document.querySelector('#library-match-3 .color-name').innerText = data.library[2].color.name;
    } else {
      document.querySelector('#library-match-3').style.display = 'none';
    }

    document.querySelector('#nearest-match-name').innerText = data.nearest.name;

    const $colorSelected = document.querySelector('#color-selected');

    $colorSelected.innerHTML = `SELECTED<br>${result_hex}`;
    $colorSelected.style.backgroundColor = result_hex;
    $colorSelected.classList.remove('is-light');
    $colorSelected.classList.remove('is-dark');
    $colorSelected.classList.add(data.meta.isDark ? 'is-dark' : 'is-light');

    const $colorLibrary = document.querySelector('#color-library');

    $colorLibrary.innerHTML = `${data.library[0].name}<br>#${hex}<br>ΔE: ${(chroma.deltaE(result_hex, hex)).toFixed(2)}`;
    $colorLibrary.style.backgroundColor = `#${hex}`;
    $colorLibrary.classList.remove('is-light');
    $colorLibrary.classList.remove('is-dark');
    $colorLibrary.classList.add(data.meta.isDark ? 'is-dark' : 'is-light');

    const $colorNearest = document.querySelector('#color-nearest');

    $colorNearest.innerHTML = `NEAREST<br>${data.nearest.hex}<br>ΔE: ${data.nearest.deltaE.toFixed(2)}`;
    $colorNearest.style.backgroundColor = data.nearest.hex;
    $colorNearest.classList.remove('is-light');
    $colorNearest.classList.remove('is-dark');
    $colorNearest.classList.add(data.meta.isDark ? 'is-dark' : 'is-light');

    document.querySelector('.color-data').style.display = 'block';

    document.querySelector('.harmony-colors.complementary .color-block-1').style.backgroundColor = data.harmony.complementary[0];
    document.querySelector('.harmony-colors.complementary .color-block-2').style.backgroundColor = data.harmony.complementary[1];

    document.querySelector('.harmony-colors.split-complementary .color-block-1').style.backgroundColor = data.harmony.splitComplementary[0];
    document.querySelector('.harmony-colors.split-complementary .color-block-2').style.backgroundColor = data.harmony.splitComplementary[1];
    document.querySelector('.harmony-colors.split-complementary .color-block-3').style.backgroundColor = data.harmony.splitComplementary[2];

    document.querySelector('.harmony-colors.triadic .color-block-1').style.backgroundColor = data.harmony.triadic[0];
    document.querySelector('.harmony-colors.triadic .color-block-2').style.backgroundColor = data.harmony.triadic[1];
    document.querySelector('.harmony-colors.triadic .color-block-3').style.backgroundColor = data.harmony.triadic[2];

    document.querySelector('.harmony-colors.clash .color-block-1').style.backgroundColor = data.harmony.clash[0];
    document.querySelector('.harmony-colors.clash .color-block-2').style.backgroundColor = data.harmony.clash[1];
    document.querySelector('.harmony-colors.clash .color-block-3').style.backgroundColor = data.harmony.clash[2];

    document.querySelector('.harmony-colors.tetradic .color-block-1').style.backgroundColor = data.harmony.tetradic[0];
    document.querySelector('.harmony-colors.tetradic .color-block-2').style.backgroundColor = data.harmony.tetradic[1];
    document.querySelector('.harmony-colors.tetradic .color-block-3').style.backgroundColor = data.harmony.tetradic[2];
    document.querySelector('.harmony-colors.tetradic .color-block-4').style.backgroundColor = data.harmony.tetradic[3];

    document.querySelector('.harmony-colors.four-tone .color-block-1').style.backgroundColor = data.harmony.fourToneCW[0];
    document.querySelector('.harmony-colors.four-tone .color-block-2').style.backgroundColor = data.harmony.fourToneCW[1];
    document.querySelector('.harmony-colors.four-tone .color-block-3').style.backgroundColor = data.harmony.fourToneCW[2];
    document.querySelector('.harmony-colors.four-tone .color-block-4').style.backgroundColor = data.harmony.fourToneCW[3];

    document.querySelector('.harmony-colors.five-tone .color-block-1').style.backgroundColor = data.harmony.fiveToneA[0];
    document.querySelector('.harmony-colors.five-tone .color-block-2').style.backgroundColor = data.harmony.fiveToneA[1];
    document.querySelector('.harmony-colors.five-tone .color-block-3').style.backgroundColor = data.harmony.fiveToneA[2];
    document.querySelector('.harmony-colors.five-tone .color-block-4').style.backgroundColor = data.harmony.fiveToneA[3];
    document.querySelector('.harmony-colors.five-tone .color-block-5').style.backgroundColor = data.harmony.fiveToneA[4];

    document.querySelector('.harmony-colors.six-tone .color-block-1').style.backgroundColor = data.harmony.sixToneCW[0];
    document.querySelector('.harmony-colors.six-tone .color-block-2').style.backgroundColor = data.harmony.sixToneCW[1];
    document.querySelector('.harmony-colors.six-tone .color-block-3').style.backgroundColor = data.harmony.sixToneCW[2];
    document.querySelector('.harmony-colors.six-tone .color-block-4').style.backgroundColor = data.harmony.sixToneCW[3];
    document.querySelector('.harmony-colors.six-tone .color-block-5').style.backgroundColor = data.harmony.sixToneCW[4];
    document.querySelector('.harmony-colors.six-tone .color-block-6').style.backgroundColor = data.harmony.sixToneCW[5];

    document.querySelector('.harmony-colors.neutral .color-block-1').style.backgroundColor = data.harmony.neutral[0];
    document.querySelector('.harmony-colors.neutral .color-block-2').style.backgroundColor = data.harmony.neutral[1];
    document.querySelector('.harmony-colors.neutral .color-block-3').style.backgroundColor = data.harmony.neutral[2];
    document.querySelector('.harmony-colors.neutral .color-block-4').style.backgroundColor = data.harmony.neutral[3];
    document.querySelector('.harmony-colors.neutral .color-block-5').style.backgroundColor = data.harmony.neutral[4];
    document.querySelector('.harmony-colors.neutral .color-block-6').style.backgroundColor = data.harmony.neutral[5];

    document.querySelector('.harmony-colors.analogous .color-block-1').style.backgroundColor = data.harmony.analogous[0];
    document.querySelector('.harmony-colors.analogous .color-block-2').style.backgroundColor = data.harmony.analogous[1];
    document.querySelector('.harmony-colors.analogous .color-block-3').style.backgroundColor = data.harmony.analogous[2];
    document.querySelector('.harmony-colors.analogous .color-block-4').style.backgroundColor = data.harmony.analogous[3];
    document.querySelector('.harmony-colors.analogous .color-block-5').style.backgroundColor = data.harmony.analogous[4];
    document.querySelector('.harmony-colors.analogous .color-block-6').style.backgroundColor = data.harmony.analogous[5];
  } catch (err) {
    console.error(err);
    document.querySelector('.color-data').style.display = 'none';
  }
}