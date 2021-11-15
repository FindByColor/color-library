import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

// Define Library Directory
const libraryDir = path.join(__dirname, '../', '../', 'libraries')

/**
 * Write Output to File
 * @param {String} dir Output Directory
 * @param {String} file Name of File
 * @param {Object} output Data to Write to File
 */
export default function write (dir, file, output) {
  // Create Output JSON
  let fileData = JSON.stringify(output, null, 2)

  // Create Paths for ALL Output
  const all = path.join(libraryDir, 'all')
  const allPath = path.join(all, file)

  // Create Paths for Library Specific Output
  const directory = path.join(libraryDir, dir)
  const filePath = path.join(directory, file)

  // Make sure library folder exists
  if (!fs.existsSync(all)) {
    fs.mkdirSync(all, { recursive: true })
  }

  // Make sure nested folder structure exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }

  // Write Specific Library Output
  fs.writeFileSync(filePath, fileData, (err) => {
    console.log(`\n${chalk.bold.red('✖ ERROR:')} Write Library\n`)
    console.error(err)
  })

  // Check if ALL Color already exists, if so update it rather than replace it
  if (fs.existsSync(allPath)) {
    // Get Text
    const input = fs.readFileSync(allPath)

    // Make sure we got Text
    if (input) {
      // Convert Text to JSON
      const json = JSON.parse(input)

      // Make sure we got JSON
      if (json && json.library) {
        // Track if this is New
        let existing = null

        // Merge Libraries with by Spaces
        json.library.forEach(lib => {
          if (JSON.stringify(lib) === JSON.stringify(output.library[0])) {
            existing = lib
          }
        })

        // Add Library to Existing Color
        if (!existing) {
          json.library.push(output.library[0])
          output.library = json.library
        }

        // Update File Output
        fileData = JSON.stringify(output, null, 2)
      }
    }
  }

  // Write to ALL Library Output
  fs.writeFileSync(allPath, fileData, (err) => {
    console.log(`\n${chalk.bold.red('✖ ERROR:')} Write All\n`)
    console.error(err)
  })
}
