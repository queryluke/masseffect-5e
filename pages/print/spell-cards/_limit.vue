<template lang="pug">
  div
    spell-card(v-for="spell in spells" v-bind:spell="spell" v-bind:key="spell.id")
</template>

<script>
  import SpellCard from '~/components/misc/SpellCard.vue'
  import {mapGetters} from 'vuex'

  export default {
    created () {
      this.spells = this.getData('spells')
      if (this.$route.params.limit) {
        this.limit = this.$route.params.limit
        this.spells = this.spells.filter(spell => spell[this.limit])
      }
    },
    components: {
      SpellCard
    },
    computed: {
      ...mapGetters(['getData'])
    },
    data () {
      return {
        spells: [],
        limit: null
      }
    },
    head () {
      return {
        title: `Mass Effect 5e | Spell Cards${this.limit ? ` - ${this.limit}` : ''}`,
        meta: [
          { hid: 'description', name: 'description', content: 'Printable Spell Cards for Mass Effect 5e' }
        ]
      }
    },
    layout: 'print',
    name: 'PrintSpellCards'
  }
</script>

