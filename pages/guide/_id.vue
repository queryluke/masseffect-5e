<template>
  <v-container>
    <me-page-title />
    <me-rule-card v-for="item in sections" :key="item.id" :item="item" />
  </v-container>
</template>

<script>

export default {
  layout: 'manual',
  async asyncData ({ params, store, i18n }) {
    const data = await store.dispatch('FETCH_LOTS', ['guide', 'guides-index'])
    const page = data[1].find(i => i.id === params.id)
    const sections = page.sections.map((section) => {
      const sectionText = data[0].find(i => i.id === section.id)
      return { ...section, ...sectionText }
    })
    store.commit('setCurrentRules', sections)
    store.dispatch('SET_META', { title: i18n.t(page.title), description: i18n.t('meta.guide') })
    return {
      page,
      sections
    }
  }
}
</script>
