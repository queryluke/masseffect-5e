<template>
  <v-card flat tile outlined>
    <v-card-text v-if="!loading">
      <component :is="toDisplay.moreInfo.component" v-if="toDisplay.moreInfo && toDisplay.moreInfo.component" :item="toDisplay.moreInfo.bind" />
      <me-html v-else-if="html" :content="html" />
      <v-row>
        <v-expansion-panels v-if="additional">
          <template v-for="(add, index) in additional">
            <v-expansion-panel v-if="add" :key="`addinfo-${index}`">
              <v-expansion-panel-header>
                {{ add.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <me-html :content="add.html" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </template>
        </v-expansion-panels>
      </v-row>
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
              name: i.name || item.name,
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
