<template>
  <v-card flat tile outlined>
    <v-card-text v-if="!loading">
      <component :is="toDisplay.moreInfo.component" v-if="toDisplay.moreInfo && toDisplay.moreInfo.component" :item="toDisplay.moreInfo.bind" />
      <me-html v-else-if="html" :content="html" />
      <div v-if="additional">
        <template v-for="(add, index) in additional">
          <div v-if="add" :key="`addinfo-${index}`" class="mt-2">
            <div class="text-subtitle-1">
              {{ add.name }}
            </div>
            <me-html :content="add.html" />
          </div>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MeCsMoreInfo',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    toDisplay () {
      return this.$store.getters['character/navigation/toDisplay']
    },
    html () {
      if (this.toDisplay.moreInfo?.model) {
        return this.$store.getters.getItem(this.toDisplay.moreInfo.model, this.toDisplay.moreInfo.id).html
      }
      return this.toDisplay.moreInfo?.bind || this.toDisplay.html || false
    },
    additional () {
      if (this.toDisplay.moreInfo?.additional) {
        return this.toDisplay.moreInfo.additional.map((i) => {
          const item = this.$store.getters.getItem(i.model, i.id)
          if (item) {
            return {
              name: item.name,
              html: item.html
            }
          }
          return false
        })
      }
      return false
    }
  },
  watch: {
    toDisplay () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1)
    }
  }
}
</script>
