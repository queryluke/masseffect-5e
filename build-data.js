/*****
 * Static Files
 */
const fs = require('fs')
const fm = require('front-matter')
const jsonDirs = ['classes', 'bestiary']
const mdDirs = [
  'backgrounds',
  'rules',
  'grenades',
  'tools',
  'conditions',
  'class_features',
  'changelog',
  'races',
  'feats',
  'spells',
  'programs',
  'vehicles'
]
for (let dir of mdDirs) {
  const path = `./static/data/${dir}`
  const files = fs.readdirSync(path)

  const items = files.map((file) => {
    const fc = fm(fs.readFileSync(`${path}/${file}`, 'utf8'))
    let item = Object.assign(fc.attributes, {})
    switch (dir) {
      case 'changelog':
        item.date = new Date(item.date)
        item.slug = file.replace(/.md$/, '')
        item.url = `/changelog/${item.slug}`
        break
      case 'rules':
        const fileParts = file.split('-')
        item.section = Number.parseInt(fileParts[0])
        item.subSection = Number.parseInt(fileParts[1])
        item.id = file.replace(/\.md$/g, '')
        item.hash = fileParts.splice(2).join('-').replace(/\.md$/g, '')
        break
      case 'vehicles':
        item.id = file.replace(/.md$/, '')
        break
      default:
        break
    }
    return item
  })

  switch (dir) {
    case 'changelog':
      items.reverse()
      break
    default:
      break
  }
  fs.writeFileSync(`${path}.json`, JSON.stringify(items, null, 2))
}
// process jsDirs
for (let dir of jsonDirs) {
  const path = `./static/data/${dir}`
  const files = fs.readdirSync(path)
  let items = files.map(file => JSON.parse(fs.readFileSync(`${path}/${file}`, 'utf8')))
  fs.writeFileSync(`${path}.json`, JSON.stringify(items, null, 2))
}
