<template lang="jade">
  div.table__overflow
    table.table
      thead
        tr(v-if="spell_header" style="height: 24px;")
          th(:colspan="spell_header.blank_length" style="padding: 0;")
          th(:colspan="spell_header.spell_length" style="padding: 0;") Spell Slots
        tr
          th(v-for="header in headers" v-bind:key="header.display").text-xs-left {{ header.display }}
      tbody
        tr(v-for="row in rows" v-bind:key="row.level")
          td(v-for="data in row.row_data" v-bind:key="data.key")
            span(v-if="data.key === 'features'")
              span(v-for="(feature, index) of data.value" v-bind:key="data.value.key")
                a(@click.stop="showDialog(feature.key, feature.subclass_progression)" style="cursor: pointer;").
                  {{ feature.display }}
                span(v-if="data.value.length > index + 1") ,
            span(v-else) {{ data.value }}
</template>

<script>
  export default {
    name: 'ProgressionTable',
    props: ['rows','headers', 'spell_header'],
    methods: {
      showDialog(feature_id, level) {
        this.$emit('showDialog',feature_id, level);
      }
    }
  };
</script>

