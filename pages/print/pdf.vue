<template lang="pug">
  main
    v-navigation-drawer(v-model="drawer" fixed clipped floating right id="spvNavDrawer" class="blue-grey lighten-5")
      v-list(dense).pb-5
        template(v-for="item in toc")
          v-list-group(v-if="item.lookup" no-action)
            v-list-tile(slot="activator" ripple)
              v-list-tile-content
                v-list-tile-title {{ item.title }}
            template(v-for="(subItem, i) in tocLookup(item.lookup)")
              v-list-tile(:key="i" ripple rel="noopener" v-on:click="goToRule(`${subItem.anchor}`)")
                v-list-tile-content
                  v-list-tile-title {{ subItem.title }}
                    v-chip(v-if="subItem.new" color="secondary" text-color="white" disabled).pa-0.v-chip--x-small new
                    v-chip(v-if="subItem.change" color="orange accent-2" text-color="black" disabled).pa-0.v-chip--x-small change
          v-subheader(v-else-if="item.header") {{ item.header }}
          v-divider(v-else-if="item.divider")
          v-list-tile(v-else ripple rel="noopener" v-on:click="goToRule(`${item.anchor}`)")
            v-list-tile-content
              v-list-tile-title {{ item.title }}
    v-toolbar(fixed id="spvToolbar")
      v-toolbar-title Mass Effect 5e #[span.hidden-xs-only -  Player's Manual #[small.hidden-sm-and-down (Single Page Version)]]
      v-spacer
      v-btn(icon @click="drawer = !drawer") #[v-icon view_list]

    // Frontmatter
    section.page
      div.my-5.text-xs-center
        img(src="/images/me5e_logo_notm.png" id="phbLogo" alt="Mass Effect 5e Logo").mb-4
        h1.sr-only Mass Effect 5e
        h2.display-3 Player's Manual
        p.title v{{ version }}
      div.my-5.text-xs-center
        p.title Contact Us: #[a(mailto="info@n7.world") info@n7.world]
        div © Mass Effect 5e {{ new Date().getFullYear() }}
      v-layout(row justify-center)
        v-flex(xs12 sm8 lg6)
          v-alert(:value="true" type="warning").black--text.
            This page is generated from components in the web version of the site. Except for the table of contents, links and buttons
            #[em within] this document will link out to the web version of the Player's Manual. At some point in the future,
            we will create a better PDF version of the rules.

    // Download
    section(id="download").page
      h3.display-1 Create and offline version (cached or PDF)
      p #[em source: #[a(href="https://www.pcworld.com/article/3003651/mobile/4-ways-to-save-a-web-page-on-an-iphone-or-android-phone.html" target="_blank") PC World | 4 ways to save a web page on an iPhone or Android phone]]

      h4.title On a Desktop/Laptop?
      p #[code Ctrl] + #[code P] #[em for Windows OS]
      p #[code Cmd] + #[code P] #[em for OSX]
      p Choose "Save as PDF"

      h4.title Add a webpage to your Reading List (iOS only)
      p Bookmarking a webpage in Safari for iPhone or iPad does little more than save the page’s URL in a thicket of nested bookmark folders—and if you happen to lose your network connection, pulling up a bookmark will give you nothing but an error message.
      p The beauty of iOS’s Reading List feature is that it can take a functional snapshot of any webpage, save it to your handset’s local storage for offline reading, and sync it with all your other iCloud-connected devices.
      p To save a webpage to your Reading List, just open the page in Safari, tap the Action button (the square button with the arrow) at the bottom of the screen, then tap Add to Reading List.
      p To open your Reading List, tap the Bookmarks button (the button that looks like an open book), then tap the Reading List tab (it’s the icon that looks like a pair of reading glasses).
      p Note: Adding a webpage to your Reading List won’t necessarily save it for all time. In my tests, I found that Reading List will try to grab the latest version of a page if your device is online, and if the page happens to disappear from the web, you’ll get a “page not found” error (or something along those lines). If you go back offline, Reading List usually goes back to the older, “cached” version.

      h4.title Download a webpage in Chrome (Android only)
      p If you’re using Chrome for Android, good news: There’s an easy way to download webpages for offline reading.
      p Unlike iOS’s Reading List feature, Chrome won’t sync downloaded webpages to your other Android devices. But while iOS will try to update pages saved to Reading List, even going so far as to give you a '404' error on saved webpages that have since disappeared, Chrome treats your saved webpages as permanent snapshots. You can even compared a live webpage and downloaded offline page in separate Chrome tabs.
      p To save a webpage in Chrome, tap the three-dot menu button in the top-right corner of the screen, then tap the Download icon (the one that looks like a down arrow).
      p To access your saved webpages, tap the three-dot menu button again, then tap the Download icon. Tap a downloaded page to view it in Chrome, or tap and hold the page to share it or trash it.

      h4.title Save a webpage as a PDF (Android and iOS)
      p While a webpage added to your iOS Reading List or Downloads in Chrome will look pretty much identical to its live, on-the-web counterpart, a PDF version of the same page may look jumbled and ungainly compared to the original. The upside of a PDF’d webpage, though, is that it’s essentially a digital printout—meaning it’s yours to keep, no matter what happens to the online version of the page.
      p You can create a PDF version of any webpage on your Android or iOS device, but the methods of doing so are somewhat different.

      h5.subheading For Android:
      p First, open the page you want to save in Chrome, tap the three-dot menu button in the top-right corner of the screen, tap Share, then tap Print.
      p Once Android has finished creating a preview of the page you want to save, tap the Save to drop-down menu at the top of the page. Select Save to Google Drive to upload a PDF of the page to your Drive account (make sure you pick the right one if you’re signed in to multiple Google accounts), or tap Save as PDF to save the file to your handset’s local storage.
      p Now, just head to Google Drive to view your saved page (look in the Recent section if you’re not sure which Drive directory you saved the file to), or tap Downloads in the app drawer to find the file in your handset’s local storage.
      p Note: Sure, you could try tapping Share > Google Drive to save a webpage from Chrome to your Drive account, but all you’d be doing is saving a tiny text file with the page’s URL.

      h5.subheading For iOS:
      p Go ahead and open a webpage in Safari, tap the Action button (again, it’s the square button with the upward arrow), then tap a Save PDF button in the top row (at the very least, there should be a Save PDF to iBooks button).
      p If you’re a Dropbox user, the Save to Dropbox option under the iOS Action button will save webpages as PDFs to your Dropbox account.

    // Print-only Table of Contents
    section(id="tableOfContents").page
      h3.display-2 Table of Contents
      v-layout(row)
        v-flex(md4 v-for="(third, index) in tocThirds" v-bind:key="index")
          div(v-for="item in third")
            div(v-if="item.lookup") {{ item.title }}
              ul.toc-list
                li(v-for="(subItem, i) in tocLookup(item.lookup)" v-bind:key="i")
                  a(:href="subItem.anchor").xref {{ subItem.title }}
            div(v-else-if="item.header").toc-header {{ item.header }}
            div(v-else-if="item.divider").toc-divider
            div(v-else).toc-item
              a(v-bind:href="item.anchor").xref {{ item.title }}

    // License
    section(id="phb-license").page
      license

    // Rules
    section(v-for="(page, key) in pages" v-bind:key="key" v-if="page.rules" v-bind:id="key").page
      h2.display-1 {{ page.name }}
      div(v-for="(rule, index) in pageRules(page.rules)" v-bind:key="index")
        rule-card(:id="rule.id")

    // Races
    section.page
      h3.display-2 Races
      div(v-for="race in races" v-bind:key="race.id" v-bind:id="race.id").pdf-page
        h4.display-1.pt-3 {{ race.name }}
        v-layout(row wrap).race-row
          v-flex(xs12 md8)
            race-info(:race="race")
          v-flex(hidden-sm-and-down md4)
            img(:src="race.bodyImg" height="800px")
            p(v-if="race.id == 'prothean'").text-xs-center #[small #[em image courtesy of JTickner]]

    // Classes
    section.page
      h3.display-2 Classes
      div(v-for="item in classes" v-bind:key="item.id" v-bind:id="item.id").pdf-page
        h4.display-1.pt-3
          v-avatar(size="48" tile)
            img(:src="`/images/classes/${item.id}.svg`")
          span {{ item.name }}
        p {{ item.description}}
        progression-table(:item="item" v-bind:colors="colors[item.id]")
        class-attributes(:item="item" v-bind:primaryColor="colors[item.id].primary")
        div(:class="colors[item.id].primary").hr
        p.headline Class Features
        div(v-for="(feature, index) in classFeatures(item)" v-bind:key="index").class-feature
          div(v-if="feature.id === 'ability_score_improvement'").mb-2
            p.title.mb-0 Ability Score Improvement
            div.
              When you reach {{ feature.level.level | ordinal }}, and again at {{ abiLevels(feature.levels) }}
          div(v-else)
            class-feature(:id="feature.id" v-bind:featureLevel="feature.level")
        div(:class="colors[item.id].primary").hr
        p.headline Subclasses
          div(v-for="(subclass, index) of item.subclasses" v-bind:key="`${item.id}-subclass-${index}`")
            p.display-1.font-weight-thin.mb-2 {{ subclass.name.toUpperCase() }} #[small(v-if="subclass.source") ({{ subclass.source }})]
            p {{ subclass.description }}
            div(v-for="(features, i) in subclass.features" v-bind:key="`${item.id}-subclass-${index}-${i}`").class-feature
              div(v-for="f in features" v-bind:key="f")
                class-feature(:id="f" v-bind:featureLevel="subClassFeatureLevels(item, i)")

    // Backgrounds
    section.page
      h3(id="backgrounds").display-2 Backgrounds
      div(v-for="item in backgrounds" v-bind:key="item.id").my-5
        h4.display-1 {{ item.name }}
        markdown-file(:id="item.id" itemType="backgrounds")

    // Feats
    section.page
      h3(id="feats").display-2 Feats
      h4.display-1.mt-3 Removed
      p.
        The following feats from the 5th Edition Player's Manual are not available. The have been removed due to
        consistency errors, like #[em Crossbow Expert], since there are no crossbows in this game: Crossbow Expert,
        Defensive Duelist, Dungeon Delver, Great Weapon Master, Healer, Inspiring Leader, Linguist, Magic Initiate,
        Martial Adept, Polearm Master, Spell Sniper.
      h4.display-1.mt-3 Feat Changes
      p #[strong Mage Slayer] name changed to #[strong Biotic Slayer].
      p #[strong Elemental Adept]. Your options for damage types are: Fire, Cold, Lightning, Force, and Necrotic
      p #[strong Weapon Master]. You gain proficiency with 2 weapon types instead of 4.
      h4.display-1 New
      div(v-for="feat in newFeats" v-bind:key="feat.name").my-3
        h5.title {{ feat.name }}
        markdown-file(:id="feat.id" itemType="feats")

    // Weapons
    section.page
      h3.display-2 Weapons
      div(v-for="type in weaponTypes" v-bind:key="type")
        h4(:id="`${type.replace(' ', '_').toLowerCase()}`").display-1 {{ type }}s
        v-layout(row wrap)
          v-flex(v-for="weapon in weapons.filter(weapon => weapon.type === type)" v-bind:key="weapon.id" xs12 md6 d-flex).pa-1
            weapon-info(:weapon="weapon").info-card
      h4(id="weapon_mods").display-1 Weapon Mods
      table.table
        thead
          tr #[th Name] #[th Cost] #[th Placement] #[th Weapon(s)] #[th Description]
        tbody
          tr(v-for="mod in weaponMods" v-bind:key="mod.id")
            td {{ mod.name }}
            td {{ mod.cost | groupDigits(',') }}
            td {{ mod.placement }}
            td {{ mod.availability }}
            td {{ mod.feature }}

    // Armor
    section.page
      h3.display-2 Armor
      h4(id="armor_sets").display-1 Armor Sets
      table.table
        thead
          tr #[th Name] #[th Cost] #[th Type] #[th Armor] #[th Description]
        tbody
          tr(v-for="mod in armorSets" v-bind:key="mod.id")
            td {{ mod.name }}
            td {{ mod.cost | groupDigits(',') }}
            td {{ mod.type }}
            td {{ mod.armorType }}
            td
              ul(v-if="mod.feature")
                li(v-for="(f, index) in mod.feature.split('--').map(f => f.trim())" v-bind:key="index") {{ f }}
      h4(id="armor_mods").display-1 Armor Mods
      table.table
        thead
          tr #[th Name] #[th Cost] #[th Type] #[th Description]
        tbody
          tr(v-for="mod in armorMods" v-bind:key="mod.id")
            td {{ mod.name }}
            td {{ mod.cost | groupDigits(',') }}
            td {{ mod.type }}
            td {{ mod.feature }}

    // grenades
    section.page
      h3(id="grenades-mines").display-2 Grenades
      v-layout(row wrap)
        v-flex(v-for="g in grenades" v-bind:key="g.id" xs12 md6 d-flex).pa-1
          v-card
            v-card-text
              p.title.mb-0 {{ g.name }}
              div.hr
              markdown-file(:id="g.id" itemType="grenades")

    // programs
    section.page
      h3(id="programs").display-2 Omni-tool Programs
      v-layout(row wrap)
        v-flex(v-for="p in programs" v-bind:key="p.id" xs12 md6 d-flex).pa-1
          v-card
            v-card-text
              p.title.mb-0 {{ p.name }}
              p(v-if="p.installation").body-1 #[em requires installation]
              div.hr
              markdown-file(:id="p.id" itemType="programs")

    // programs
    section.page
      h3(id="tools-kits").display-2 Tools & Kits
      v-layout(row wrap)
        v-flex(v-for="item in tools" v-bind:key="item.id" xs12 md6 d-flex).pa-1
          v-card
            v-card-text
              p.title.mb-0 {{ item.name }}
              p.body-1 Cost: {{ item.cost }}
              div.hr
              markdown-file(:id="item.id" itemType="tools")

    // Spells
    section.page
      h3(id="spells").display-2 Spells
      v-layout(row wrap)
        v-flex(v-for="spell in spells" v-bind:key="spell.id" xs12 md6 d-flex).pa-3
          spell-info(v-bind:spell="spell" v-bind:key="spell.id").info-card

    // Bestiary
    section.page
      h3(id="bestiary").display-2 Bestiary
      v-layout(row wrap)
        v-flex(v-for="npc in bestiary" v-bind:key="npc.id" xs12 md6 d-flex).pa-3
          stat-block(:stats="npc").info-card

    // Spells
    section.page
      h3(id="vehicles").display-2 Vehicles
      h4.display-1 Transports
      v-layout(row wrap)
        v-flex(v-for="item in transports" v-bind:key="item.id" xs12 md6 d-flex).pa-3
          vehicle-info(:item="item").info-card
      h4.display-1 Starships
      v-layout(row wrap)
        v-flex(v-for="item in starships" v-bind:key="item.id" xs12 md6 d-flex).pa-3
          vehicle-info(:item="item").info-card

    // Conditions
    section.page
      h3(id="conditions").display-2 Conditions
      div(v-for="condition in conditions" v-bind:key="condition.id").my-3
        p.title.mb-0 {{ condition.name }}
        markdown-file(:id="condition.id" itemType="conditions")

    // Skills
    section.page
      h3(id="skills").display-2 Skills
      div(v-for="skill in skills" v-bind:key="skill.id").my-3
        p.title.mb-0 {{ skill.name }}
          span.body-1.pl-2 {{ skill.link }}
        p {{ skill.description }}

      // Alt Sentinel
      section.page
        h3(id="alt-sentinel").display-2 Alternate Sentinel Progression
        progression-table(:item="altSentinel" v-bind:colors="colors['sentinel']")
        class-attributes(:item="altSentinel" v-bind:primaryColor="colors['sentinel'].primary")

      // Creating Armor
      section.page
        h3(id="creating-armor").display-2 Creating Armor
        creating-armor

