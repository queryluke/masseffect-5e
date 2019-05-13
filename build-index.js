const fs = require('fs')
const fm = require('front-matter')
const md = require('markdown-it')({
  html: true,
})

import phbStore from './store/phb_pages/state.js'
const pages = Object.entries(phbStore.pages)

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
    { type: 'rule', items: ['conditions', 'rules'] },
    { type: 'spell', items: ['spells'] },
    { type: 'bestiary', items: ['bestiary'] },
  ]

  return types.find(t => t.items.includes(dir)).type
}

function nameToId(string) {
 return string.toLowerCase().replace(/[^\w-]/g,'_')
}

function cleanBody(text) {
  let returnText = text.replace(/<condition(.*)\/>/g, (match) => {
    const condition = match.match(/id="(.*?)"/)
    const sub = match.match(/sub="(.*?)"/)
    return sub && sub[1] ? `${condition[1]}-${sub[1]}` : condition[1]
  })
  returnText = md.render(returnText)
  returnText = returnText.replace(/<\/?.*?\/?>/g,'')
  return returnText
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
  'weapons',
  'rules'
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
      subType: dir,
      qualifiers: [],
      link: null
    }

    // create normalized content
    switch (dir) {
      case 'races':
        item.id = fc.attributes.id
        item.title = fc.attributes.name
        const body = [cleanBody(fc.body)]
        body.push(fc.attributes.age)
        body.push(fc.attributes.alignment)
        body.push(fc.attributes.size)
        body.push(fc.attributes.speed)
        body.push(fc.attributes.startingCredits)
        item.body = body.join(' ')
        item.link = `/phb/races/${fc.attributes.id}`
        if (fc.attributes.traits) {
          for (let trait of fc.attributes.traits) {
            const index = searchItems.findIndex(si => si.id === trait)
            if (index > -1) {
              if (searchItems[index].qualifiers.length > 0) {
                searchItems[index].qualifiers[0] += ` + ${fc.attributes.name}`
              } else {
                searchItems[index].qualifiers.push(fc.attributes.name)
              }
            }
          }
        }
        if (fc.attributes.variants) {
          for (let subrace of fc.attributes.variants) {
            const index = searchItems.findIndex(si => si.id.replace('_','-') === subrace)
            if (index > -1) {
              searchItems[index].qualifiers.push(fc.attributes.name)
              searchItems[index].qualifiers.push('Variant')
              searchItems[index].link = `/phb/races/${fc.attributes.id}`
            }
          }
        }
        break
      case 'spells':
        item.qualifiers.push(fc.attributes.type)
        item.title = fc.attributes.name
        item.id = fc.attributes.id
        item.body = cleanBody(fc.body)
        if (fc.attributes.advancementOptions) {
          item.body += ` ${fc.attributes.advancementOptions[0].description}`
          item.body += ` ${fc.attributes.advancementOptions[1].description}`
        }
        break
      case 'vehicles':
        item.title = fc.attributes.name
        item.id = file.replace(/.md$/, '')
        item.body = cleanBody(fc.body)
        if (fc.attributes.weapons) {
          for (let attack of fc.attributes.weapons) {
            item.body += ` ${attack.damage}`
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
      subType: file,
      qualifiers: [],
      link: null
    }

    switch (file) {
      case 'rules':
        const page = pages.find(p => p[1].rules && p[1].rules === thing.section)
        item.title = thing.title
        const splits = page[0].split('-')
        let link = `/${splits[0]}/${splits[1]}`
        if (splits[2]) {
          link += `/${splits.slice(2).join('-')}`
        }
        link += `#${thing.hash}`
        item.link = link
        item.qualifiers.push(page[1].name)
        const fc = fm(fs.readFileSync(`./static/data/rules/${thing.id}.md`, 'utf8'))
        item.body = cleanBody(fc.body)
        break
      case 'weapons':
        item.body = ''
        if (thing.properties.length > 0) {
          item.body += thing.properties.join(', ')
        }
        if (thing.notes) {
          item.body += ` ${thing.notes}`
        }
        break
      case 'bestiary':
        item.subType = 'bestiary'
        item.qualifiers.push(thing.unit)
        item.body = ''
        for (let key of ['Actions', 'Features', 'Reactions', 'Lair Actions', 'Legendary Actions']) {
          const splitKey = key.split(' ')
          const attrKey = `${splitKey[0].toLowerCase()}${splitKey[1] || ''}`
          if (thing[attrKey].length > 0) {
            let groupString = ` ${key}`
            for (let v  of thing[attrKey]) {
              let string = ` ${v.name}`
              switch(v.type) {
                case 'weapon':
                case 'grenade':
                  continue
                case 'melee':
                  string += ` Melee Weapon Attack +${v.attackMod} to hit, reach ${v.range}m, ${v.target} Hit ${v.hit}`
                  if (v.miss) {
                    string += ` Miss: ${v.miss}`
                  }
                  break
                case 'ranged':
                  string += ` Ranged Weapon Attack +${v.attackMod} to hit, range ${v.range}/${v.range * 3}m, ${v.target} Hit ${v.hit}`
                  if (v.miss) {
                    string += ` Miss ${v.miss}`
                  }
                  break
                default:
                  if (v.recharge) {
                    string += ` (${v.recharge})`
                  }
                  string += ` ${v.description}`
              }
              groupString += `${string} `
            }
            item.body += `${groupString} `
          }
        }
        break
      default:
        item.body = ''
        if (thing.feature) {
          item.body += `${thing.feature} `
        }
        if (thing.setBonus) {
          item.body += `${thing.setBonus} `
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
    body: klass.description,
    link: `/phb/classes/${klass.id}`
  }

  const spellcasting = fm(fs.readFileSync(`./static/data/class_spellcasting/${klass.id}.md`, 'utf8'))
  item.body += ` Spell Casting ${spellcasting.body}`

  searchItems.push(item)

  let subclassFeatureIndex = 0;
  for (let p of klass.progression) {
    for (let f of p.features) {
      if (f === 'ability_score_improvement') {
        continue
      }
      if (f === 'subclass') {
        for (let sc of klass.subclasses) {
          for (let scf of sc.features[subclassFeatureIndex]) {
            searchItems.push(createScfItem(scf, p.level, [klass.name, sc.name]))
          }
        }
        subclassFeatureIndex++
      } else {
        searchItems.push(createScfItem(f, p.level, [klass.name]))
      }
    }
  }
}

function createScfItem(id, level, qualifiers) {
  const cf = fm(fs.readFileSync(`./static/data/class_features/${id}.md`, 'utf8'))
  const nthLevel = ordinal(level)
  qualifiers.push(`${nthLevel}-level`)
  return {
    id: `${cf.attributes.id}---${qualifiers[0]}`,
    title: cf.attributes.name,
    type: 'character',
    subType: 'class_features',
    qualifiers: qualifiers,
    body: cleanBody(cf.body.replace('{{ level }}', nthLevel))
  }
}

searchItems.forEach((i) => {
  if (!i.id) {
    console.log(i)
  }
})

fs.writeFileSync(`./static/data/search/documents.json`, JSON.stringify(searchItems, null, 2))
// fs.writeFileSync(`./static/data/search/index.json`, JSON.stringify(idx, null, 2))
