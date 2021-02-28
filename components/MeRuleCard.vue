<template>
  <div :id="item.id" class="mb-10">
    <h2 class="text-h4 my-3">
      {{ item.title }}
      <v-chip v-if="item.new" color="info" text-color="white" class="ml-3" small>
        new
      </v-chip>
      <v-chip v-if="item.change" color="warning" text-color="black" class="ml-3" small>
        change
      </v-chip>
    </h2>
    <v-progress-linear :value="100" color="primary" height="3" class="mb-3" />
    <div>
      <me-html :content="item.html" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'MeRuleCard',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
