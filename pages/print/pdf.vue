<template lang="pug">
  //main
    v-navigation-drawer(v-model="drawer" fixed clipped floating right id="spvNavDrawer" class="blue-grey lighten-5")
      v-list(dense)
        template(v-for="item in tocA.slice(0).concat(tocB)")
          v-list-group(v-if="item.lookup" no-action)
            v-list-tile(slot="activator" ripple)
              v-list-tile-content
                v-list-tile-title {{ item.title }}
            template(v-for="(subItem, i) in tocLookup(item.lookup)")
              v-list-tile(:key="i" v-bind:href="subItem.anchor" ripple rel="noopener")
                v-list-tile-content
                  v-list-tile-title {{ subItem.title }}
          v-subheader(v-else-if="item.header") {{ item.header }}
          v-divider(v-else-if="item.divider")
          v-list-tile(v-else v-bind:href="item.anchor" ripple rel="noopener")
            v-list-tile-content
              v-list-tile-title {{ item.title }}
    v-toolbar(dense fixed id="spvToolbar")
      v-toolbar-title Mass Effect 5e #[span.hidden-xs-only -  Player's Handbook #[small.hidden-sm-and-down (Single Page Version)]]
      v-spacer
      v-btn(icon @click="drawer = !drawer") #[v-icon view_list]
    // Frontmatter
    section.page
      div.my-5.text-xs-center
        img(src="/images/me5e_logo_notm.png" id="phbLogo" alt="Mass Effect 5e Logo").mb-4
        h1.sr-only Mass Effect 5e
        h2.display-3 Player's Handbook
        p.title v{{ version }}
      div.my-5.text-xs-center
        p.title Contact Us: #[a(mailto="info@n7.world") info@n7.world]
          p.body-1.ma-0 #[strong Disclaimer]
          p.caption.ma-0.
            This Homebrew supplement is not sanctioned by or affiliated with #[a(href="https://www.ea.com" target="_blank") Electronic Arts Inc],
            #[a(href="http://www.bioware.com/en/" target="_blank") BioWare],
            #[a(href="http://company.wizards.com/" target="_blank") Wizards of the Coast], or any other rights-holding company or entity.
          p.caption.ma-0.
            This conversion of the #[a(href="http://dnd.wizards.com/" target="_blank") Dungeon's and Dragons 5th Ed] is licensed under
            #[a(href="https://github.com/queryluke/masseffect-5e/blob/master/LICENSE.txt" target="_blank") GNU General Public License v3.0]
          p.caption.ma-0.mb-2.
            Except where otherwise noted, images on this site are from the #[a(href="http://masseffect.wikia.com/wiki/Mass_Effect_Wiki" target="_blank") Mass Effect Wikia]
            and are licensed under a #[a(href="http://creativecommons.org/licenses/by/4.0/" target="_blank") Creative Commons Attribution 4.0 International license].
          div This homebrew is licensed under GPL-3.0
          div © Mass Effect 5e {{ new Date().getFullYear() }}
      v-layout(row justify-center)
        v-flex(xs12 sm8 lg6)
          v-alert(:value="true" type="warning").black--text.
            This page is generated from components in the web version of the site. Except for the table of contents, links and buttons
            #[em within] this document will link out to the web version of the Player's Handbook. At some point in the future,
            we will create a better PDF version of the rules.

    section(id="download").page
      h3.display-2 Create and offline version (cached or PDF)
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
        v-flex(md6)
          div(v-for="item in tocA")
            div(v-if="item.lookup") {{ item.title }}
              ul.toc-list
                li(v-for="(subItem, i) in tocLookup(item.lookup)" v-bind:key="i")
                  a(:href="subItem.anchor").xref {{ subItem.title }}
            div(v-else-if="item.header").toc-header {{ item.header }}
            div(v-else-if="item.divider").toc-divider
            div(v-else).toc-item
              a(v-bind:href="item.anchor").xref {{ item.title }}
        v-flex(md6)
          div(v-for="item in tocB")
            div(v-if="item.lookup") {{ item.title }}
              ul.toc-list
                li(v-for="(subItem, i) in tocLookup(item.lookup)" v-bind:key="i")
                  a(:href="subItem.anchor").xref {{ subItem.title }}
            div(v-else-if="item.header").toc-header {{ item.header }}
            div(v-else-if="item.divider").toc-divider
            div(v-else).toc-item
              a(v-bind:href="item.anchor").xref {{ item.title }}

    // Rules
    section(v-for="(page, key) in pages" v-bind:key="key" v-if="page.rules && key !== 'phb-items'" v-bind:id="key").page
      rule-helper(:title="page.name" v-bind:rules="page.rules")

    // Races
    section.page
      h3.display-2 Races
      div(v-for="race in races" v-bind:key="race.id" v-bind:id="race.id").anchor-pad
        h4.display-1.pt-3 {{ race.name }}
        p {{ race.snippet}}
        v-layout(row wrap).race-row
          v-flex(xs12 md8)
            h5.title Available Classes
            p {{ race.available_classes }}
            h5.title Racial Traits
            race-trait(:text="race.increases" title="Ability Score Increase")
            race-trait(:text="race.alignment" title="Alignment")
            race-trait(:text="race.size" title="Size")
            race-trait(:text="race.speed" title="Speed")
            race-trait(:text="race.sexy_level" title="Sexy Level")
            race-trait(:text="race.optional_starting_credits" title="Optional Starting Credits")
            race-trait(v-for="trait in racialTraits(race.id)" v-bind:key="trait.id" v-bind:element="trait.description" v-bind:title="trait.name")
          v-flex(hidden-sm-and-down md4)
            img(:src="race.body" height="400px")

    // Classes
    section.page
      h3.display-2 Classes
      div(v-for="item in classes" v-bind:key="item.id" v-bind:id="item.id").anchor-pad.class-page
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
              When your reach {{ feature.level.level | ordinal }}, and again at {{ abiLevels(feature.levels) }}
          div(v-else)
            p.title.mb-0 {{ feature.name }}
            div(v-html="markdownFile('class_features', feature.id, feature.level)")
          div(v-if="feature.addl")
            div(v-for="(f, index) in feature.addl" v-bind:key="index" v-html="markdownFile('class_features', f.feature, f.level)")
        div(:class="colors[item.id].primary").hr
        p.headline Subclasses
          div(v-for="subclass of item.subclasses" v-bind:key="subclass.name")
            p.title.mb-0 {{ subclass.name }}
            p {{ subclass.description }}
            div(v-for="(features, i) in subclass.features" v-bind:key="i").class-feature
              div(v-for="f in features" v-bind:key="f")
                p.body-2.mb-0 {{ getItem('classFeatures', f).name }}
                div(v-html="markdownFile('class_features', f, subClassFeatureLevels(item, i))")

    // Backgrounds
    section.page
      h3(id="backgrounds").display-2.anchor-pad Backgrounds
      div(v-for="item in getData('backgrounds')" v-bind:key="item.id").my-3
        h4.display-1 {{ item.name }}
        div(v-html="markdownFile('backgrounds', item.id)").class-feature

    // Feats
    section.page
      h3(id="feats").display-2.anchor-pad Feats
      h4.display-1.mt-3 Removed
      p.
        The following feats from the 5th Edition Player's Handbook are not available. The have been removed due to
        consistency errors, like #[em Crossbow Expert], since there are no crossbows in this game: {{ feats.notAvailable.join(', ') }}
      h4.display-1 New
      div(v-for="feat in feats.newFeats" v-bind:key="feat.name").my-3
        h5.title {{ feat.name }}
        me-element(:text="feat.description").class-feature

    // Weapons
    section.page
      h3.display-2 Weapons
      div.mt-3
        thermal-clips
      div(v-for="type in weaponTypes" v-bind:key="type")
        h4(:id="`${type.replace(' ', '_').toLowerCase()}`").display-1.anchor-pad {{ type }}s
        div(v-if="type === 'Heavy Weapon'").mt-3
          heavy-weapon-charges
        v-layout(row wrap)
          v-flex(v-for="weapon in getData('weapons').filter(weapon => weapon.type === type)" v-bind:key="weapon.id" xs12 md6 d-flex).pa-1
            weapon-info(:weapon="weapon").info-card
      h4(id="weapon_mods").display-1.anchor-pad Weapon Mods
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
      h4(id="armor_mods").display-1.anchor-pad Armor Mods
      table.table
        thead
          tr #[th Name] #[th Cost] #[th Type] #[th Description]
        tbody
          tr(v-for="mod in armorMods" v-bind:key="mod.id")
            td {{ mod.name }}
            td {{ mod.cost | groupDigits(',') }}
            td {{ mod.type }}
            td {{ mod.feature }}
      h4(id="armor_sets").display-1.anchor-pad Armor Sets
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

    //Other Items
    section.page
      h3.display-2 Other Items
      div(id="grenades-mines").anchor-pad
        grenades
        table.table
          thead
            tr #[th Name] #[th Description]
          tbody
            tr(v-for="g in grenades" v-bind:key="g.id")
              td {{ g.name }}
              td.class-feature
                me-element(:text="g.desc")

      div(id="medi-gel").anchor-pad
        medi-gel

      div(id="omni-gel").anchor-pad
        omni-gel

      div(id="tools-kits").anchor-pad
        tools-kits
        div(v-for="item in getData('kits')" v-bind:key="item.id").class-feature
          p.title.mb-0 {{ item.name }}
          p.body-1 Cost: {{ item.cost }}
          div(v-html="markdownFile('kits', item.id)")

    // Spells
    section.page
      h3(id="spells").display-2 Spells
      v-layout(row wrap)
        v-flex(v-for="spell in getData('spells')" v-bind:key="spell.id" xs12 md6 d-flex).pa-3
          spell-info(v-bind:spell="spell" v-bind:key="spell.id").info-card

    // Bestiary
    section.page
      h3(id="bestiary").display-2 Bestiary
      v-layout(row wrap)
        v-flex(v-for="npc in bestiary" v-bind:key="npc.id" xs12 md6 d-flex).pa-3
          stat-block(:stats="npc").info-card

