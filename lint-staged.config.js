module.exports = {
  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(js)?(x)': (filenames) => `yarn lint ${filenames.join(' ')}`,
}
