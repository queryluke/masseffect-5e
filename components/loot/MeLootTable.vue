<template>
  <v-card flat>
    <v-card-title class="text-h6 pb-0">
      <slot name="tableTitle" />
    </v-card-title>
    <v-card-text>
      <slot name="tableInfo" />
      <v-simple-table dense>
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
    </v-card-text>
  </v-card>
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
