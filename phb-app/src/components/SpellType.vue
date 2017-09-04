<template lang="jade">
  span(v-if="spell.type === 'biotic'") {{ spell.type }}, {{ level }}
  span(v-else) {{ spell.type }}
</template>

<script>
  export default {
    name: 'SpellRangeArea',
    props: ['spell'],
    created () {
      if(this.spell.type === 'biotic'){
        switch(this.spell.level){
          case '0':
            this.level = 'cantrip';
            break;
          case '1':
            this.level = '1st-level';
            break;
          case '2':
            this.level = '2nd-level';
            break;
          case '3':
            this.level = `3rd-level`;
            break;
          default:
            this.level = `${this.spell.level}th-level`;
        }
      }
    },
    data () {
      return {
        level: ''
      }
    }
  };
</script>

