<template>
  <me-npc-feature v-if="!loading" :feature="feature">
    <template v-slot:description>
      <me-html :content="html" inline />
    </template>
  </me-npc-feature>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    profBonus: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      loading: true,
      item: {
        name: '',
        feature: ''
      }
    }
  },
  computed: {
    feature () {
      return {
        name: this.item.name,
        recharge: `${this.profBonus}/day`,
        description: ''
      }
    },
    html () {
      return this.item.html.replace(/<p><strong>At higher(.*?)$/gim, '')
    }
  },
  async created () {
    this.item = await this.$store.dispatch('FETCH_ITEM', { endpoint: 'gear', id: this.id })
    this.loading = false
  }
}
</script>
