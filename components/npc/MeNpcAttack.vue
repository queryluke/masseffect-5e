<template>
  <me-npc-feature :feature="feature">
    <template v-slot:description>
      <span class="font-italic font-weight-thin">
        {{ attack.type | capitalize }} Weapon Attack:
      </span>
      <span>
        +{{ attack.attackMod }} to hit,
      </span>
      <span>
        <span v-if="attack.type === 'melee'">
          reach <me-distance :length="range" abbr />,
        </span>
        <span v-if="attack.type === 'ranged'">
          range (<me-distance :length="range" num-only />/<me-distance :length="longRange" abbr />),
        </span>
      </span>
      <span>
        {{ attack.target }}.
      </span>
      <span class="font-italic">
        Hit:
      </span>
      <span>
        {{ attack.hit }}
      </span>
      <span v-if="attack.miss" class="font-italic">
        Miss:
      </span>
      <span v-if="attack.miss">
        {{ attack.miss }}
      </span>
    </template>
  </me-npc-feature>
</template>

<script>
export default {
  props: {
    attack: {
      type: Object,
      default: () => {
        return {
          name: '',
          type: 'ranged',
          attackMod: '1',
          range: 5,
          target: '',
          miss: false
        }
      }
    },
    recharge: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    feature () {
      return {
        name: this.attack.name,
        recharge: this.recharge,
        description: ''
      }
    },
    range () {
      return Number.parseInt(this.attack.range, 10)
    },
    longRange () {
      return this.range * 3
    }
  }
}
</script>
