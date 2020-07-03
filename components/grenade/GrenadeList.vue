<template lang="pug">
  v-expansion-panel.mb-2
    v-expansion-panel-content(v-for="grenade in items" v-bind:key="grenade.id")
      div(slot="header")
        v-layout
          v-flex.xs12.sm5.md4 {{ grenade.name }}
          v-flex.hidden-xs-only.sm3.md2 {{ grenade.damage }}
          v-flex.hidden-xs-only.sm4.md2 {{ grenade.damageType }}
          v-flex.hidden-sm-and-down.md2 {{ grenade.range }}
          v-flex.hidden-sm-and-down.md2 {{ grenade.blast }}
      v-card.grey.lighten-3
        v-card-text
          grenade-info(:item="grenade")
        v-card-actions
          bookmark-button(:card="grenade" type="grenade" v-bind:props="{flat: true}")
</template>

<script>
import grenades from '~/static/data/grenades.json'
import GrenadeInfo from '~/components/grenade/GrenadeInfo.vue'
import BookmarkButton from '~/components/BookmarkButton.vue'

export default {
  components: {
    GrenadeInfo,
    BookmarkButton
  },
  data () {
    return {
      items: grenades
    }
  }
}
</script>
