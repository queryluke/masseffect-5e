<template>
  <div>
    <component
      :is="component"
      :id="id"
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
      subPaths: {
        prof: () => {
          return `${this.mechanic.profType}${this.mechanic.expertise ? '-expertise' : ''}`
        },
        power: () => {
          return this.mechanic.label
        }
      }
    }
  },
  computed: {
    component () {
      return `me-cb-choices-${this.type}`
    },
    currentValue () {
      // NOTE...currentValue is always an array since the selectable component always returns an array of selections
      // even if there is only 1 selection, its always an array
      const selectObj = this.character.selected.find(i => i.path === this.id)
      return selectObj?.value || []
    },
    id () {
      const subPathFunction = this.subPaths[this.type]
      const subPath = subPathFunction ? subPathFunction() : null
      return [this.path, this.type, subPath].filter(String).join('/')
    },
    type () {
      return this.mechanic.type.replace('-choice', '')
    }
  },
  methods: {
    upsert (value) {
      const selectObj = {
        path: this.id,
        value
      }
      const newSelections = JSON.parse(JSON.stringify(this.character.selected))
      const index = newSelections.findIndex(i => i.path === this.id)
      if (index > -1) {
        newSelections.splice(index, 1, selectObj)
      } else {
        newSelections.push(selectObj)
      }
      this.$store.dispatch('cb/UPDATE_CHARACTER', { cid: this.cid, attr: 'selected', value: newSelections })
    }
  }
}
</script>
