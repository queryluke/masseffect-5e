<template lang="pug">
  div
    table.table
      thead
        tr
          th Slot / Type
          th Light
          th Medium
          th Heavy
          th Mod Slots #[em (max)]
          th Crafting Cost
      tbody
        tr
          td(data-table-key="Placement") Chest
          td(data-table-key="Light") 8,000
          td(data-table-key="Medium") 10,000
          td(data-table-key="Heavy") 12,000
          td(data-table-key="Mod Slots") 2 (3)
          td(data-table-key="Crafting") 24 hours & 10 omni-gel
        tr
          td(data-table-key="Placement") Arms
          td(data-table-key="Light") 2,000
          td(data-table-key="Medium") 3,000
          td(data-table-key="Heavy") 4,000
          td(data-table-key="Mod Slots") 0 (2)
          td(data-table-key="Crafting") 8 hours & 2 omni-gel
        tr
          td(data-table-key="Placement") Legs
          td(data-table-key="Light") 2,000
          td(data-table-key="Medium") 3,000
          td(data-table-key="Heavy") 4,000
          td(data-table-key="Mod Slots") 0 (2)
          td(data-table-key="Crafting") 8 hours & 2 omni-gel
        tr
          td(data-table-key="Placement") Head
          td(colspan=3) 5,000
          td(data-table-key="Mod Slots") 1 (3)
          td(data-table-key="Crafting") 16 hours & 5 omni-gel
    ul
      li #[strong Additional Mod Slots:] 20,000 credits or 8 hours and 10 omni-gel
</template>

<script>
export default {}
</script>
