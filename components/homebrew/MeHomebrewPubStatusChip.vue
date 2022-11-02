<template>
  <v-chip x-small :color="statusColors[pubStatus]" outlined>
    <span class="text-uppercase">
      {{ pubStatus }}
    </span>
  </v-chip>
</template>

<script>
export default {
  name: 'MeHomebrewPubStatusChip',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      statusColors: {
        private: 'error',
        development: 'info',
        published: 'success'
      }
    }
  },
  computed: {
    pubStatus () {
      return this.item.private ? 'private' : this.item.development ? 'development' : this.item.published ? 'published' : 'private'
    }
  }
}
</script>
