<template>
  <v-card elevation="0" outlined>
    <v-card-title>
      <me-character-builder-ability-line-item>
        <template #title>
          {{ $t(`abilities.${ability}.title`) }}
        </template>
        {{ totalText }}
      </me-character-builder-ability-line-item>
    </v-card-title>
    <v-card-text>
      <me-character-builder-ability-line-item>
        <template #title>
          Modifier
        </template>
        {{ modText }}
      </me-character-builder-ability-line-item>
      <me-character-builder-ability-line-item>
        <template #title>
          Base Score
        </template>
        {{ getAbsBase(ability) || '--' }}
      </me-character-builder-ability-line-item>
      <me-character-builder-ability-line-item>
        <template #title>
          Species Bonus
        </template>
        +{{ absSpeciesBonus(ability) }}
      </me-character-builder-ability-line-item>
      <me-character-builder-ability-line-item>
        <template #title>
          Ability Improvements
        </template>
        +{{ absAbis(ability) }}
      </me-character-builder-ability-line-item>
      <!--
      <me-character-builder-ability-line-item>
        <template #title>
          Misc Bonus
        </template>
        +{{ absMisc(ability) }}
      </me-character-builder-ability-line-item>
      -->
      <v-divider class="my-3" />
      <me-character-builder-ability-line-item>
        <template #title>
          <div class="mt-3">
            Other Modifier
          </div>
        </template>
        <v-text-field
          v-model="otherValue"
          outlined
          clearable
          dense
          hide-details
        />
      </me-character-builder-ability-line-item>
      <me-character-builder-ability-line-item>
        <template #title>
          <div class="mt-3">
            Override Score
          </div>
        </template>
        <v-text-field v-model="overrideValue" outlined clearable dense hide-details />
      </me-character-builder-ability-line-item>
    </v-card-text>
  </v-card>
</template>

<script>
import { CharacterBuilderHelpers } from '~/mixins/character_builder'

export default {
  mixins: [CharacterBuilderHelpers],
  props: {
    ability: {
      type: String,
      required: true
    }
  },
  computed: {
    otherValue: {
      get () {
        return this.getAbsOther(this.ability)
      },
      set (value) {
        this.setAbsOther({ ability: this.ability, value })
      }
    },
    overrideValue: {
      get () {
        return this.getAbsOverride(this.ability)
      },
      set (value) {
        this.setAbsOverride({ ability: this.ability, value })
      }
    },
    modText () {
      if (!this.getAbsBase(this.ability) && !this.getAbsOverride(this.ability)) {
        return '--'
      }
      const mod = this.absMod(this.ability)
      return mod >= 0 ? `+${mod}` : `-${mod * -1}`
    },
    totalText () {
      if (!this.getAbsBase(this.ability) && !this.getAbsOverride(this.ability)) {
        return '--'
      }
      return this.absTotal(this.ability)
    }
  }
}
</script>
