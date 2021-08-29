<template>
  <me-stat-list>
    <me-stat-list-item :label="$t('hit_dice_title')">
      {{ $t('hit_dice_per_level', {hitDice: $t('dice', { dieCount: 1, dieType: item.hitDie })}) }}
    </me-stat-list-item>
    <me-stat-list-item :label="$t('hit_points_at_first_title')">
      {{ $t('hit_points_at_first_text', {die: item.hitDie, mod: $t('abilities.con.title')}) }}
    </me-stat-list-item>
    <me-stat-list-item :label="$t('hit_points_at_higher_title')">
      {{
        $t(
          'hit_points_at_higher_text',
          {
            die: $t('dice', {dieCount: 1, dieType: item.hitDie}),
            min: minHitDieRoll,
            mod: $t('abilities.con.title')
          }
        )
      }}
    </me-stat-list-item>
  </me-stat-list>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    minHitDieRoll () {
      return Math.ceil((this.item.hitDie + 1) / 2)
    }
  }
}
</script>
