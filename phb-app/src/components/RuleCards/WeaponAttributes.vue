<template lang="pug">
  rule-card
    span(slot="header") Special Weapon Attributes
    template(slot="text")
      table.table
        thead.text-xs-left
          tr
            th Attribute
            th Mechanic
        tbody
          tr(v-for="(attribute, index) in weaponAttributes")
            td {{ attribute.name }}
            td {{ attribute.description }}
</template>

<script>
  import RuleCard from './../RuleCard.vue'

  export default {
    name: 'WeaponAttributes',
    components: { RuleCard },
    data() {
      return {
        weaponAttributes: []
      };
    },
    created() {
      return this.$http
      .get('../data/weapon_attributes.json')
      .then(response => response.json())
      .then(response => {
        this.weaponAttributes = response;
      });
    }
  };
</script>
