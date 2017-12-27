<template lang="pug">
  div
    p.headline Hit points
    ul.list-unstyled
      li #[strong Hit dice:] {{ item.hit_die }} per level
      li #[strong Hit Points at 1st level:] {{ item.hit_points }}
      li #[strong Hit Points at higher levels:] {{ item.increase_hit_points }}
      li #[strong Shield Points at 1st level:] {{ item.max_shields }}
      li #[strong Shield Points at higher levels:] {{ item.increase_max_shields }}
    div.hr
    p.headline Proficiencies
    ul.list-unstyled
      li #[strong Weapons:] {{ item.weapon }}
      li #[strong Saving Throws:] {{ item.saving_throw }}
      li #[strong Skills:] {{ item.skill }}
    div.hr
    p.headline Starting Weapons
    ul.list-unstyled
      li #[strong Omni-tool:] {{ item.omni_tool }} - {{ item.omni_tool_description }}
      li #[strong Ranged Weapon] {{ item.starting_weapon }}
</template>

<script>
  export default {
    name: 'ClassAttributes',
    props: ['item'],
  };
</script>

