<template lang="pug">
  v-content.blue-grey.lighten-4
    v-container
      h1 Mass Effect 5e PDF
      p.
        With the release of v1.2.0, I've put the entirety of the Player's Manual
        into #[a(href="https://homebrewery.naturalcrit.com" target="_blank") Homebrewery]. My hope is that this will make
        it much easier for people to adapt the Player's Manual to their own needs and playstyle.

      h2 Complete PDF
      p.
        Below you'll find the link to the final combined PDF. #[strong Note that it is very large, over 200MB!!], so it might
        take some time to download as a PDF. This is intended for those who just want the PDF in a printable format.
      v-btn(href="https://homebrewery.naturalcrit.com/share/rJBqa1GkLS" target="_blank") Mass Effect 5e PDF

      h2 Older Version
      p.
        Here you'll find the older versions of the PDF.
      v-btn(href="https://drive.google.com/open?id=1eDfgpG3JplKUjrIdySJKmyC4qxTi2MUT" target="_blank") Mass Effect 5e PDF

      h2 PDF Parts
      p.
        Finally, if you do want to customize any parts of the PDF and fold them into your own printout, I've broken
        out the PDF into various parts and chapters.

      h3 Making Edits
      p.
        To make your own edits:
      ol
        li Click on the part you want to edit
        li Click on the "SOURCE" navigation button near the upper-right.
        li Select the entire content of this page, and copy.
        li Next, open up a #[a(href="https://homebrewery.naturalcrit.com/new" target="_blank") new homebrewery editor]
        li Paste the "SOURCE" contents into the editor (on the left)
        li Edit away! Homebrewery is based on [Markdown](https://www.markdownguide.org/) with a lot of additional bells and whistles. The editing menu has plenty of examples.

      h3 PDF Parts List
      ul
        li(v-for="part of pdfParts" v-bind:key="part.title")
          a(:href="part.link" target="_blank") {{ part.title }}

</template>

<script>

  export default {
    components: {},
    data () {
      return {
        pdfParts: [
          {
            title: 'License',
            link: 'https://homebrewery.naturalcrit.com/share/ryhSsAArS'
          },
          {
            title: 'Introduction',
            link: 'https://homebrewery.naturalcrit.com/share/r1bcIxQMMr'
          },
          {
            title: 'Chapter 1: Step-by-Step Characters',
            link: 'https://homebrewery.naturalcrit.com/share/Bk-WRyPMfB'
          },
          {
            title: 'Chapter 2: Races',
            link: 'https://homebrewery.naturalcrit.com/share/SJ7dTU14zS'
          },
          {
            title: 'Angara',
            link: 'https://homebrewery.naturalcrit.com/share/S170S78BzH'
          },
          {
            title: 'Asari',
            link: 'https://homebrewery.naturalcrit.com/share/By-JnaLSfB'
          },
          {
            title: 'Batarian',
            link: 'https://homebrewery.naturalcrit.com/share/S1mSK9cGS'
          },
          {
            title: 'Drell',
            link: 'https://homebrewery.naturalcrit.com/share/H13nbocMr'
          },
          {
            title: 'Elcor',
            link: 'https://homebrewery.naturalcrit.com/share/S1ZjPwsqfB'
          },
          {
            title: 'Geth',
            link: 'https://homebrewery.naturalcrit.com/share/rJX5NnjqzH'
          },
          {
            title: 'Hanar',
            link: 'https://homebrewery.naturalcrit.com/share/H1ZkmcMozS'
          },
          {
            title: 'Human',
            link: 'https://homebrewery.naturalcrit.com/share/BkZy8sMofB'
          },
          {
            title: 'Krogan',
            link: 'https://homebrewery.naturalcrit.com/share/BJH-xmsGH'
          },
          {
            title: 'Prothean',
            link: 'https://homebrewery.naturalcrit.com/share/HkN2S7jMH'
          },
          {
            title: 'Quarian',
            link: 'https://homebrewery.naturalcrit.com/share/BJQMAl8sMH'
          },
          {
            title: 'Salarian',
            link: 'https://homebrewery.naturalcrit.com/share/rkZFJ6LofB'
          },
          {
            title: 'Turian',
            link: 'https://homebrewery.naturalcrit.com/share/HJbUpzvoGr'
          },
          {
            title: 'Volus',
            link: 'https://homebrewery.naturalcrit.com/share/HJ4dIwiGH'
          },
          {
            title: 'Vorcha',
            link: 'https://homebrewery.naturalcrit.com/share/SyXIEuPifr'
          },
          {
            title: 'Chapter 3: Classes',
            link: 'https://homebrewery.naturalcrit.com/share/SyZcrPIIGB'
          },
          {
            title: 'Adept',
            link: 'https://homebrewery.naturalcrit.com/share/HyZj-8wIfB'
          },
          {
            title: 'Engineer',
            link: 'https://homebrewery.naturalcrit.com/share/HyabvTvzS'
          },
          {
            title: 'Infiltrator',
            link: 'https://homebrewery.naturalcrit.com/share/SJWnqMouzB'
          },
          {
            title: 'Sentinel',
            link: 'https://homebrewery.naturalcrit.com/share/rJ-RzcCINB'
          },
          {
            title: 'Soldier',
            link: 'https://homebrewery.naturalcrit.com/share/rJz2NJJUB'
          },
          {
            title: 'Vanguard',
            link: 'https://homebrewery.naturalcrit.com/share/B11zdky8B'
          },
          {
            title: 'Chapter 4: Personality & Background',
            link: 'https://homebrewery.naturalcrit.com/share/HJ0eLxYGr'
          },
          {
            title: 'Chapter 5: Equipment',
            link: 'https://homebrewery.naturalcrit.com/share/SJreRZYMB'
          },
          {
            title: 'Chapter 6: Customization Options',
            link: 'https://homebrewery.naturalcrit.com/share/HyVZLW9fr'
          },
          {
            title: 'Chapter 7: Using Ability Scores',
            link: 'https://homebrewery.naturalcrit.com/share/Hk-mZi0ozr'
          },
          {
            title: 'Chapter 8: Missions',
            link: 'https://homebrewery.naturalcrit.com/share/H1BzwO4O7B'
          },
          {
            title: 'Chapter 9: Combat',
            link: 'https://homebrewery.naturalcrit.com/share/H1dkCtK7S'
          },
          {
            title: 'Chapter 10: Vehicles',
            link: 'https://homebrewery.naturalcrit.com/share/BJb378NcQr'
          },
          {
            title: 'Chapter 11: Vehicle List',
            link: 'https://homebrewery.naturalcrit.com/share/HkmLgQsNNS'
          },
          {
            title: 'Chapter 12: Spellcasting',
            link: 'https://homebrewery.naturalcrit.com/share/SkwBasRV4r'
          },
          {
            title: 'Chapter 13: Spells',
            link: 'https://homebrewery.naturalcrit.com/share/HyxBgWPNB'
          },
          {
            title: 'Appendix A: Armor Sets',
            link: 'https://homebrewery.naturalcrit.com/share/rJb_pYWDEH'
          },
          {
            title: 'Appendix B: Armor Mods',
            link: 'https://homebrewery.naturalcrit.com/share/r1bOlyfDVB'
          },
          {
            title: 'Appendix C: Weapons',
            link: 'https://homebrewery.naturalcrit.com/share/B1qHDGv4S'
          },
          {
            title: 'Appendix D: Weapon Mods',
            link: 'https://homebrewery.naturalcrit.com/share/r1-O8Td7_H'
          },
          {
            title: 'Appendix E: Grenades & Mines',
            link: 'https://homebrewery.naturalcrit.com/share/BJbPqMYX_r'
          },
          {
            title: 'Appendix F: Omni-tool Programs',
            link: 'https://homebrewery.naturalcrit.com/share/BJLqrY7_S'
          },
          {
            title: 'Appendix G: Conditions',
            link: 'https://homebrewery.naturalcrit.com/share/HJnLTZ8Or'
          },
          {
            title: 'Appendix H: Bestiary',
            link: 'https://homebrewery.naturalcrit.com/share/SyKLMZudB'
          }
        ]
      }
    },
    head () {
      return {
        title: `PDF | Mass Effect 5e`,
        meta: [
          { hid: 'description', name: 'description', content: 'Mass Effect 5e PDF'}
        ]
      }
    }
  }
</script>
