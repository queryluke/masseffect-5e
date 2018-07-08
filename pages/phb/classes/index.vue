<template lang="pug">
  v-container(fluid)
    h2.display-1.hidden-sm-and-down Classes
    v-layout(row wrap)
      v-flex(v-for="item in items" v-bind:key="item.id" d-flex).xs12.sm6.md4
        v-card(:to="{ name: 'phb-classes-id', params: { id: item.id }}" hover).ma-2
          v-container(fluid grid-list-lg)
            v-layout(row wrap)
              v-flex.xs8
                h3.headline.mb-0 {{ item.name }}
                p {{ item.snippet }}
              v-flex.xs4
                v-card-media(:src="`/images/classes/${item.id}.svg`" height="100px" contain)
              v-flex.xs12
                p.ma-0 #[strong Hit Die:] 1d{{ item.hitDie }}
                p.ma-0 #[strong Primary Ability:] {{ item.primaryAbility }}
                p #[strong Saves:] {{ savingThrows(item) }}
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['getData'])
    },
    created () {
      this.items = this.getData('classes')
    },
    data () {
      return {
        items: []
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Classes',
        meta: [
          { hid: 'description', name: 'description', content: 'Choose your favorite Mass Effect class, each with 3 subclasses to provide variety to the game.' }
        ]
      }
    },
    layout: 'phb',
    methods: {
      savingThrows (item) {
        return item.savingThrows.map(st => this.$options.filters.capitalize(st)).join(' & ')
      }
    }
  }
</script>
