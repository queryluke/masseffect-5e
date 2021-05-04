<template>
  <me-item-title
    :title="item.name"
    subtitle
  >
    <template #title>
      <span :class="textColor">
        {{ item.name }}
      </span>
    </template>
    <template #subtitle>
      <div class="font-italic">
        {{ $t(`sizes.${item.size}`) }} {{ $t(`npc.types.${item.type}`) }}, {{ $t(`alignments.${item.alignment}`) }}
      </div>
    </template>
  </me-item-title>
</template>

<script>
export default {
  name: 'MeNpcTitle',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          name: '',
          size: '',
          alignment: '',
          type: ''
        }
      }
    }
  },
  computed: {
    textColor () {
      return this.$vuetify.theme.dark ? 'red--text text--darken-2' : 'secondary--text'
    }
  }
}
</script>
