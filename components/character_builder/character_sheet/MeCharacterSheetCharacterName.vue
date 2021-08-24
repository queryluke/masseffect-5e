<template>
  <div>
    <div v-html="getCharInfo()">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getCharInfo () {
      let output = ''
      const char = this.character
      const name = char.name || 'New Character'
      const species = char.species.name
      const classes = char.classes
      output += '<h3>' + name + '</h3>'
      if (species) {
        output += '<small class="p-0"><i>' + species + '</i></small>'
      }
      output += '<br>'
      let count = 0
      for (const c of classes) {
        output += (count++ > 0 ? ', ' : '') + c.name + ' '
        if (c.subclass) {
          output += '(' + c.subclass.name + ') '
        }
        output += c.levels
      }
      return output
    }
  },
  props: {
    character: {
      type: Object
    }
  }
}
</script>
