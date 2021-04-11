<template>
  <v-container>
    <v-row v-if="manualIntroduction && $vuetify.breakpoint.mdAndUp" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
        <v-img
          :src="require('~/assets/images/me5e_logo_1200w.png')"
          alt="Mass Effect 5e logo"
          class="my-10"
        />
        <div class="display-2">
          {{ $t('manual.title') }}
        </div>
        <p class="title">
          {{ version }}
        </p>
        <v-row justify="center">
          <v-col>
            <v-btn color="secondary" to="/changelog" nuxt>
              {{ $t('site.pages.changelog.title') }}
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="secondary" to="/about" nuxt>
              {{ $t('site.join_community') }}
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="secondary" to="/license" nuxt>
              {{ $t('site.pages.license.title') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <me-page-title v-else />
    <me-manual-card v-for="section in sections" :key="section.id" :item="section" />
  </v-container>
</template>

<script>

export default {
  layout: 'manual',
  async asyncData ({ params, store }) {
    const data = await store.dispatch('FETCH_LOTS', ['manual', 'manual-index'])
    const page = data[1].find(i => i.id === params.id)
    const sections = page.sections.map((section) => {
      const sectionText = data[0].find(i => i.id === section.id)
      return { ...section, ...sectionText }
    })
    store.commit('pageTitle', page.title)
    store.commit('setCurrentRules', sections)
    return {
      page,
      sections
    }
  },
  head () {
    return {
      title: `${this.$store.getters.pageTitle} | Mass Effect 5e`,
      meta: [
        { hid: 'description', name: 'description', content: 'Want to play D&D in the Mass Effect Universe? This manual has everything you need!' }
      ]
    }
  },
  computed: {
    manualIntroduction () {
      return this.$route.params.id === 'intro'
    },
    version () {
      return this.$config.version
    }
  }
}
</script>
