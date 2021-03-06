<template>
  <span>
    <span>
      <me-distance v-if="numericRange" :length="item.distance.range" abbr />
      <span v-else>{{ item.distance.range }}</span>
    </span>
    <span v-if="item.distance.aoeDistance" class="ml-1 text-caption">
      (<me-distance :length="item.distance.aoeDistance" abbr />
      <v-avatar :size="size" tile class="ml-1">
        <v-img :src="require(`~/assets/images/aoe/${filename}.svg`)" :alt="item.distance.aoeType" />
      </v-avatar>)
    </span>
  </span>
</template>

<script>
export default {
  name: 'MePowerRange',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          distance: {
            range: '',
            aoeDistance: null
          }
        }
      }
    },
    size: {
      type: Number,
      default: 14
    }
  },
  computed: {
    filename () {
      return this.$vuetify.theme.dark ? `${this.item.distance.aoeType}-white` : this.item.distance.aoeType
    },
    numericRange () {
      return !isNaN(this.item.distance.range)
    }
  }
}
</script>
