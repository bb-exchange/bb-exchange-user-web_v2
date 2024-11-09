const path = require('path')

function defaultIndexTemplate(filePaths) {
  const prefix = 'Icon';
  const entries = filePaths.map(({ path: filePath, originalPath }) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
    const importLine = `import ${exportName} from './${basename}';`
    const mapLine = `{comp: ${exportName}, name: '${exportName}${prefix}'}`
    return { importLine, mapLine }
  })

  const exportEntries = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
    return `export { default as ${exportName}${prefix} } from './${basename}'`
  })

  return `${exportEntries.join('\n')}
  ${entries.map(({ importLine }) => importLine).join('\n')}
export const iconMap = [
${entries.map(({ mapLine }) => mapLine).join(',\n')}
]
`
}

module.exports = defaultIndexTemplate

// const path = require('path')

// function defaultIndexTemplate(filePaths) {
//   const entries = filePaths.map(({ path: filePath, originalPath }) => {
//     const originalFileName = path.basename(
//       originalPath,
//       path.extname(originalPath),
//     )
//     const basename = path.basename(filePath, path.extname(filePath))
//     const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
//     const importLine = `import ${exportName} from './${basename}';`
//     const mapLine = `${
//       /.*[.-].*/.test(originalFileName)
//         ? `'${originalFileName}'`
//         : originalFileName
//     }: ${exportName}`
//     return { importLine, mapLine }
//   })
//   return `${entries.map(({ importLine }) => importLine).join('\n')}
// export const map = {
// ${entries.map(({ mapLine }) => mapLine).join(',\n')}
// }
// `
// }

// module.exports = defaultIndexTemplate