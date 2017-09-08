<template lang="jade">
  div
    div(v-for="element in text" v-bind:key="element.id")
      table(v-if="element.type === 'table'")
        thead
          tr
            th(v-for="head in element.data.headers") {{ head }}
        tbody
          tr(v-for="item in element.data.items")
            td(v-for="data in item") {{ data }}
      ul(v-else-if="element.type === 'list'")
        li(v-for="item in element.data") {{ item }}
      p(v-else) {{ element.data }}
</template>

<script>
  export default {
    name: 'MeElement',
    props: ['text'],
  };
</script>

