const { execFileSync } = require('child_process')
const path = require('path')

console.log('Building Icebear...');

// A massively hackish solution, inspired by
// http://krasimirtsonev.com/blog/article/Fun-playing-with-npm-dependencies-and-postinstall-script
(function repeatUntilPathResolves() {
  let resolvedIcebearPath
  try {
    resolvedIcebearPath = require.resolve('peerio-icebear')
  }
  catch(e) {
    console.log("Can't resolve path to Icebear yet...")
    console.warn(e)
  }

  if(!resolvedIcebearPath) {
    setTimeout(repeatUntilPathResolves, 1000)
    return
  }

  const srcDir = path.dirname(resolvedIcebearPath)
  const distDir = path.resolve(srcDir, '../dist')

  console.log(resolvedIcebearPath, '\n=> ', srcDir, '\n=> ', distDir)

  // This seems goofy, but the babel cli can transpile directories at a time
  // whereas the API can't, and I really don't feel like introducing another dep
  // that might have even more divergent behaviour from what's defined in
  // icebear/its current consumers.
  execFileSync(
    path.resolve(path.dirname(require.resolve('babel-cli')), 'bin/babel.js'),
    [
      '-q',
      srcDir,
      '-d',
      distDir,
      [
        '--plugins=transform-decorators-legacy',
        'transform-class-properties',
        'transform-es2015-modules-commonjs',
        'transform-export-extensions',
        'transform-object-rest-spread'
      ].join(',')
    ]
  )
})()
