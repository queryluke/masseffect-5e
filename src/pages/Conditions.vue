<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.xs12
        h2.display-3 Conditions
      v-flex.xs12
        p.headline New
        p Frozen, Lifted, Primed, Targeting, Unprotected
    div.mt-3
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td {{ props.item.mechanic }}
    page-footer(:list="listName")
</template>

<script>
  import PageFooter from '../components/PageFooter.vue';
  import {mapGetters} from 'vuex';

  export default {
    components: {PageFooter},
    computed: {
      ...mapGetters(['getData'])
    },
    name: 'Skills',
    data() {
      return {
        items: [],
        listName: 'conditions',
        new_skills: '',
        removed: '',
        source: '',
        updated: '',
        headers: [
          { text: 'Name', value: 'name', align: 'left'},
          { text: 'Description', value: 'description', sortable: false, align: 'left'}
        ]
      };
    },
    created() {
      this.items = this.getData('conditions');
    }
  };
</script>
