<template lang="pug">
  div
    h2.display-3 Thermal Clips
    p Starting capacity is 6 (Variant 10).
    div.mt-3
      v-data-table(v-bind:headers="headers" v-bind:items="items" hide-actions).elevation-1
        template(slot="items" slot-scope="props")
          td {{ props.item.name }}
          td
            me-text(:text="props.item.mechanic")
    page-footer(:list="listName")
</template>

<script>
  import MeText from '../components/MeText.vue';
  import PageFooter from '../components/PageFooter.vue';
  import {mapGetters} from 'vuex';

  export default {
    components: {MeText, PageFooter},
    computed: {
      ...mapGetters(['getData'])
    },
    created() {
      this.items = this.getData('thermalClips');
    },
    data() {
      return {
        items: [],
        headers: [
          { text: 'Name', value: 'name', align: 'left'},
          { text: 'Description', value: 'mechanic', sortable: false, align: 'left'}
        ]
      };
    },
    name: 'ThermalClips'
  };
</script>