</template>

<script>
  // Data
  import classes from '~/static/data/classes'
  import races from '~/static/data/races'
  import rules from '~/static/data/rules'
  import backgrounds from '~/static/data/backgrounds'
  import feats from '~/static/data/feats'
  import weapons from '~/static/data/weapons'
  import weaponMods from '~/static/data/weapon_mods'
  import armorSets from '~/static/data/armor_sets'
  import armorMods from '~/static/data/armor_mods'
  import grenades from '~/static/data/grenades'
  import programs from '~/static/data/programs'
  import tools from '~/static/data/tools'
  import spells from '~/static/data/spells'
  import bestiary from '~/static/data/bestiary'
  import conditions from '~/static/data/conditions'
  import skills from '~/static/data/skills'
  import altSentinel from '~/static/data/alt_sentinel'
  import vehicles from '~/static/data/vehicles'

  // Components
  import License from '~/components/License.vue'
  import RuleCard from '~/components/RuleCard.vue'
  import RaceInfo from '~/components/race/RaceInfo.vue'
  import ProgressionTable from '~/components/class/ProgressionTable.vue'
  import ClassAttributes from '~/components/class/ClassAttributes.vue'
  import ClassFeature from '~/components/class/ClassFeature.vue'
  import WeaponInfo from '~/components/weapon/WeaponInfo.vue'
  import SpellInfo from '~/components/spell/SpellInfo.vue'
  import StatBlock from '~/components/npc/StatBlock.vue'
  import CreatingArmor from '~/components/CreatingArmorInfo'
  import VehicleInfo from '~/components/vehicle/VehicleInfo.vue'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      License,
      RuleCard,
      RaceInfo,
      ProgressionTable,
      ClassAttributes,
      ClassFeature,
      WeaponInfo,
      SpellInfo,
      StatBlock,
      CreatingArmor,
      VehicleInfo
    },
    data () {
      const newFeats = feats.filter(f => f.new)
      const weaponTypes = ['Assault Rifle', 'Heavy Pistol', 'Melee', 'Shotgun', 'SMG', 'Sniper Rifle', 'Heavy Weapon']
      return {
        drawer: null,
        classes,
        races,
        rules,
        weaponTypes,
        backgrounds,
        newFeats,
        weapons,
        weaponMods: weaponMods.sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1),
        armorSets: armorSets.sort((a, b) => {
          return a.type === b.type
            ? a.name === b.name ? 0 : a.name > b.name ? 1 : -1
            : a.type > b.type ? 1 : -1
        }),
        armorMods: armorMods.sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1),
        grenades: grenades.sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1),
        programs: programs.sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1),
        tools: tools.sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1),
        spells: spells.sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1),
        bestiary: bestiary.sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1),
        conditions: conditions.sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1),
        skills: skills.sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1),
        altSentinel,
        transports: vehicles.filter(v => v.vehicle.type === 'transport'),
        starships: vehicles.filter(v => v.vehicle.type === 'starship')
      }
    },
    computed: {
      ...mapGetters('phb', {
        version: 'version',
        pages: 'pages'
      }),
      ...mapGetters('classPage', {
        colors: 'colors'
      }),
      toc () {
        const rulePages = Object.values(this.pages).filter(p => p.rules).map(p => {
          return {title: p.name, lookup: p.rules}
        })
        return [
          {header: 'Preface'},
          {title: 'License', anchor: '#phb-license'},
          {title: 'Introduction', anchor: '#phb-intro'},
          {divider: true},
          {header: 'Rules'},
        ].concat(rulePages)
        .concat([
          {divider: true},
          {header: 'Player Options'},
          {title: 'Races', lookup: 'races'},
          {title: 'Classes', lookup: 'classes'},
          {title: 'Backgrounds', anchor: '#backgrounds'},
          {title: 'Feats', anchor: '#feats'},
          {divider: true},
          {header: 'Equipment'},
          {title: 'Weapons', lookup: 'weapons'},
          {title: 'Armor', lookup: 'armor'},
          {title: 'Grenades & Mines', anchor: '#grenades-mines'},
          {title: 'Omni-tool Programs', anchor: '#programs'},
          {title: 'Tools & Kits', anchor: '#tools-kits'},
          {divider: true},
          {title: 'Spells', anchor: '#spells'},
          {title: 'Bestiary', anchor: '#bestiary'},
          {title: 'Vehicles', anchor: '#vehicles'},
          {title: 'Appendix', lookup: 'appendix'}
        ])
      },
      tocThirds () {
        const firstThird = this.toc.slice(0,10)
        const secondThird = this.toc.slice(10, 17)
        const thridThird = this.toc.slice(17, this.toc.length)
        return [firstThird, secondThird, thridThird]
      }
    },
    head () {
      return {
        title: `Mass Effect 5e | Printable Player's Manual`,
        meta: [
          { hid: 'description', name: 'description', content: 'Printable version of the player\'s manual' }
        ]
      }
    },
    layout: 'print',
    methods: {
      tocLookup(id) {
        let items = []
        switch (id) {
          case 'classes':
            for (const c of this.classes) {
              items.push({title: c.name, anchor: `#${c.id}`})
            }
            break
          case 'races':
            for (const race of this.races) {
              items.push({title: race.name, anchor: `#${race.id}`})
            }
            break
          case 'weapons':
            items = this.weaponTypes.map(type => {
              return {title: type, anchor: `#${type.replace(' ', '_').toLowerCase()}`}
            })
            items.push({title: 'Mods', anchor: '#weapon_mods'})
            break
          case 'armor':
            items = [
              {title: 'Sets', anchor: '#armor_sets'},
              {title: 'Mods', anchor: '#armor_mods'}
            ]
            break
          case 'appendix':
            items = [
              {title: 'Conditions', anchor: '#conditions'},
              {title: 'Skills', anchor: '#skills'},
              {title: 'Alternate Sentinel', anchor: '#alt-sentinel'},
              {title: 'Creating Armor', anchor: '#creating-armor'},
            ]
            break
          default:
            const rules = this.pageRules(id)
            for (const rule of rules) {
              items.push({title: rule.title, anchor: `#${rule.hash}`, new: rule.new, change: rule.change })
            }
        }
        return items
      },
      classFeatures (c) {
        const features = [{id: 'ability_score_improvement', levels: [], level: false}]
        for (const level of c.progression) {
          for (const feature of level.features) {
            // skip subclass
            if (feature === 'subclass') {
              continue
            }
            // force ability scores
            if (feature === 'ability_score_improvement') {
              if (!features[0].level) {
                features[0].level = level
              } else {
                features[0].levels.push(level.level)
              }
              continue
            }
            // group by id without increase
            const lastInt = feature.split('_').pop()
            let fName = feature
            if (Number.isInteger(lastInt)) {
              const splits = feature.split('_')
              splits.pop()
              fName = splits.join('_')
            }
            const pIndex = features.findIndex(f => f.id === fName)
            // get the item
            if (pIndex > -1) {
              features[pIndex].addl.push({feature, level})
            } else {
              features.push({
                id: fName,
                level: level,
                addl: []
              })
            }
          }
        }
        return features.sort((a, b) => {
          return a.level.level === b.level.level ? 0 : a.level.level > b.level.level ? 1 : -1
        })
      },
      abiLevels (levels) {
        levels = levels.map(l => this.$options.filters.ordinal(l))
        const last = levels.pop()
        return levels.join(', ') + ', and ' + last
      },
      subClassFeatureLevels (c, index) {
        return c.progression.filter(level => level.features.includes('subclass'))[index]
      },
      pageRules(section) {
        return this.rules.filter(r => r.section === section).filter(r => r.hash !== 'vehicle-list')
      },
      goToRule (rule) {
        this.$vuetify.goTo(rule, { offset: -58 })
      }
    }
  }
