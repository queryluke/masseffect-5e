<template lang="pug">
  p.text-xs-right
    small.
      text adapted from #[a(:href="link" target="_blank") #[em {{ title }}]], p. {{ pages }}
</template>

<script>
  export default {
    computed: {
      link () {
        return this.sources[this.source].link
      },
      title () {
        return this.sources[this.source].title
      }
    },
    data () {
      return {
        sources: {
          srd: {
            link: 'http://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf',
            title: 'Dungeons & Dragons System Reference Document 5.1'
          },
          basic: {
            link: 'http://media.wizards.com/2016/downloads/DND/PlayerBasicRulesV03.pdf',
            title: 'Dungeons & Dragons: Player\'s Basic Rules Version 0.3'
          }
        }
      }
    },
    props: {
      pages: String,
      source: {
        type: String,
        default: 'srd'
      }
    }
  }
</script>

