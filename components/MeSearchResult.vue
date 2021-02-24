<template>
  <v-card hover class="search-result mt-5" @click="show()">
    <v-card-text>
      <div class="text-overline" :class="textColor">
        <span v-for="(q, i) in breadcrumbs" :key="q">
          <v-icon v-if="i !== 0" small class="mb-1">
            mdi-chevron-right
          </v-icon>
          {{ q }}
        </span>
      </div>
      <div class="text-subtitle-1">
        {{ result.doc.title }}
      </div>
      <div v-if="showFull">
        <me-html :content="result.doc.html" />
      </div>
      <div v-else>
        <div v-html="description" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showFull: false
    }
  },
  computed: {
    breadcrumbs () {
      const crumbs = [this.result.doc.type]
      if (this.result.doc.subType) {
        crumbs.push(this.result.doc.subType)
      }
      return crumbs.concat(this.result.doc.qualifiers)
    },
    searchFilters () {
      return this.$store.getters['config/searchFilters']
    },
    textColor () {
      return this.$store.getters['config/searchFilterTextColor'](this.result.doc.type)
    },
    darkMode () {
      return this.$store.getters['user/darkMode']
    },
    description () {
      if (this.snippets.length === 0) {
        return this.$options.filters.truncate(this.result.doc.body, 156)
      }
      const mark = `<span class="${this.darkMode ? 'light-blue darken-4' : 'yellow accent-4'}">`
      const endMark = '</span>'
      let text = this.snippets.map((s) => {
        let string = this.result.doc.body.substring(s.start, s.end)
        let totalIncrease = 0
        for (const p of s.positions) {
          const hlStart = p[0] - s.start + totalIncrease
          string = string.slice(0, hlStart) + mark + string.slice(hlStart)
          const hlEnd = hlStart + mark.length + p[1]
          string = string.slice(0, hlEnd) + endMark + string.slice(hlEnd)
          totalIncrease += mark.length + endMark.length
        }
        return string
      }).join('...')
      if (this.snippets[0] && this.snippets[0].start > 0) {
        text = '...' + text
      }
      return text
    },
    snippets () {
      const snippets = []
      Object.entries(this.result.matchData.metadata).forEach(([word, fields]) => {
        Object.entries(fields).forEach(([field, data]) => {
          if (field === 'body') {
            for (const position of data.position) {
              const resultStart = position[0]
              const resultLength = position[1]

              const start = resultStart - 30 <= 0 ? 0 : this.result.doc.body.indexOf(' ', (resultStart - 30))
              let end = this.result.doc.body.indexOf(' ', (resultStart + resultLength + 100))
              if (end < 0) {
                end = 1000000
              }

              // check for existing snippet
              let skip = false
              snippets.forEach((s, index) => {
                // If the start of the result is within an existing snippet
                if (resultStart >= s.start && resultStart <= s.end) {
                  // extend the length of the snippet only if the length of the result exceeds the snippets end
                  if ((resultStart + resultLength) > s.end) {
                    snippets[index].end = this.result.doc.body.indexOf(' ', (s.end + resultLength))
                  }
                  snippets[index].positions.push(position)
                  skip = true
                  return
                }
                // If the calculated start is within an existing snippet
                if (start >= s.start && start <= s.end) {
                  // extend the length of the snippet only to the resultStart
                  if (resultStart >= s.end) {
                    snippets[index].end = this.result.doc.body.indexOf(' ', (resultStart + resultLength))
                  }
                  snippets[index].positions.push(position)
                  skip = true
                  return
                }
                // If the calculated end if within an existing snippet
                if (end >= s.start && end <= s.end) {
                  // extend the start of teh snippet only to the resultStart
                  if (resultStart <= s.start) {
                    snippets[index].start = resultStart
                  }
                  snippets[index].positions.push(position)
                  skip = true
                }
              })
              if (!skip) {
                const snippet = { start, end, positions: [position] }
                snippets.push(snippet)
              }
            }
          }
        })
      })
      return snippets
    }
  },
  methods: {
    show () {
      if (this.result.doc.link) {
        this.$router.push({
          path: this.result.doc.link
        })
      } else {
        this.showFull = !this.showFull
      }
    }
  }
}
</script>

<style lang="scss">

  .search-result {

    p {
      margin-bottom: .5em;
    }
    a {
      text-decoration: none;
      &:hover, &:focus  {
        text-decoration: underline;
      }
    }

  }
</style>
