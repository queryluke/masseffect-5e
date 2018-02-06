<template lang="pug">
  v-dialog(v-model="active" width="70vw")
    v-card
      component(v-bind:is="globalDialog.component")
      v-card-actions
        v-spacer
        v-btn(@click.native="hideGlobalDialog" flat="flat") Close
</template>

<script>
import RuleCards from './RuleCards';
import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'GlobalDialog',
    computed: {
      ...mapGetters(['globalDialog']),
      active: {
        get () {
          return this.globalDialog.show;
        },
        set () {
          this.hideGlobalDialog();
        }
      }
    },
    methods: {
      ...mapActions(['hideGlobalDialog']),
    },
    components: RuleCards
  };
</script>

