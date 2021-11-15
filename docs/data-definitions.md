![Find By Color Logo](https://findbycolor-github.s3.amazonaws.com/logo.png "Find By Color Logo")

**[↤ Developer Overview](../README.md)**

Data Definitions
===

> The following is a breakdown of the data contained inside each JSON file.

**Table of Contents:**

* [library](#library)
* [color](#color)
* [harmony](#harmony)
* [nearest](#nearest)
* [meta](#meta)


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

`color`
---

> This is an object containing alternative ways to use the color.

Property       | Definition                | Example
---------------|---------------------------|----------------------
`color.hex`    | Hex Code                  | ![#7FBB9E](https://via.placeholder.com/20/7FBB9E/000000?text=+) `#7FBB9E`
`color.rgb`    | RGB Color Values          | `--`
`color.rgb.r`  | Amount of Red `0-255`     | `127`
`color.rgb.g`  | Amount of Green `0-255`   | `187`
`color.rgb.b`  | Amount of Blue `0-255`    | `158`
`color.cmyk`   | CMYK Color Values         | `--`
`color.cmyk.c` | Percent of Cyan           | `32`
`color.cmyk.m` | Percent of Magenta        | `0`
`color.cmyk.y` | Percent of Yellow         | `16`
`color.cmyk.k` | Percent of Black          | `27`
`color.hsl`    | HSL Color Values          | `--`
`color.hsl.h`  | Degree of Hue             | `151`
`color.hsl.s`  | Percent of Saturation     | `31`
`color.hsl.l`  | Percent of Lightness      | `62`
`color.cssHSL` | CSS Representation of HSL | `hsl(151, 31%, 62%)`
`color.cssRGB` | CSS Representation of RGB | `rgb(127, 187, 158)`

`harmony`
---

> Harmonies are precalculated complimentary colors using color science. These use predefined rotations around a color wheel to create color combination. Properties ending in `CW` mean there was a Clockwise rotation applied.  `CCW` means a Counter Clockwise rotation was applied.

Property                        | Degrees                         | Example
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

> Two colors are complementary when they are each on opposite ends of color wheel.

**Split Complementary:**

> The difference between complementary and split complementary is that one of the colors is split in two. The angle between each split color and the complementary color needs to be the same.

**Triad:**

> Colors form a triad if the angle between them is the same.

**Clash:**

> Differing shades of colors that work less well together.

**Tetrad:**

> Tetradic color palettes use four colors, a pair of complementary color pairs. Tetrad colors can be found by putting a square or rectangle on the color wheel.

**Four Tone:**

> A double complementary scheme is when two hues (colors) are next to each other on the color wheel and are paired with two adjacent hues on the opposite side.

**Five Tone:**

> Primary color and four tetradic colors.

**Six Tone:**

> Tertiary color combinations of one primary and one secondary color.

**Neutral:**

> These are colors with the same saturation and brightness from size 15° rotations on the color wheel.

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

`meta`
---

> This is an internal object of possibly helpful information about the color.

Property          | Definition                                 | Example
------------------|--------------------------------------------|------------------------------
`meta.grayscale`  | Color Converted to Grayscale               | ![#A6A6A6](https://via.placeholder.com/20/A6A6A6/000000?text=+) `#A6A6A6`
`meta.inverse`    | Inverted Color                             | ![#804461](https://via.placeholder.com/20/804461/000000?text=+) `#804461`
`meta.isDark`     | Is this a Dark Color                       | `false`
`meta.isLight`    | Is this a Light Color                      | `true`
`meta.luminosity` | Luminance of Color: `0` = Dark `1` = Light | `0.42521295857216795`
