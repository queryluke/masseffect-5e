<template lang="jade">
  div
    div(v-for="element in elements" v-bind:key="element.id")
      p(v-if="element.type === 'line'") {{ element.text }}
</template>

<script>
  export default {
    name: 'MeElement',
    props: ['text'],
    data () {
      return {
        elements: [],
      }
    },
    created () {
      if(this.text){
        this.elements = [];
        let i = 1;
        let splits = this.text.split('--');
        for (let element of splits){
          this.elements.push({id: i, type: 'line', text: element});
          i++;
        }
      }
    }
  };
</script>

