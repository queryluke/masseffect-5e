<template>
  <me-item-title
    :title="item.name"
    subtitle
  >
    <template v-slot:title>
      <span :class="textColor">
        {{ item.name }}
      </span>
    </template>
    <template v-slot:subtitle>
      <div class="font-italic">
        {{ item.size }} {{ item.type.toLowerCase() }}, {{ item.alignment.toLowerCase() }}
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
