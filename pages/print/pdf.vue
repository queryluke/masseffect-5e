<template>
  <v-container>
    <me-page-title />
    <p>
      With the release of v1.2.0, I've put the entirety of the Player's Manual
      into <a href="https://homebrewery.naturalcrit.com" target="_blank">Homebrewery</a>. Below you'll find the links
      each version of the final combined PDF, starting from v0.8.4. This is intended for people
      who want to use a specific version of the game (i.e., if they felt a previous version was more to their liking).
    </p>
    <p>
      Starting from v1.2.0, you can even download specific sections of that version, allowing you to pick and choose
      the parts you want to play with and even make your own edits in Homebrewery.
    </p>
    <v-card>
      <v-card-title>Making your own edits</v-card-title>
      <v-card-text>
        <ol>
          <li>Click the <v-icon>mdi-chevron-down</v-icon> dropdown on the Version you want (<em>Note: only available after v1.2.0</em>)</li>
          <li>Click the section you want to use. This will navigate you to a raw markdown file.</li>
          <li>Copy the contents of this page (CTRL/CMD + A, then CTRL/CMD + C)</li>
          <li>Next, open up a <a href="https://homebrewery.naturalcrit.com/new" target="_blank">new homebrewery editor</a></li>
          <li>Paste the contents of the page from step 3 (CTRL/CMD + P)</li>
          <li>Edit away! Homebrewery is based on <a href="https://www.markdownguide.org/" target="_blank">Markdown</a> with a lot of additional bells and whistles. The editing menu has plenty of examples.</li>
        </ol>
      </v-card-text>
    </v-card>
    <h2>Versions</h2>
    <v-row>
      <v-col v-for="version in versions" :key="version.changelog" cols="12" md="6" lg="4">
        <me-pdf-version :version="version" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      versions: [
        {
          name: 'v1.2.0',
          changelog: '1-2-0',
          link: 'https://drive.google.com/file/d/1sEDVw7OkUistQUSXcbX8BcLVah4gGnFK/view?usp=sharing',
          sections: [
            'License', 'Introduction', 'Chapter 1: Step-by-Step Characters', 'Chapter 2: Races', 'Angara', 'Asari',
            'Batarian', 'Drell', 'Elcor', 'Geth', 'Hanar', 'Human', 'Krogan', 'Prothean', 'Quarian', 'Salarian',
            'Turian', 'Volus', 'Vorcha', 'Chapter 3: Classes', 'Adept', 'Engineer', 'Infiltrator', 'Sentinel', 'Soldier',
            'Vanguard', 'Chapter 4: Personality & Background', 'Chapter 5: Equipment', 'Chapter 6: Customization Options',
            'Chapter 7: Using Ability Scores', 'Chapter 8: Missions', 'Chapter 9: Combat', 'Chapter 10: Vehicles',
            'Chapter 11: Vehicle List', 'Chapter 12: Spellcasting', 'Chapter 13: Spells', 'Appendix A: Armor Sets',
            'Appendix B: Armor Mods', 'Appendix C: Weapons', 'Appendix D: Weapon Mods', 'Appendix E: Grenades & Mines',
            'Appendix F: Omni-tool Programs', 'Appendix G: Conditions', 'Appendix H: Bestiary'
          ]
        },
        {
          name: 'v1.1.0',
          changelog: '1-1-0',
          link: 'https://drive.google.com/file/d/1DcIQhXi2QuP-EuLGXnkk1rPnPe8Y3xzg/view?usp=sharing'
        },
        {
          name: 'v1.0.0',
          changelog: '1-0-0',
          link: 'https://drive.google.com/file/d/1PBVKryayPyAUibJ0XiEi2WvGSQGLrP9D/view?usp=sharing'
        },
        {
          name: 'v0.9.2',
          changelog: '0-9-2',
          link: 'https://drive.google.com/file/d/1hR63JVeS21uYYAnrV8PCCbsHV_jvKm8Y/view?usp=sharing'
        },
        {
          name: 'v0.9.0',
          changelog: '0-9-0',
          link: 'https://drive.google.com/file/d/1H6ywGQ80GPqoIYh0cvHnqs5UdEV5QZib/view?usp=sharing'
        },
        {
          name: 'v0.8.4',
          changelog: '0-8-4',
          link: 'https://drive.google.com/file/d/1DutYdSFORN7-jLi2r9-bpCK763je-k9h/view?usp=sharing'
        }
      ],
      links: [
        {
          title: 'Chapter 1: Step-by-Step Characters',
          link: 'chapter-1'
        },
        {
          title: 'Chapter 2: Races',
          link: 'chapter-2'
        },
        {
          title: 'Chapter 3: Classes',
          link: 'chapter-3'
        },
        {
          title: 'Chapter 4: Personality & Background',
          link: 'chapter-4'
        },
        {
          title: 'Chapter 5: Equipment',
          link: 'chapter-5'
        },
        {
          title: 'Chapter 6: Customization Options',
          link: 'chapter-6'
        },
        {
          title: 'Chapter 7: Using Ability Scores',
          link: 'chapter-7'
        },
        {
          title: 'Chapter 8: Missions',
          link: 'chapter-8'
        },
        {
          title: 'Chapter 9: Combat',
          link: 'chapter-9'
        },
        {
          title: 'Chapter 10: Vehicles',
          link: 'chapter-10'
        },
        {
          title: 'Chapter 11: Vehicle List',
          link: 'chapter-11'
        },
        {
          title: 'Chapter 12: Spellcasting',
          link: 'chapter-12'
        },
        {
          title: 'Chapter 13: Spells',
          link: 'chapter-13'
        }
      ]
    }
  },
  head () {
    return {
      title: 'PDF | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'Mass Effect 5e PDF' }
      ]
    }
  },
  created () {
    this.$store.commit('pageTitle', 'Mass Effect 5e PDF')
  }
}
</script>
