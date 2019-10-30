var file_system = require('fs')
var archiver = require('archiver')

var output = file_system.createWriteStream('files.zip')
var archive = archiver('zip')
var dirs = ['compiled', 'public']

console.log('Zipping files for submission...')

output.on('close', function() {
  console.log(`Wrote ${archive.pointer()} total bytes`)
  console.log('Zip written and output stream closed successfully.')
})

archive.on('error', function(err) {
  console.log('There was an error:')
  throw err
})

// Write all files and directories specified above straight to the zip
archive.pipe(output)
dirs.forEach(dir => archive.directory(dir))

archive.finalize()
