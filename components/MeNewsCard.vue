<template>
  <v-card :to="url" nuxt hover>
    <v-img :src="news.image" :height="height" />
    <div class="date-grid text-xs-center" :style="gridStyle">
      <span class="month date-part">{{ month }}</span>
      <span class="day date-part">{{ day }}</span>
      <span class="year date-part">{{ year }}</span>
    </div>
    <v-card-title class="headline">
      {{ news.title }}
    </v-card-title>
    <v-card-text>
      {{ news.description }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MeNewsCard',
  props: {
    news: {
      type: Object,
      default: () => { return {} }
    },
    height: {
      type: String,
      default: ''
    }
  },
  computed: {
    parsedDate () {
      return new Date(this.news.date)
    },
    month () {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      return months[this.parsedDate.getMonth()]
    },
    year () {
      return this.parsedDate.getFullYear()
    },
    day () {
      return this.parsedDate.getDate()
    },
    url () {
      return `changelog/${this.news.id}`
    },
    gridStyle () {
      return {
        'background-color': this.$vuetify.theme.themes.dark.accent
      }
    }
  }
}
</script>

<style scoped>
  /* news list */
  .date-grid {
    display: block;
    width: 4.2rem;
    position: absolute;
    top: 0;
    text-align: center;
  }
  .date-part{
    display: block;
    line-height: 1.5rem;
    font-size: .8rem;
  }
  .date-part.day {
    font-size: 2rem;
    font-weight: 700;
    margin: .2rem 0 .3rem 0;
  }
  .date-part.month {
    letter-spacing: 1px;
  }
</style>
