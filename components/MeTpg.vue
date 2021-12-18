<script>
export default {
  name: 'MeTpg',
  props: {
    e: {
      type: String,
      default: 'div'
    },
    s: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      h1: 'text-h4 text-md-h2 font-weight-light',
      h2: 'text-h5 text-md-h3 font-weight-medium',
      h3: 'text-h6 text-md-h4 font-weight-bold',
      h4: 'text-h6 text-md-h4 font-weight-light',
      h5: 'text-subtitle-1 text-md-h6 font-weight-medium',
      h6: 'text-subtitle-2 text-md-h6 font-weight-black',
      title: 'text-subtitle-2 text-md-h6 font-weight-light',
      subtitle: 'text-overline text-md-button font-weight-medium',
      p: 'text-body-2'
    }
  },
  computed: {
    class () {
      return this[this.s || this.e]
    }
  },
  render (createElement) {
    return createElement(this.e, { class: this.class }, this.$slots.default)
  }
}
</script>
