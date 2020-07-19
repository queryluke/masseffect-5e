<template>
  <me-npc-feature :feature="feature">
    <template v-slot:description>
      <span class="font-italic">
        {{ attack.type | capitalize }} Weapon Attack:
      </span>
      <span>
        +{{ attack.attackMod }} to hit,
      </span>
      <span>
        {{ range }},
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
      if (this.attack.type === 'melee') {
        return `reach ${this.attack.range}m`
      }
      if (this.attack.type === 'ranged') {
        return `range ${this.attack.range}/${this.attack.range * 3}m`
      }
      return ''
    }
  }
}
</script>
