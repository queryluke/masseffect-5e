<template>
  <v-card height="100%" flat>
    <!-- consumables manager -->
    <v-list-item @click="expand('consumables')">
      <v-list-item-content>
        <v-list-item-title>
          Consumables
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon>
          mdi-chevron-{{ expanded === 'consumables' ? 'up' : 'down' }}
        </v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-expand-transition>
      <me-cs-equipment-consumables v-if="expanded === 'consumables'" />
    </v-expand-transition>
    <v-divider />
    <!-- adder -->
    <v-list-item @click="expand('adder')">
      <v-list-item-content>
        <v-list-item-title>
          Add Equipment
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon>
          mdi-chevron-{{ expanded === 'adder' ? 'up' : 'down' }}
        </v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-expand-transition>
      <me-cs-equipment-adder v-if="expanded === 'adder'" />
    </v-expand-transition>
    <v-divider />
    <v-list-item @click="showCredits">
      <v-list-item-content>
        <v-list-item-title>
          Buy/Sell
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon>
          mdi-chevron-right
        </v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-divider />
    <!-- equipment seller, geller, deleter -->
    <v-list-item @click="expand('remover')">
      <v-list-item-content>
        <v-list-item-title>
          Convert to Omni-Gel
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon>
          mdi-chevron-{{ expanded === 'remover' ? 'up' : 'down' }}
        </v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-expand-transition>
      <me-cs-equipment-remover v-if="expanded === 'remover'" />
    </v-expand-transition>
    <v-divider />
  </v-card>
</template>

<script>
export default {
  name: 'MeCsEquipmentManager',
  data () {
    return {
      expanded: null,
      adder: true,
      consumables: false,
      manager: false
    }
  },
  methods: {
    expand (value) {
      this.expanded = this.expanded === value ? null : value
    },
    showCredits () {
      this.$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-equipment-credits')
    }
  }
}
</script>
