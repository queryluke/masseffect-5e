<template lang="pug">
  v-content.blue-grey.lighten-4
    v-container
      v-layout(justify-center)
        h2.text-xs-center.mt-5.display-3 Changelog
      v-layout(justify-center)
        v-flex(xs12 sm8 md6)
          v-select(:items="versions" v-model="version" label="Version" class="input-group--focused" light)
      v-layout
        v-flex(xs12)
          div.display-2.text-xs-center v{{ version }}
          div(v-html="changeFile").my-3
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getVersion', 'getVersions']),
      versions () {
        return this.getVersions.map(version => {
          return { text: `v${version}`, value: version }
        })
      },
      changeFile () {
        if (this.version) {
          return require(`~/data/changelog/${this.version}.md`)
        }
      }
    },
    created () {
      this.version = this.getVersion
    },
    data () {
      return {
        version: null
      }
    },
    head () {
      return {
        title: `Mass Effect 5e | Changelog`,
        meta: [
          { hid: 'description', name: 'description', content: 'Keep up-to-date with all the Mass Effect 5e system rule additions and updates.' }
        ]
      }
    },
    layout: 'default-light'
  }
</script>

<style>
  ul, ol {
    margin-left: 2em;
  }
  h3 {
    font-size: 1.5em;
    margin-top: 1em;
  },
  h4 {
    margin-top: .5em;
    font-size: 1.1em;
  }
  p {
    margin-bottom: 0;
  }
</style>