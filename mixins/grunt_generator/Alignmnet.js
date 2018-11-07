export const Alignment = {
  data () {
    return {
      trans: ['lawful', 'neutral', 'chaotic'],
      morality: ['good', 'neutral', 'evil']
    }
  },
  methods: {
    setGruntAlignment () {
      const morality = this.randomValue(this.morality)
      const trans = this.randomValue(this.trans)
      this.grunt.alignment = morality === 'neutral' && trans === 'neutral' ? 'unaligned' : `${trans} ${morality}`
    }
  }
}
