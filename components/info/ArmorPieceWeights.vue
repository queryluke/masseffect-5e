<template lang="pug">
  table.table
    thead
      tr
        th Placement / Type
        th Light
        th Medium
        th Heavy
    tbody
      tr
        td(data-table-key="Placement") Chest
        td(data-table-key="Light") 3
        td(data-table-key="Medium") 6
        td(data-table-key="Heavy") 10
      tr
        td(data-table-key="Placement") Arms
        td(data-table-key="Light") 1
        td(data-table-key="Medium") 2
        td(data-table-key="Heavy") 3
      tr
        td(data-table-key="Placement") Legs
        td(data-table-key="Light") 1
        td(data-table-key="Medium") 2
        td(data-table-key="Heavy") 3
      tr
        td(data-table-key="Placement") Head
        td(colspan=3) 2
</template>

<script>
export default {}
</script>
