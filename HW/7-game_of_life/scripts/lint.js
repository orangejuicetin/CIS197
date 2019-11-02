var CLIEngine = require('eslint').CLIEngine

var paths = [
  'public/**/*.jsx',
  'public/actions/*.js',
  'public/reducers/*.js',
  'public/main.jsx',
]

console.log('Running ESLint on files...')

var cli = new CLIEngine({
  useEslintrc: true,
})

var report = cli.executeOnFiles(paths)
var formatter = cli.getFormatter()

console.log(formatter(report.results))
console.log('Finished running ESLint.')
