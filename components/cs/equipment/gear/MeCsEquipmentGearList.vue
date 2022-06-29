<template>
  <div>
    <div class="d-flex justify-space-between">
      <div>
        <me-tpg s="6">
          Gear
        </me-tpg>
      </div>

      <div class="d-flex align-center">
        <!-- Medi-Gel -->
        <v-menu v-if="medigel.length" offset-y :close-on-content-click="false">
          <template #activator="{ on, attrs }">
            <v-card outlined v-bind="attrs" class="pl-1" v-on="on">
              <span class="text-caption">
                Medi-gel: {{ currentMedigel }} of {{ maxMedigel }}
              </span>
              <v-icon size="16">
                mdi-menu-down
              </v-icon>
            </v-card>
          </template>
          <v-card>
            <v-list dense>
              <template v-for="gel of medigel">
                <v-subheader :key="`${gel.uuid}-header`" style="height: 25px">
                  {{ gel.data.name }}
                </v-subheader>
                <v-list-item :key="gel.uuid" :disabled="viewOnly" style="min-height: 30px" class="mb-2">
                  <v-list-item-action class="mr-2 my-0">
                    <v-btn x-small icon :disabled="gel.equippedAmount === 0" @click="updateEqAmount('decrement', gel.uuid)">
                      <v-icon>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content class="py-0">
                    <v-list-item-title style="min-width: 50px" class="text-center">
                      {{ gel.equippedAmount }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action class="ml-2 my-0">
                    <v-btn x-small icon :disabled="currentMedigel + 1 > maxMedigel || gel.equippedAmount === gel.uses" @click="updateEqAmount('increment', gel.uuid)">
                      <v-icon>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-menu>
        <v-divider v-if="grenades.length && medigel.length" vertical class="ml-2" />
        <!-- Grenades -->
        <v-menu v-if="grenades.length" offset-y :close-on-content-click="false">
          <template #activator="{ on, attrs }">
            <v-card outlined v-bind="attrs" class="pl-1" v-on="on">
              <span class="text-caption">
                Grenades: {{ currentGrenades }} of {{ maxGrenades }}
              </span>
              <v-icon size="16">
                mdi-menu-down
              </v-icon>
            </v-card>
          </template>
          <v-card>
            <v-list dense>
              <template v-for="grenade of grenades">
                <v-subheader :key="`${grenade.uuid}-header`" style="height: 25px">
                  {{ grenade.data.name }}
                </v-subheader>
                <v-list-item :key="grenade.uuid" :disabled="viewOnly" style="min-height: 30px" class="mb-2">
                  <v-list-item-action class="mr-2 my-0">
                    <v-btn x-small icon :disabled="grenade.equippedAmount === 0" @click="updateEqAmount('decrement', grenade.uuid)">
                      <v-icon>
                        mdi-minus
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-content class="py-0">
                    <v-list-item-title style="min-width: 50px" class="text-center">
                      {{ grenade.equippedAmount }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action class="ml-2 my-0">
                    <v-btn x-small icon :disabled="currentGrenades + 1 > maxGrenades || grenade.equippedAmount === grenade.uses" @click="updateEqAmount('increment', grenade.uuid)">
                      <v-icon>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-menu>
        <v-divider v-if="programs.length && (medigel.length || grenades.length)" vertical class="ml-2" />
        <!-- Omni-Tool Programs -->
        <div v-if="programs.length" class="text-caption ml-2">
          Omni-Tool Programs: {{ equippedPrograms.length }} of 3
        </div>
      </div>
    </div>
    <me-hr size="2" />
    <v-list dense two-line>
      <template v-for="item in items">
        <me-cs-equipment-list-item :key="item.uuid" :item="item" type="gear" :equip-disabled="item.data.type === 'omni_tool_program' && equippedPrograms.length === 3">
          <template v-if="!equippable.includes(item.data.type)" #action>
            <v-list-item-action class="mr-8">
              <v-chip color="grey darken-2" x-small style="width: 24px" class="px-0 d-flex justify-center">
                {{ item.uses }}
              </v-chip>
            </v-list-item-action>
          </template>
          <template #title>
            <me-cs-equipment-title :rarity="item.data.rarity">
              {{ item.data.name }}
            </me-cs-equipment-title>
          </template>
          <template #subtitle>
            <me-cs-equipment-subtitle :type="item.data.type" model="gear" />
          </template>
        </me-cs-equipment-list-item>
        <v-divider :key="`divider-${item.uuid}`" />
      </template>
    </v-list>
  </div>
</template>

<script>

export default {
  name: 'MeCsEquipmentArmorList',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      equippable: ['device', 'heavy_weapon', 'omni_tool_program', 'shield']
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    programs () {
      return this.items.filter(i => i.data.type === 'omni_tool_program')
    },
    equippedPrograms () {
      return this.programs.filter(i => i.equipped)
    },
    medigel () {
      // TEMP: notAddable filter to prevent people from interacting with the base model
      return this.items.filter(i => i.data.type === 'medi_gel' && !i.notAddable)
    },
    maxMedigel () {
      return 4
    },
    currentMedigel () {
      console.log(this.medigel)
      return this.medigel.filter(i => i.equipped).reduce((a, c) => a + (c.equippedAmount || 0), 0)
    },
    grenades () {
      return this.items.filter(i => i.data.type === 'grenade' && !i.notAddable)
    },
    maxGrenades () {
      return 2
    },
    currentGrenades () {
      return this.grenades.filter(i => i.equipped).reduce((a, c) => a + (c.equippedAmount || 0), 0)
    }
  },
  methods: {
    updateEqAmount (which, uuid) {
      const item = this.items.find(i => i.uuid === uuid)
      if (!item) {
        return
      }
      const equippedAmount = which === 'increment'
        ? Math.min(item.uses, (item.equippedAmount + 1))
        : Math.max(0, (item.equippedAmount - 1))
      const changeItem = { ...item, equippedAmount, equipped: equippedAmount > 0 }
      this.$store.dispatch('character/equipment/REPLACE_EQUIPMENT', { uuid: item.uuid, replacement: changeItem })
    }
  }
}
</script>
