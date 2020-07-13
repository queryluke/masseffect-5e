<template>
  <span>
    <span>
      {{ item.distance.range }}
    </span>
    <span v-if="item.distance.aoeDistance" class="ml-1">
      ({{ item.distance.aoeDistance }}
      <v-avatar :size="size" tile class="ml-1">
        <v-img :src="`/images/aoe/${filename}.svg`" :alt="item.distance.aoeType" />
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
      default: 18
    }
  },
  computed: {
    filename () {
      return this.$vuetify.theme.dark ? `${this.item.distance.aoeType}-white` : this.item.distance.aoeType
    }
  }
}
</script>
