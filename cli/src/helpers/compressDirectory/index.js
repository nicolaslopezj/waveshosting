import fs from 'fs'
import archiver from 'archiver'

export default async function(dirPath, outputPath) {
  const output = fs.createWriteStream(outputPath)
  const archive = archiver('zip', {})

  const result = await new Promise((resolve, reject) => {
    archive.on('error', reject)

    output.on('close', function() {
      resolve(outputPath)
    })

    archive.pipe(output)

    archive.directory(dirPath, false)

    archive.finalize()
  })

  return result
}
