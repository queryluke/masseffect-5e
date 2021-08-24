<template>
  <div>
    <me-character-sheet-equipment-adder type="weapons" />
    <v-list dense two-line>
      <template v-for="item in csWeapons">
        <me-character-sheet-equipment-list-item :key="`weapon-${item.id}`" :item="item">
          <template #infoTab>
            <me-character-sheet-equipment-weapon-info :item="item" />
          </template>
          <template #modTab>
            <me-character-sheet-equipment-weapon-mods :item="item" />
          </template>
          <template #overrideTab>
            <me-character-sheet-equipment-weapon-override :item="item" />
          </template>
        </me-character-sheet-equipment-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers]
}
</script>
