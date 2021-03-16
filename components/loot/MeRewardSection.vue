<template>
  <div>
    <div class="text-subtitle-2">
      {{ title }}
    </div>
    <div>
      {{ rewardString }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeRewardSection',
  props: {
    title: {
      type: String,
      required: true
    },
    rewards: {
      type: Array,
      default: () => { return [] }
    }
  },
  computed: {
    rewardString () {
      return this.rewards.map(i => i.name).join(', ')
    }
  }
}
</script>
