<template>
  <v-list dense>
    <v-subheader>
      Equipment
    </v-subheader>
    <v-list-item v-for="eqItem of equipmentToggles" :key="eqItem.key">
      <v-list-item-action>
        <v-switch :input-value="options[eqItem.key] || false" :disabled="viewOnly" :false-value="false" :true-value="true" @change="change(eqItem.key, $event)" />
      </v-list-item-action>
      <v-list-item-title>
        {{ eqItem.label }}
      </v-list-item-title>
      <v-list-item-icon>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-icon
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              mdi-help-circle-outline
            </v-icon>
          </template>
          <span>{{ eqItem.note }}</span>
        </v-tooltip>
      </v-list-item-icon>
    </v-list-item>
  </v-list>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsCharacterPreferencesSideNav',
  data () {
    return {
      equipmentToggles: [
        { key: 'weaponSlots', label: 'Enforce Weapon Slots', note: 'You have 4 weapon slots. Two-handed weapons use two slots. Disable to equip more weapons.' },
        { key: 'grenadeSlots', label: 'Enforce Grenade Capacity', note: 'Leg armor provides grenade slots. Disable to equip more grenades or equip grenades without wearing leg armor.' },
        { key: 'medigelSlots', label: 'Enforce Medi-gel Slots', note: 'Chest and arm armor provide medi-gel slots. Disable to equip more medi-gel or equip medi-gel without wearing armor.' },
        { key: 'thermalClips', label: 'Enforce Thermal Clips', note: 'Chest and leg armor provide thermal clip slots. To reload weapons, you must have thermal clips equipped. Click the reload icon will consume a thermal clip. Disable to equip more thermal clips or ignore these settings.' },
        { key: 'programInstall', label: 'Omni-Tool Programs Limits', note: 'By default, you may only have 3 programs equipped. Disable to equip more.' }
      ]
    }
  },
  computed: {
    ...mapGetters({ character: 'character' }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    options () {
      return this.$store.getters['character/character'].options
    }
  },
  methods: {
    change (stat, value) {
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `options.${stat}`, value: value || false })
    }
  }
}
</script>