const fs = require('fs')
const fm = require('front-matter')
const md = require('markdown-it')({
  html: true,
})


// "bestiary"
const mdDirs = [
  'backgrounds',
  'conditions',
  'feats',
  'grenades',
  'programs',
  'rules',
  'spells',
  'tools',
  'vehicles'
]


// classes
// class_features
// races
  // subraces
  // traits
// bestiary

const jsonFiles = [
  'armor_mods',
  'armor_sets',
  'bestiary',
  'weapon_mods',
  'weapon_properties',
  'weapons',
]


const searchItems = []


/******************
  MD Dirs
 */
for (let dir of mdDirs) {
  const path = `./static/data/${dir}`
  const files = fs.readdirSync(path)

  for (let file of files) {
    // read the file
    const fc = fm(fs.readFileSync(`${path}/${file}`, 'utf8'))

    // set the type and subtype
    let item = {
      type: setType(dir),
      subType: dir.substring(0, dir.length - 1),
    }

    // create normalized content
    switch (dir) {
      case 'spells':
        item.subType = null
        item.title = fc.attributes.name
        item.id = fc.attributes.id
        item.body = fc.body
        if (fc.attributes.advancementOptions) {
          item.body += `\n\n__${fc.attributes.advancementOptions[0].name}__: ${fc.attributes.advancementOptions[0].description}`
          item.body += `\n\n__${fc.attributes.advancementOptions[1].name}__: ${fc.attributes.advancementOptions[1].description}`
        }
        break
      case 'vehicles':
        item.title = fc.attributes.name
        item.id = item.title.toLowerCase().replace(/\W/,'_')
        item.body = fc.body
        if (fc.attributes.weapons) {
          for (let attack of fc.attributes.weapons) {
            item.body += `\n\n__${attack.name}__. ${attack.damage}`
          }
        }
        break
      default:
        item.title = fc.attributes.name || fc.attributes.title
        item.id = fc.attributes.id || item.title.toLowerCase().replace(/\W/,'_')
        item.body = fc.body
        break
    }
    searchItems.push(item)
  }
}

/******************
 Json Files
 */

for (let file of jsonFiles) {
  const things = JSON.parse(fs.readFileSync(`./static/data/${file}.json`, 'utf8'))
  for (let thing of things) {

    // set the type and subtype
    let item = {
      id: thing.id,
      title: thing.name,
      type: setType(file),
      subType: file.substring(0, file.length - 1).replace('_',' '),
    }

    switch (file) {
      case 'weapons':
        item.body = ''
        if (thing.properties.length > 0) {
          item.body += thing.properties.join(', ')
        }
        if (thing.notes) {
          item.body += `\n${thing.notes}`
        }
        break
      case 'bestiary':
        item.subType = null
        item.body = ''
        for (let key of ['Actions', 'Features', 'Reactions', 'Lair Actions', 'Legendary Actions']) {
          const splitKey = key.split(' ')
          const attrKey = `${splitKey[0].toLowerCase()}${splitKey[1] || ''}`
          if (thing[attrKey].length > 0) {
            let groupString = `#### ${key}`
            for (let v  of thing[attrKey]) {
              let string = `__${v.name}__`
              switch(v.type) {
                case 'weapon':
                case 'grenade':
                  continue
                case 'melee':
                  string += `. _Melee Weapon Attack_: +${v.attackMod} to hit, reach ${v.range}m, ${v.target}\n_Hit_: ${v.hit}`
                  if (v.miss) {
                    string += `\n_Miss: ${v.miss}`
                  }
                  break
                case 'ranged':
                  string += `. _Ranged Weapon Attack_: +${v.attackMod} to hit, range ${v.range}/${v.range * 3}m, ${v.target}\n_Hit_: ${v.hit}`
                  if (v.miss) {
                    string += `\n_Miss: ${v.miss}`
                  }
                  break
                default:
                  if (v.recharge) {
                    string += ` (${v.recharge})`
                  }
                  string += `. ${v.description}`
              }
              groupString += `\n${string}`
            }
            item.body += `${groupString}\n\n`
          }
        }
        break
      default:
        item.body += ''
        if (thing.feature) {
          item.body += thing.feature
        }
        if (thing.setBonus) {
          item.body += `\n\n${thing.setBonus}`
        }
        item.body += `\n\n${thing.description}`
        break
    }
    searchItems.push(item)
  }
}


function setType(dir) {
  const types = [
    { type: 'character', items: ['backgrounds', 'feats'] },
    { type: 'equipment', items: ['grenades', 'programs', 'tools', 'vehicles', 'armor_mods', 'armor_sets', 'weapon_mods', 'weapons'] },
    { type: 'rule', items: ['conditions', 'rules', 'weapon_properties'] },
    { type: 'spell', items: ['spells'] },
    { type: 'bestiary', items: ['bestiary'] },
  ]

  return types.find(t => t.items.includes(dir)).type
}


// process jsDirs
// for (let dir of jsonDirs) {
//   const path = `./static/data/${dir}`
//   const files = fs.readdirSync(path)
//   let items = files.map(file => JSON.parse(fs.readFileSync(`${path}/${file}`, 'utf8')))
//   fs.writeFileSync(`${path}.json`, JSON.stringify(items, null, 2))
// }



fs.writeFileSync(`./static/data/search/documents.json`, JSON.stringify(searchItems, null, 2))