</script>

<style>

  main {
    margin-left: 10px;
  }

  #phbLogo {
    width: 100%;
    height: auto;
  }

  @media screen and (min-width: 960px) {
    #phbLogo {
      width: auto;
      height: 90px;
    }
    main {
      margin-left: 0;
    }
  }

  #tableOfContents {
    display: none;
  }
  .toc-header {
    font-size: 18px;
    font-weight: 600;
  }

  .info-card {
    padding: 4px;
    border: 3px solid #eee
  }

  .class-feature {
    margin-bottom: 2em;
  }
  .class-feature .title {
    margin-bottom: 0;
  }
  .class-feature p {
    margin-bottom: 5px;
  }

  section.page:first-of-type {
    margin-top: 150px;
  }
  section.page {
    max-width: 1200px;
    margin: auto;
    padding: 3em 0;
    border-bottom: 1px solid #ddd;
  }

  #spvToolbar {
    z-index: 6;
  }

  .table, table.v-table, .table.alt-table {
    margin: 10px;
    border: 1px solid #ddd;
  }

  .table thead, table.v-table thead, .table.alt-table thead {
    border-bottom: 2px solid #bbb;
  }

  .table thead tr, .table tbody td, .table thead th, table.v-table thead tr, table.v-table tbody td, table.v-table tbody th {
    height: auto !important;
    padding: 0 4px !important;
  }

  @media print {
    .v-image {
      display: none;
    }

    main {
      margin-left: 0;
    }

    #tableOfContents {
      display: block;
    }

    p, li, div {
      font-size: 12px;
      line-height: 16px;
    }

    p, div {
      margin-bottom: 8px;
    }

    #spvNavDrawer, #spvToolbar, #download {
      display: none;
    }

    .full-width-td {
      display: none;
    }

     {
      padding-top: 0;
    }

    .layout.row .flex.md8 {
      width: 75%;
      flex-basis: 75%;
    }

    .layout.row .flex.md6 {
      width: 50%;
      flex-basis: 50%;
    }

    .layout.row .flex.md4, .layout.row .flex.sm3 {
      width: 25%;
      flex-basis: 25%;
    }

    section.page {
      width: 100%;
      max-width: 100%;
      padding: 0;
      border-bottom: none;
      page-break-after: always;
    }
    .pdf-page {
      page-break-after: always;
    }

    @page:right{
      @bottom-right {
        content: counter(page);
      }
    }

    #phbLogo { width: 6in }
  }
</style>
