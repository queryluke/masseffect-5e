<template lang="pug">
  v-dialog(v-model="active" width="70vw")
    component(v-bind:is="component")
</template>

<script>
import RuleCards from './RuleCards';

  export default {
    name: 'GlobalDialog',
    props: ['show', 'component'],
    computed: {
      active: {
        get () {
          return this.show;
        },
        set () {
          this.$emit('hide');
        }
      },
    },
    components: RuleCards
  };
</script>

