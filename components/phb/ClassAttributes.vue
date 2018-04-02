<template lang="pug">
  div
    p.headline Hit points
    ul.list-unstyled
      li #[strong Hit dice:] {{ item.hit_die }} per level
      li #[strong Hit Points at 1st level:] {{ item.hit_points }}
      li #[strong Hit Points at higher levels:] {{ item.increase_hit_points }}
    div.hr
    p.headline Proficiencies
    ul.list-unstyled
      li #[strong Armor:] {{ item.armor_proficiency }}
      li #[strong Weapons:] {{ item.weapon }}
      li #[strong Saving Throws:] {{ item.saving_throw }}
      li #[strong Skills:] {{ item.skill }}
    div.hr
    p.headline Starting Equipment
    me-element(:text="item.starting_equipment")
</template>

<script>
  import MeElement from '~/components/shared/MeElement.vue'

  export default {
    components: {MeElement},
    props: ['item']
  }
</script>

