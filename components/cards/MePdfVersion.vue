<template>
  <v-card>
    <v-card-title>{{ version.name }}</v-card-title>
    <v-card-actions>
      <v-btn text :href="version.link" target="_blank">
        PDF
      </v-btn>
      <v-btn text :to="`/changelog/${version.changelog}`" nuxt>
        Changelog
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="version.sections"
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition v-if="version.sections">
      <div v-show="show">
        <v-divider />
        <v-card-text>
          <v-list dense>
            <v-list-item
              v-for="(section, index) in version.sections"
              :key="index"
              :href="rawMdLink(id, section)"
              target="_blank"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ section }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>

export default {
  props: {
    version: {
      type: Object,
      default: () => {
        return {
          name: '',
          changelog: '0-0-0'
        }
      }
    }
  },
  data () {
    return {
      show: false,
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
  computed: {
    id () {
      return this.version.name.toLowerCase().replaceAll(/\W/gmi, '')
    }
  },
  methods: {
    rawMdLink (versionId, section) {
      const match = this.links.find(i => i.title === section)
      const base = `https://raw.githubusercontent.com/queryluke/masseffect-5e-pdf/master/${versionId}/`
      if (match) {
        return `${base}${match.link}.md`
      } else {
        return `${base}${section.toLowerCase().replaceAll(/:/g, '').replaceAll(' ', '-')}.md`
      }
    }
  }
}
</script>
