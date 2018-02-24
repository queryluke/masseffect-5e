<template lang="pug">
  div
    div(v-for="element in text" v-bind:key="element.id")
      table(v-if="element.type === 'table'").table.alt-table
        thead
          tr.text-xs-left
            th(v-for="head in element.data.headers") {{ head }}
        tbody
          tr(v-for="item in element.data.items")
            td(v-for="data in item")
              me-text(:text="data")
      ul(v-else-if="element.type === 'list'").ml-3
        li(v-for="item in element.data")
          me-text(:text="item")
      p(v-else)
        me-text(:text="element.data")
</template>

<script>
  import MeText from './MeText.vue';

  export default {
    components: {MeText},
    name: 'MeElement',
    props: ['text'],
  };
</script>

