<template>
  <div>
    <me-character-sheet-equipment-adder type="gear" />
    <v-list dense two-line>
      <template v-for="item in csGear">
        <me-character-sheet-equipment-list-item :key="`gear-${item.id}`" :item="item" :tabs="[{ title: 'Details', slot: 'infoTab' }]" no-equip>
          <template #subtitle>
            Remaining Uses: {{ item.uses }}
          </template>
          <template #infoTab>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Uses"
                  :value="item.uses"
                  @change="changeStat(item, 'uses', $event)"
                />
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="Notes"
                  :value="item.notes"
                  hint="e.g. Grenade mark"
                  persistent-hint
                  @change="changeStat(item, 'notes', $event)"
                />
              </v-col>
            </v-row>
            <me-gear-info :item="itemData(item.id)" />
          </template>
        </me-character-sheet-equipment-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  methods: {
    changeStat (item, stat, value) {
      const changeItem = { ...item, [stat]: value }
      this.removeEquipment('gear', item.uuid, changeItem)
    },
    itemData (id) {
      return this.gear.find(i => i.id === id)
    }
  }
}
</script>
