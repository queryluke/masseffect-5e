<template>
  <v-card hover class="search-result mt-5" @click="show()">
    <v-card-text>
      <div class="text-overline" :class="textColor">
        <span v-for="(q, i) in result.doc.qualifiers" :key="q">
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
        <span v-if="prependEllipses">...</span>
        <span v-if="noSnippets">
          {{ description }}
        </span>
        <span v-else>
          <template v-for="(array, index) in description">
            <template v-for="(v, i) in array">
              <span :key="`snippet${index}${i}`">
                <span v-text="v[0]" />
                <span :class="darkMode ? 'light-blue darken-4' : 'yellow accent-4'" v-text="v[1]" />
              </span>
            </template>
            <span v-if="index + 1 < array.length" :key="`joiningEllipses${index}`">...</span>
          </template>
        </span>
        <span v-if="appendEllipses">...</span>
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
      // const openMarkLength = 15 + this.darkMode ? 19 : 15
      // const endMarkLength = 7
      return this.snippets.map((s) => {
        const string = this.result.doc.body.substring(s.start, s.end)
        let inc = 0
        const array = []
        // let totalIncrease = 0
        for (const p of s.positions) {
          const subArray = []
          const hlStart = p[0] - s.start
          const hlEnd = hlStart + p[1]
          subArray.push(string.slice(inc, hlStart))
          subArray.push(string.slice(hlStart, hlEnd))
          array.push(subArray)
          inc = hlEnd
        }
        return array
      })
    },
    noSnippets () {
      return this.snippets.length === 0
    },
    prependEllipses () {
      return this.snippets[0] && this.snippets[0].start > 0
    },
    appendEllipses () {
      return (this.snippets.length === 0 && this.result.doc.body.length > 156) ||
        (this.snippets.length > 0 && this.snippets[this.snippets.length - 1].end < this.result.doc.body.length)
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
          path: this.localePath(this.result.doc.link)
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
