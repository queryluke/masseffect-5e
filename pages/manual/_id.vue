<template>
  <v-container>
    <v-row v-if="manualIntroduction && $vuetify.breakpoint.mdAndUp" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
        <v-img
          srcset="/images/me5e_logo_450w.png 450w, /images/me5e_logo_600w.png 600w, /images/me5e_logo_720w.png 720w, /images/me5e_logo_900w.png 900w, /images/me5e_logo_1200w.png 1200w"
          sizes="(max-width: 320px) 320px, (max-width: 480px) 480px, (max-width: 600px) 600px, (max-width: 720px) 600px, (max-width: 900px) 720px, (max-width: 1200px) 900px, 1200px"
          src="/images/me5e_logo_1200w.png"
          alt="Mass Effect 5e logo"
          class="my-10"
        />
        <div class="display-2">
          Player's Manual
        </div>
        <p class="title">
          v{{ version }}
        </p>
        <v-row justify="center">
          <v-col>
            <v-btn color="secondary" to="/changelog" nuxt>
              Changelog
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="secondary" to="/contributing" nuxt>
              Get Involved
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <me-page-title v-else :title="pageTitle" />
    <me-rule-card v-for="rule in rules" :key="rule.id" :item="rule" />
  </v-container>
</template>

<script>

export default {
  async fetch () {
    this.$store.commit('pageTitle', this.pageTitle)
    await this.$store.dispatch('FETCH_DATA', 'rules')
    this.rules = this.$store.getters.getData('rules')
      .filter(rule => rule.section === this.$route.params.id)
      .sort((a, b) => a.order > b.order ? 1 : -1)
    this.$store.commit('setCurrentRules', this.rules)
  },
  data () {
    return {
      titles: {
        intro: 'Introduction',
        'character-creation': 'Step-By-Step Characters',
        'beyond-first-level': 'Beyond 1st Level',
        'using-ability-scores': 'Using Ability Scores',
        missions: 'Missions',
        equipment: 'Equipment',
        finances: 'Finances',
        vehicles: 'Vehicles',
        combat: 'Combat',
        spellcasting: 'Spellcasting',
        monsters: 'Monsters'
      },
      rules: []
    }
  },
  computed: {
    manualIntroduction () {
      return this.$route.params.id === 'intro'
    },
    version () {
      return this.$store.getters.version
    },
    pageTitle () {
      return this.titles[this.$route.params.id]
    }
  },
  head () {
    return {
      title: `${this.pageTitle} | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: 'Want to play D&D in the Mass Effect Universe? This manual has everything you need!' }
      ]
    }
  },
  layout: 'manual'
}
</script>
