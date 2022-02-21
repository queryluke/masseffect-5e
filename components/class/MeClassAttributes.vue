<template>
  <div>
    <!--- Hit Points --->
    <me-class-feature :klass-id="item.id">
      <template #title>
        {{ $t('hit_points_title') }}
      </template>
      <me-class-hit-points :item="item" />
    </me-class-feature>

    <!--- Proficiencies --->
    <me-class-feature :klass-id="item.id">
      <template #title>
        {{ $t('proficiencies_title') }}
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
        {{ $t('starting_equipment_title') }}
      </template>
      <p class="text-body-2">
        {{ $t('starting_equipment_info') }}
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
    <me-class-feature-list :klass-id="item.id" />
  </div>
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
  },
  methods: {
    profLabel (prof) {
      switch (prof) {
        case 'weapon':
          return this.$tc('weapon_title', 2)
        case 'armor':
          return this.$tc('armor_title', 2)
        case 'tool':
          return this.$t('gear_types.tool')
        case 'skill':
          return this.$t('skills_title')
        case 'saving-throw':
          return this.$t('saving_throws_title')
      }
    }
  }
}
</script>
