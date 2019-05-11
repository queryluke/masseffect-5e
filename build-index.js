const fs = require('fs')
const fm = require('front-matter')
// const md = require('markdown-it')({
//   html: true,
// })
// const lunr = require('lunr')

function ordinal (value) {
  const j = value % 10
  const k = value % 100
  if (j === 1 && k !== 11) {
    return `${value}st`
  }
  if (j === 2 && k !== 12) {
    return `${value}nd`
  }
  if (j === 3 && k !== 13) {
    return `${value}rd`
  }
  return `${value}th`
}



function setType(dir) {
  const types = [
    { type: 'character', items: ['backgrounds', 'feats', 'races', 'traits', 'subraces'] },
    { type: 'equipment', items: ['grenades', 'programs', 'tools', 'vehicles', 'armor_mods', 'armor_sets', 'weapon_mods', 'weapons'] },
    { type: 'rule', items: ['conditions', 'rules', 'weapon_properties'] },
    { type: 'spell', items: ['spells'] },
    { type: 'bestiary', items: ['bestiary'] },
  ]

  return types.find(t => t.items.includes(dir)).type
}

function nameToId(string) {
 return string.toLowerCase().replace(/[^\w-]/,'_')
}

function cleanBody(text) {
  return text.replace(/<condition(.*)\/>/, (match) => {
    const condition = match.match(/id="(.*?)"/)
    const sub = match.match(/sub="(.*?)"/)
    return sub && sub[1] ? `${condition[1]}-${sub[1]}` : condition[1]
  })
}

// "bestiary"
const mdDirs = [
  // must go first
  'traits',
  'subraces',
  // can go in any order
  'backgrounds',
  'conditions',
  'feats',
  'grenades',
  'programs',
  'races',
  'rules',
  'spells',
  'tools',
  'vehicles'
]


// classes
// class_features

const jsonFiles = [
  'armor_mods',
  'armor_sets',
  'bestiary',
  'weapon_mods',
  'weapon_properties',
  'weapons',
]


const searchItems = []
const racialTraits = []


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
      subType: dir,
      qualifiers: []
    }

    // create normalized content
    switch (dir) {
      case 'races':
        item.id = fc.attributes.id
        item.title = fc.attributes.name
        item.body = cleanBody(fc.body)
        item.body += `\n\n__Age__: ${fc.attributes.age}`
        item.body += `\n\n__Alignment__: ${fc.attributes.alignment}`
        item.body += `\n\n__Size__: ${fc.attributes.size}`
        item.body += `\n\n__Speed__: ${fc.attributes.speed}`
        item.body += `\n\n__Starting Credits__: ${fc.attributes.startingCredits}`
        if (fc.attributes.traits) {
          for (let trait of fc.attributes.traits) {
            const index = searchItems.findIndex(si => si.id === trait)
            if (index > -1) {
              searchItems[index].qualifiers.push(fc.attributes.name)
            }
          }
        }
        if (fc.attributes.variants) {
          for (let subrace of fc.attributes.variants) {
            const index = searchItems.findIndex(si => si.id.replace('_','-') === subrace)
            if (index > -1) {
              searchItems[index].qualifiers.push(fc.attributes.name)
            }
          }
        }
        break
      case 'spells':
        item.subType = fc.attributes.type
        item.title = fc.attributes.name
        item.id = fc.attributes.id
        item.body = cleanBody(fc.body)
        if (fc.attributes.advancementOptions) {
          item.body += `\n\n__${fc.attributes.advancementOptions[0].name}__: ${fc.attributes.advancementOptions[0].description}`
          item.body += `\n\n__${fc.attributes.advancementOptions[1].name}__: ${fc.attributes.advancementOptions[1].description}`
        }
        break
      case 'vehicles':
        item.title = fc.attributes.name
        item.id = item.title.toLowerCase().replace(/\W/,'_')
        item.body = cleanBody(fc.body)
        if (fc.attributes.weapons) {
          for (let attack of fc.attributes.weapons) {
            item.body += `\n\n__${attack.name}__. ${attack.damage}`
          }
        }
        break
      default:
        item.title = fc.attributes.name || fc.attributes.title
        item.id = fc.attributes.id || nameToId(item.title)
        item.body = cleanBody(fc.body)
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
      subType: file.replace('_',' '),
      qualifiers: []
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
      case 'weapon_properties':
        item.body = thing.description
        item.id = nameToId(thing.name)
        item.subType = 'weapon property'
        break
      case 'bestiary':
        item.subType = null
        item.body = ''
        for (let key of ['Actions', 'Features', 'Reactions', 'Lair Actions', 'Legendary Actions']) {
          const splitKey = key.split(' ')
          const attrKey = `${splitKey[0].toLowerCase()}${splitKey[1] || ''}`
          if (thing[attrKey].length > 0) {
            let groupString = `### ${key}\n`
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
              groupString += `${string}\n\n`
            }
            item.body += `${groupString}\n\n`
          }
        }
        break
      default:
        item.body = ''
        if (thing.feature) {
          item.body += `${thing.feature}\n\n`
        }
        if (thing.setBonus) {
          item.body += `${thing.setBonus}\n\n`
        }
        item.body += `${thing.description}`
        break
    }
    searchItems.push(item)
  }
}

/******************
 Classes
 */

const classes = JSON.parse(fs.readFileSync(`./static/data/classes.json`, 'utf8'))
for (let klass of classes) {

  let item = {
    id: klass.id,
    title: klass.name,
    type: 'character',
    subType: 'classes',
    qualifiers: [klass.name],
    body: klass.description
  }

  const spellcasting = fm(fs.readFileSync(`./static/data/class_spellcasting/${klass.id}.md`, 'utf8'))
  item.body += `\n\n## Spell Casting\n${spellcasting.body}`

  searchItems.push(item)

  let subclassFeatureIndex = 0;
  for (let p of klass.progression) {
    for (let f of p.features) {
      if (f === 'subclass') {
        for (let sc of klass.subclasses) {
          const prepend = `### ${sc.name}`
          for (let scf of sc.features[subclassFeatureIndex]) {
            searchItems.push(createScfItem(scf, p.level, klass.name, prepend))
          }
        }
        subclassFeatureIndex++
      } else {
        searchItems.push(createScfItem(f, p.level, klass.name))
      }
    }
  }
}

function createScfItem(id, level, klass, prependBody) {
  const cf = fm(fs.readFileSync(`./static/data/class_features/${id}.md`, 'utf8'))
  let body = cf.body.replace('{{ level }}', ordinal(level))
  if (prependBody) {
    body = `${prependBody}\n${body}`
  }
  return {
    id: cf.attributes.id,
    title: cf.attributes.name,
    type: 'character',
    subType: 'classes',
    qualifiers: [klass],
    body: cleanBody(body)
  }
}


// const idx = lunr(function () {
//   this.ref('id')
//   this.field('title')
//   this.field('type')
//   this.field('subType')
//   this.field('qualifiers')
//   this.field('body')
//
//   searchItems.forEach(function (doc) {
//     this.add(doc)
//   }, this)
// })

searchItems.forEach((i) => {
  if (!i.id) {
    console.log(i)
  }
})

fs.writeFileSync(`./static/data/search/documents.json`, JSON.stringify(searchItems, null, 2))
// fs.writeFileSync(`./static/data/search/index.json`, JSON.stringify(idx, null, 2))
