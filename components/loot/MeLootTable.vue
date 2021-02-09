<template>
  <div>
    <slot name="list" />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="header in tableHeaders" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cols in tableData" :key="cols[0]">
            <td v-for="col in cols" :key="col">
              {{ col }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'MeLootTable',
  props: {
    tableHeaders: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  }
}
</script>
