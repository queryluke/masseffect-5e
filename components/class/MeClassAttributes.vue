<template>
  <div>
    <!--- Hit Points --->
    <me-class-feature :klass-id="item.id">
      <template #title>
        {{ $t('character.klass.hit_points.title') }}
      </template>
      <me-stat-list>
        <me-stat-list-item :label="$t('character.klass.hit_dice.title')">
          {{ $t('character.klass.hit_dice.per_level', {hitDice: $t('dice', { dieCount: 1, dieType: item.hitDie })}) }}
        </me-stat-list-item>
        <me-stat-list-item :label="$t('character.klass.hit_points.first.title')">
          {{ $t('character.klass.hit_points.first.text', {die: item.hitDie, mod: $t('abilities.con.title')}) }}
        </me-stat-list-item>
        <me-stat-list-item :label="$t('character.klass.hit_points.higher.title')">
          {{
            $t(
              'character.klass.hit_points.first.text',
              {
                die: item.hitDie,
                min: minHitDieRoll(item.hitDie),
                mod: $t('abilities.con.title')
              }
            )
          }}
        </me-stat-list-item>
      </me-stat-list>
    </me-class-feature>

    <!--- Proficiencies --->
    <me-class-feature :klass-id="item.id">
      <template #title>
        {{ $t('character.klass.profs.title') }}
      </template>
      <me-stat-list>
        <template v-for="(prof, key) in item.profs">
          <me-stat-list-item
            :key="key"
            :label="profLabel(key)"
          >
            {{ prof.text }}
          </me-stat-list-item>
        </template>
      </me-stat-list>
    </me-class-feature>

    <!-- Starting equipment -->
    <me-class-feature :klass-id="item.id">
      <template #title>
        {{ $t('character.klass.starting_equipment.title') }}
      </template>
      <p class="text-body-2">
        {{ $t('character.klass.starting_equipment.text') }}
      </p>
      <ul class="text-body-2">
        <li
          v-for="(eq, index) in item.startingEquipment"
          :key="`eq${index}`"
        >
          {{ eq.text }}
        </li>
      </ul>
    </me-class-feature>

    <!-- Features -->
    <me-class-feature-list :klass-id="item.id" :abis="item.progression.abi" />
  </div>
</template>

<script>
import { KlassMixins } from '~/mixins/klassMixins'

export default {
  mixins: [KlassMixins],
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
