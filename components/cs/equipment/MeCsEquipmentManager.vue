<template>
  <v-card height="100%" flat>
    <!-- adder -->
    <v-list-item @click="adder = !adder; consumables = false; manager = false;">
      <v-list-item-content>
        <v-list-item-title>
          Add Equipment
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon>
          mdi-chevron-{{ adder ? 'up' : 'down' }}
        </v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-expand-transition>
      <me-cs-equipment-adder v-if="adder" />
    </v-expand-transition>
    <v-divider />
    <!-- consumables manager -->
    <v-list-item @click="consumables = !consumables; adder = false; manager = false;">
      <v-list-item-content>
        <v-list-item-title>
          Consumables
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon>
          mdi-chevron-{{ adder ? 'up' : 'down' }}
        </v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-expand-transition>
      <me-cs-equipment-consumables v-if="consumables" />
    </v-expand-transition>
    <v-divider />
    <!-- equipment seller, geller, deleter -->
    <v-list-item @click="manager = !manager; adder = false; consumables = false">
      <v-list-item-content>
        <v-list-item-title>
          Remove, Sell, Omni-gel
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon>
          mdi-chevron-{{ adder ? 'up' : 'down' }}
        </v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-expand-transition>
      <me-cs-equipment-remover v-if="manager" />
    </v-expand-transition>
    <v-divider />
  </v-card>
</template>

<script>
export default {
  name: 'MeCsEquipmentManager',
  data () {
    return {
      adder: true,
      consumables: false,
      manager: false
    }
  }
}
</script>
