![Find By Color Logo](https://findbycolor-github.s3.amazonaws.com/logo.png "Find By Color Logo")

**[↤ Developer Overview](../README.md)**

Data Definitions
===

> The following is a breakdown of the data contained inside each JSON file.

**Table of Contents:**

* [library](#library)
* [meta](#meta)
* [css](#css)
* [space](#space)
* [harmony](#harmony)
* [nearest](#nearest)


`library`
---

> This is an array of all color libraries this color belongs.

Property                | Definition                          | Example
------------------------|-------------------------------------|------------------------------
`library[0].space`      | Name of the color space library     | `pantone`
`library[0].collection` | Collection within the color space   | `fashion-and-interior-design`
`library[0].set`        | Set within a collection             | `textile-cotton-extended`
`library[0].color`      | Color as defined by the color space | `--`
`library[0].color.code` | Code used to refer to Color         | `14-6017 TCX`
`library[0].color.name` | Name used to refer to Color         | `Neptune Green`

`meta`
---

> This is an internal object of possibly helpful information about the color.

Property          | Definition                                 | Example
------------------|--------------------------------------------|------------------------------
`meta.isDark`     | Is this a Dark Color                       | `false`
`meta.isLight`    | Is this a Light Color                      | `true`
`meta.luminosity` | Luminance of Color: `0` = Dark `1` = Light | `0.42521295857216795`

`css`
---

> CSS values for color

Property   | Definition                       | Example
-----------|----------------------------------|------------------------------
`css.name` | HTML Color Name ( if available ) | `green`
`css.hex`  | HTML CSS HEX Code                | ![#7FBB9E](https://via.placeholder.com/20/7FBB9E/000000?text=+) `#7FBB9E`
`css.hsl`  | HTML CSS HLS Code                | `hsl(151,30.61%,61.57%)`
`css.rgb`  | HTML CSS RGB Code                | `rgb(127,187,158)`

`space`
---

> A collection of values for different Color Space values for this color

Property        | Definition                   | Example
----------------|------------------------------|----------------------
`space.cmyk`    | CMYK Color Space Array       | `--`
`space.cmyk[0]` | Percent of Cyan `0-1`        | `0.320855614973262`
`space.cmyk[1]` | Percent of Magenta `0-1`     | `0`
`space.cmyk[2]` | Percent of Yellow `0-1`      | `0.15508021390374324`
`space.cmyk[3]` | Percent of Black `0-1`       | `0.2666666666666667`
`space.hcl`     | HCL Color Space Array        | `--`
`space.hcl[0]`  | Degree of Hue `0-360`        | `161.53158041255017`
`space.hcl[1]`  | Range of Chroma `0-150`      | `27.049091053544668`
`space.hcl[2]`  | Range of Lightness `0-150`   | `71.22770039535155`
`space.hex`     | Hex Code                     | ![#7FBB9E](https://via.placeholder.com/20/7FBB9E/000000?text=+) `#7FBB9E`
`space.hsi`     | HSI Color Space Array        | `--`
`space.hsi[0]`  | Degree of Hue `0-360`        | `151.10252169049537`
`space.hsi[1]`  | Percent of Saturation `0-1`  | `0.19279661016949157`
`space.hsi[2]`  | Percent of Intensity `0-1`   | `0.6169934640522876`
`space.hsl`     | HSL Color Space Array        | `--`
`space.hsl[0]`  | Degree of Hue `0-360`        | `151`
`space.hsl[1]`  | Percent of Saturation `0-1`  | `0.3061224489795918`
`space.hsl[2]`  | Percent of Lightness `0-1`   | `0.615686274509804`
`space.hsl[3]`  | Alpha Transparency `1`       | `1`
`space.hsv`     | HSV Color Space Array        | `--`
`space.hsv[0]`  | Degree of Hue `0-360`        | `151`
`space.hsv[1]`  | Percent of Saturation `0-1`  | `0.32085561497326204`
`space.hsv[2]`  | Percent of Value `0-1`       | `0.7333333333333333`
`space.lab`     | LAB Color Space Array        | `--`
`space.lab[0]`  | Lightness `0-100`            | `71.22770039535155`
`space.lab[1]`  | Red/Green Value `-128-127`   | `-25.656019689009046`
`space.lab[2]`  | Blue/Yellow Value `-128-127` | `8.568662704304009`
`space.lch`     | LCH Color Space Array        | `--`
`space.lch[0]`  | Range of Lightness `0-150`   | `71.22770039535155`
`space.lch[1]`  | Range of Chroma `0-150`      | `27.049091053544668`
`space.lch[2]`  | Degree of Hue `0-360`        | `161.53158041255017`
`space.rgb`     | RGB Color Space Array        | `--`
`space.rgb.r`   | Amount of Red `0-255`        | `127`
`space.rgb.g`   | Amount of Green `0-255`      | `187`
`space.rgb.b`   | Amount of Blue `0-255`       | `158`

`harmony`
---

> Harmonies are precalculated complementary colors using color science. These use predefined rotations around a color wheel to create color combinations. Properties ending in `CW` indicate a Clockwise rotation applied, and `CCW` means a Counter Clockwise rotation.

Property                        | Degrees ( as indexed in array ) | Example
--------------------------------|---------------------------------|----------------------
`harmony.complementary`         | 0°, 180°                        | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#bb7f9c](https://via.placeholder.com/20/bb7f9c/000000?text=+)
`harmony.splitComplementary`    | 0°, 150°, 320°                  | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#bb7fba](https://via.placeholder.com/20/bb7fba/000000?text=+) ![#88bb7f](https://via.placeholder.com/20/88bb7f/000000?text=+)
`harmony.splitComplementaryCW`  | 0°, 150°, 300°                  | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#bb7fba](https://via.placeholder.com/20/bb7fba/000000?text=+) ![#9cbb7f](https://via.placeholder.com/20/9cbb7f/000000?text=+)
`harmony.splitComplementaryCCW` | 0°, 60°, 210°                   | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#7f9cbb](https://via.placeholder.com/20/7f9cbb/000000?text=+) ![#bb807f](https://via.placeholder.com/20/bb807f/000000?text=+)
`harmony.triadic`               | 0°, 120°, 240°                  | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#9e7fbb](https://via.placeholder.com/20/9e7fbb/000000?text=+) ![#bb9e7f](https://via.placeholder.com/20/bb9e7f/000000?text=+)
`harmony.clash`                 | 0°, 90°, 270°                   | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#807fbb](https://via.placeholder.com/20/807fbb/000000?text=+) ![#babb7f](https://via.placeholder.com/20/babb7f/000000?text=+)
`harmony.tetradic`              | 0°, 90°, 180°, 270°             | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#807fbb](https://via.placeholder.com/20/807fbb/000000?text=+) ![#bb7f9c](https://via.placeholder.com/20/bb7f9c/000000?text=+) ![#babb7f](https://via.placeholder.com/20/babb7f/000000?text=+)
`harmony.fourToneCW`            | 0°, 60°, 180°, 240°             | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#7f9cbb](https://via.placeholder.com/20/7f9cbb/000000?text=+) ![#bb7f9c](https://via.placeholder.com/20/bb7f9c/000000?text=+) ![#bb9e7f](https://via.placeholder.com/20/bb9e7f/000000?text=+)
`harmony.fourToneCCW`           | 0°, 120°, 180°, 300°            | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#9e7fbb](https://via.placeholder.com/20/9e7fbb/000000?text=+) ![#bb7f9c](https://via.placeholder.com/20/bb7f9c/000000?text=+) ![#9cbb7f](https://via.placeholder.com/20/9cbb7f/000000?text=+)
`harmony.fiveToneA`             | 0°, 115°, 155°, 205°, 245°      | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#997fbb](https://via.placeholder.com/20/997fbb/000000?text=+) ![#bb7fb5](https://via.placeholder.com/20/bb7fb5/000000?text=+) ![#bb7f83](https://via.placeholder.com/20/bb7f83/000000?text=+) ![#bba37f](https://via.placeholder.com/20/bba37f/000000?text=+)
`harmony.fiveToneB`             | 0°, 40°, 90°, 130°, 245°        | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#7fb0bb](https://via.placeholder.com/20/7fb0bb/000000?text=+) ![#807fbb](https://via.placeholder.com/20/807fbb/000000?text=+) ![#a87fbb](https://via.placeholder.com/20/a87fbb/000000?text=+) ![#bba37f](https://via.placeholder.com/20/bba37f/000000?text=+)
`harmony.fiveToneC`             | 0°, 50°, 90°, 205°, 320°        | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#7fa6bb](https://via.placeholder.com/20/7fa6bb/000000?text=+) ![#807fbb](https://via.placeholder.com/20/807fbb/000000?text=+) ![#bb7f83](https://via.placeholder.com/20/bb7f83/000000?text=+) ![#88bb7f](https://via.placeholder.com/20/88bb7f/000000?text=+)
`harmony.fiveToneD`             | 0°, 40°, 155°, 270°, 310°       | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#7fb0bb](https://via.placeholder.com/20/7fb0bb/000000?text=+) ![#bb7fb5](https://via.placeholder.com/20/bb7fb5/000000?text=+) ![#babb7f](https://via.placeholder.com/20/babb7f/000000?text=+) ![#92bb7f](https://via.placeholder.com/20/92bb7f/000000?text=+)
`harmony.fiveToneE`             | 0°, 115°, 230°, 270°, 320°      | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#997fbb](https://via.placeholder.com/20/997fbb/000000?text=+) ![#bb947f](https://via.placeholder.com/20/bb947f/000000?text=+) ![#babb7f](https://via.placeholder.com/20/babb7f/000000?text=+) ![#88bb7f](https://via.placeholder.com/20/88bb7f/000000?text=+)
`harmony.sixToneCW`             | 0°, 30°, 120°, 150°, 240°, 270° | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#7fbabb](https://via.placeholder.com/20/7fbabb/000000?text=+) ![#9e7fbb](https://via.placeholder.com/20/9e7fbb/000000?text=+) ![#bb7fba](https://via.placeholder.com/20/bb7fba/000000?text=+) ![#bb9e7f](https://via.placeholder.com/20/bb9e7f/000000?text=+) ![#babb7f](https://via.placeholder.com/20/babb7f/000000?text=+)
`harmony.sixToneCCW`            | 0°, 90°, 120°, 210°, 240°, 330° | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#807fbb](https://via.placeholder.com/20/807fbb/000000?text=+) ![#9e7fbb](https://via.placeholder.com/20/9e7fbb/000000?text=+) ![#bb807f](https://via.placeholder.com/20/bb807f/000000?text=+) ![#bb9e7f](https://via.placeholder.com/20/bb9e7f/000000?text=+) ![#7fbb80](https://via.placeholder.com/20/7fbb80/000000?text=+)
`harmony.neutral`               | 0°, 15°, 30°, 45°, 60°, 75°     | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#7fbbad](https://via.placeholder.com/20/7fbbad/000000?text=+) ![#7fbabb](https://via.placeholder.com/20/7fbabb/000000?text=+) ![#7fabbb](https://via.placeholder.com/20/7fabbb/000000?text=+) ![#7f9cbb](https://via.placeholder.com/20/7f9cbb/000000?text=+) ![#7f8dbb](https://via.placeholder.com/20/7f8dbb/000000?text=+)
`harmony.analogous`             | 0°, 30°, 60°, 90°, 120°, 150°   | ![#7fbb9e](https://via.placeholder.com/20/7fbb9e/000000?text=+) ![#7fbabb](https://via.placeholder.com/20/7fbabb/000000?text=+) ![#7f9cbb](https://via.placeholder.com/20/7f9cbb/000000?text=+) ![#807fbb](https://via.placeholder.com/20/807fbb/000000?text=+) ![#9e7fbb](https://via.placeholder.com/20/9e7fbb/000000?text=+) ![#bb7fba](https://via.placeholder.com/20/bb7fba/000000?text=+)

**Complementary:**

> Two colors are complementary when they are each on opposite ends of the color wheel.

**Split Complementary:**

> The difference between complementary and split complementary is that one of the colors is split in two. The angle between each split color and the complementary color needs to be the same.

**Triad:**

> Colors form a triad if the angle between them is the same.

**Clash:**

> Clashes are differing shades of colors that do not work well together.

**Tetrad:**

> Tetradic color palettes use four colors, a pair of complementary color pairs. Tetrad colors are found by putting a square or rectangle on the color wheel.

**Four Tone:**

> A Four Tone ( AKA Double Complementary ) scheme is when two hues are next to each other on the color wheel and paired with two adjacent hues on the opposite side.

**Five Tone:**

> Primary color combined with four tetradic colors.

**Six Tone:**

> Tertiary color combinations of one primary and one secondary color.

**Neutral:**

> These are colors with the same saturation and brightness from colors using 15° rotations on the color wheel.

**Analog:**

> An analogous color scheme is made up of colors next to each other on the wheel.

`nearest`
---

> This is an internal map to the best match of roughly 1,500 [Named Colors](../src/lib/named-colors.js) we are using to group similar colors.

Property           | Definition                                | Example
-------------------|-------------------------------------------|------------------------------
`nearest.name`     | Closest Matches Internal Name             | `Silver Tree`
`nearest.hex`      | Closest Matches Internal Color            | ![#66B58F](https://via.placeholder.com/20/66B58F/000000?text=+) `#66B58F`
`nearest.deltaE`   | The Color Difference between two colors   | `5.0146778701771515`
`nearest.distance` | The Euclidean Distance between two colors | `8.862364976593343`

**More Info:**

* [Color Difference](https://en.wikipedia.org/wiki/Color_difference#CMC_l:c_.281984.29)
* [Euclidean Distance](https://en.wikipedia.org/wiki/Euclidean_distance#Three_dimensions)

This is a helpful chart of how we will be using `DeltaE` Calculation Internally ( FYI, these calculations are done using the [Chroma.js](https://gka.github.io/chroma.js/#chroma-deltae) Library )

Delta E | Perception
--------|--------------------------------
<= 1    | Not perceptible by human eyes
1-2     | Perceptible through close observation
2-10    | Perceptible at a glance
11-49   | Colors are more similar than opposite
100     | Colors are exact opposite

