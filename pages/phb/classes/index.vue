<template lang="pug">
  div
    h2.display-3 Classes
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
                p.ma-0 #[strong Hit Die:] {{ item.hit_die }}
                p.ma-0 #[strong Primary Ability:] {{ item.primary_ability }}
                p #[strong Saves:] {{ item.saving_throw.replace(/,\s/, ' & ') }}
    page-footer(:list="listName")
</template>

<script>
  import PageFooter from '~/components/phb/PageFooter.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {PageFooter},
    computed: {
      ...mapGetters(['getData'])
    },
    created () {
      this.items = this.getData('classes')
    },
    data () {
      return {
        items: [],
        listName: 'classes'
      }
    },
    head () {
      return {
        title: 'Mass Effect 5e | Classes',
        meta: [
          { hid: 'description', name: 'description', content: 'Available player character classes in Mass Effect 5e' }
        ]
      }
    },
    layout: 'phb'
  }
</script>
