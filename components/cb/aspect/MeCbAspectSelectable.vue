<template>
  <div>
    <component
      :is="components[type].component"
      :mechanic="mechanic"
      :current-value="currentValue"
      @upsert="upsert"
    />
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  name: 'MeCbAspectSelectable',
  mixins: [CharacterBuilderHelpers],
  props: {
    mechanic: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      components: {
        prof: {
          component: 'MeCbChoicesProf'
        },
        asi: {
          component: 'MeCbChoicesAsi'
        }
      }
    }
  },
  computed: {
    type () {
      return this.mechanic.type.replace('-choice', '')
    },
    currentValue () {
      const selectObj = this.character.selected.find(i => i.path.startsWith(`${this.path}/${this.type}`))
      return selectObj?.value || []
    }
  },
  methods: {
    upsert (value) {
      console.log(value)
      const path = `${this.path}/${this.type}`
      const selectObj = {
        path,
        value
      }
      const newSelections = JSON.parse(JSON.stringify(this.character.selected))
      const index = newSelections.findIndex(i => i.path === path)
      if (index > -1) {
        newSelections.splice(index, 1, selectObj)
      } else {
        newSelections.push(selectObj)
      }
      this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'selected', value: newSelections })
      console.log(this.character.selected)
    }
  }
}
</script>