</template>

<script>
  /*
  import RuleHelper from '~/components/pdf/RuleHelper.vue'
  import RaceTrait from '~/components/pdf/RaceTrait.vue'
  import ProgressionTable from '~/components/class/ProgressionTable.vue'
  import ClassAttributes from '~/components/class/ClassAttributes.vue'
  import MeElement from '~/components/MeElement.vue'
  import WeaponInfo from '~/components/weapon/WeaponInfo.vue'
  import HeavyWeaponCharges from '~/components/phb/HeavyWeaponCharges.vue'
  import ThermalClips from '~/components/phb/ThermalClips.vue'
  import Grenades from '~/components/phb/Grenades.vue'
  import OmniGel from '~/components/phb/OmniGel.vue'
  import ToolsKits from '~/components/phb/ToolsKits.vue'
  import SpellCard from '~/components/cards/SpellCard.vue'
  import SpellInfo from '~/components/pdf/SpellInfo.vue'
  import StatBlock from '~/components/npc/StatBlock.vue'
  import {EnhanceMarkdown} from '~/mixins/enhanceMarkdown.js'
  import {ConfigureMonsters} from '~/mixins/monsters'
  import {mapGetters} from 'vuex'

  // Straight Imports....will need to switch to this eventually
  import ArmorMods from '~/data/armor_mods.json'

  export default {
    components: {
      RuleHelper,
      RaceTrait,
      ProgressionTable,
      ClassAttributes,
      MeElement,
      WeaponInfo,
      HeavyWeaponCharges,
      ThermalClips,
      Grenades,
      MediGel,
      OmniGel,
      SpellCard,
      SpellInfo,
      ToolsKits,
      StatBlock
    },
    computed: {
      ...mapGetters(['getData', 'getMutableData']),
      ...mapGetters('phb', {
        version: 'version',
        pages: 'pages'
      }),
      ...mapGetters('classPage', {
        colors: 'colors'
      })
    },
    created () {
      this.spells = this.getData('spells')
      this.races = this.getData('races')
      this.classes = this.getData('classes')
      const featData = this.getData('feats')
      this.feats = {
        notAvailable: featData.filter(feat => feat.not_available !== null).map(feat => feat.name),
        phbFeats: featData.filter(feat => feat.page_number !== null && feat.not_available === null),
        newFeats: featData.filter(feat => feat.page_number === null && feat.not_available === null)
      }
      this.weaponMods = this.getData('weaponMods').sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1)
      this.armorSets = this.getData('armorSets').sort((a, b) => {
        return a.type === b.type
          ? a.name === b.name ? 0 : a.name > b.name ? 1 : -1
          : a.type > b.type ? 1 : -1
      })
      this.grenades = this.getData('grenades').sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1)
      this.bestiary = this.getMonsters().sort((a, b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1)
    },
    data () {
      const weaponTypes = ['Assault Rifle', 'Heavy Pistol', 'Melee', 'Shotgun', 'SMG', 'Sniper Rifle', 'Heavy Weapon']
      return {
        drawer: null,
        tocA: [
          { header: 'Preface' },
          { title: 'Introduction', anchor: '#phb-intro' },
          { divider: true },
          { header: 'Rules' },
          { title: 'General', lookup: 'phb-rules-general' },
          { title: 'Combat', lookup: 'phb-rules-combat' },
          { title: 'Spellcasting', lookup: 'phb-rules-spellcasting' },
          { title: 'Weapons', lookup: 'phb-rules-weapons' },
          { title: 'Armor', lookup: 'phb-rules-armor' },
          { title: 'Expenses', lookup: 'phb-rules-expenses' },
          { title: 'Multiclassing', lookup: 'phb-rules-multiclassing' }
        ],
        tocB: [
          { divider: true },
          { header: 'Player Options' },
          { title: 'Races', lookup: 'races' },
          { title: 'Classes', lookup: 'classes' },
          { title: 'Backgrounds', anchor: '#backgrounds' },
          { title: 'Feats', anchor: '#feats' },
          { divider: true },
          { header: 'Appendices' },
          { title: 'Weapons', lookup: 'weapons' },
          { title: 'Armor', lookup: 'armor' },
          { title: 'Other Items', lookup: 'other-items' },
          { title: 'Spells', anchor: '#spells' },
          { title: 'Bestiary', anchor: '#bestiary' }
        ],
        weaponTypes,
        armorMods: ArmorMods.data.sort((a, b) => {
          return a.type === b.type
            ? a.name === b.name ? 0 : a.name > b.name ? 1 : -1
            : a.type > b.type ? 1 : -1
        })
      }
    },
    head () {
      return {
        title: `Mass Effect 5e | Printable Player's Handbook`,
        meta: [
          { hid: 'description', name: 'description', content: 'Printable version of the player\'s handbook' }
        ]
      }
    },
    layout: 'print',
    mixins: [EnhanceMarkdown, ConfigureMonsters],
    methods: {
      tocLookup (id) {
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
              return { title: type, anchor: `#${type.replace(' ', '_').toLowerCase()}` }
            })
            items.unshift({ title: 'Thermal Clips', anchor: '#thermal_clips' })
            items.push({ title: 'Mods', anchor: '#weapon_mods' })
            break
          case 'armor':
            items.push({ title: 'Mods', anchor: '#armor_mods' })
            items.push({ title: 'Sets', anchor: '#armor_sets' })
            break
          case 'other-items':
            items.push({ title: 'Grenades & Mines', anchor: '#grenades-mines' })
            items.push({ title: 'Medi-gel', anchor: '#medi-gel' })
            items.push({ title: 'Omni-gel', anchor: '#omni-gel' })
            items.push({ title: 'Tools & Kits', anchor: '#tools-kits' })
            break
          default:
            for (const rule of this.pages[id].rules) {
              const title = this.$options.filters.capitalize(rule.replace(/-/g, ' '))
              items.push({title, anchor: `#${rule}`})
            }
        }
        return items
      },
      racialTraits (id) {
        const availableFeats = this.getMutableData('feats').filter((feat) => feat[id] !== null).map((feat) => feat.name)
        return this.getMutableData('racialTraits').filter((trait) => trait[id] !== null).map((trait) => {
          for (let line of trait.description) {
            if (/{feats}/.test(line.data)) {
              line.data = line.data.replace(/{feats}/, availableFeats.join(', '))
            }
          }
          return trait
        })
      },
      abiLevels (levels) {
        levels = levels.map(l => this.$options.filters.ordinal(l))
        const last = levels.pop()
        return levels.join(', ') + ', and ' + last
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
              features[0].levels.push(level.level)
              if (!features[0].level) {
                features[0].level = level
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
                name: this.getItem('classFeatures', feature).name,
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
      subClassFeatureLevels (c, index) {
        return c.progression.filter(level => level.features.includes('subclass'))[index]
      },
      getItem (type, id) {
        return this.getData(type).find(item => item.id === id)
      },
      markdownFile (dir, id, options = {}) {
        return this.enhanceMarkdown(require(`~/data/${dir}/${id}.md`), options)
      }
    }
  }
  */
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

  .anchor-pad {
    padding-top: 55px;
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

  #spvNavDrawer {
    height: calc(100vh - 48px);
    top: 48px;
    z-index: 6;
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

    .anchor-pad {
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
    .class-page {
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