<template lang="jade">
  v-card.ma-1
    v-card-title {{ title }}
    v-card-text {{ text }}
</template>

<script>
  export default {
    name: 'AdvancedOption',
    props: ['option'],
    data () {
      return {
        title: '',
        text: ''
      }
    },
    created () {
      if(this.option){
        let splits = this.option.split(':', 2);
        this.title = splits[0];
        this.text = splits[1];
      }

    }
  };
</script>

