<template>
  <v-card flat>
    <v-btn
      v-if="!viewOnly"
      fab
      x-small
      absolute
      top
      right
      color="primary"
      @click="editCompanion = true"
    >
      <v-icon>
        mdi-pencil
      </v-icon>
    </v-btn>
    <div>
      <v-row no-gutters class="pt-5">
        <v-col cols="8">
          <v-row no-gutters>
            <v-col v-for="(values, ability) in abilities" :key="`companion-ability-${ability}`" cols="6" sm="4" md="2">
              <v-card outlined flat class="mx-1 text-center">
                <div class="text-caption">
                  {{ $t(`abilities.${ability}.abbr`) }}
                </div>
                <div class="d-flex justify-center align-center">
                  <me-cs-roll-card :roll="rollAbility(values)">
                    <div class="text-h6">
                      {{ values.modText }}
                    </div>
                  </me-cs-roll-card>
                </div>
                <div>
                  {{ values.score }}
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4" class="px-2">
          <v-card outlined>
            <div class="text-caption" />
          </v-card>
          <v-row no-gutters>
            <v-col cols="4">
              <v-card flat color="transparent">
                <v-btn x-small outlined color="green">
                  Heal
                </v-btn>
                <v-text-field
                  dense
                  hide-details
                  type="number"
                  outlined
                  height="32px"
                />
                <v-btn x-small outlined color="red">
                  Damage
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <me-cs-companion-edit-dialog :companion="companion" :show="editCompanion" @close="editCompanion = false" @delete="deleteCompanion" />
  </v-card>
</template>

<script>
import { CsColors } from '~/mixins/character/csColors'
export default {
  name: 'MeCsCompanionStatBlock',
  mixins: [CsColors],
  props: {
    companion: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      editCompanion: false
    }
  },
  computed: {
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    abilities () {
      const abilities = {}
      for (const ability of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
        const score = this.companion[ability]
        const mod = score ? Math.floor((score - 10) / 2) : null
        abilities[ability] = {
          score,
          mod,
          modText: mod > 0 ? `+${mod}` : mod
        }
      }
      return abilities
    }
  },
  methods: {
    deleteCompanion () {
      this.$store.dispatch('character/companion/REMOVE_COMPANION', this.companion.uuid)
      this.editCompanion = false
    },
    rollAbility (ability) {
      return {}
    }
  }
}
</script>
