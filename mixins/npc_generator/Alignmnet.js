export const Alignment = {
  data () {
    return {
      trans: ['l', 'n', 'c'],
      morality: ['g', 'n', 'e']
    }
  },
  methods: {
    setAlignment () {
      const morality = this.randomValue(this.morality)
      const trans = this.randomValue(this.trans)
      this.npc.alignment = `${trans}${morality}`
    }
  }
}
