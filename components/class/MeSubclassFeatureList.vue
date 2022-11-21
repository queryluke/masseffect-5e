<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        offset-sm="3"
        md="4"
        offset-md="8"
        lg="3"
        offset-lg="9"
      >
        <v-select
          v-model="filter"
          :items="subclassFilterOptions"
          item-text="name"
          item-value="id"
          label="Choose a subclass"
          shaped
        />
      </v-col>
    </v-row>
    <template v-for="(subclass, index) in filteredSubclasses">
      <me-class-feature :key="subclass.id" :hr="index < subclasses.length - 1" :klass-id="klassId">
        <template #title>
          <me-subclass-header :item="subclass" :flavor="flavor" />
        </template>
        <me-class-feature-list :subclass="subclass.id" :hr-size="1" :level="level" :klass-id="klassId" />
      </me-class-feature>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    klassId: {
      type: String,
      required: true
    },
    flavor: {
      type: Boolean,
      default: false
    },
    level: {
      type: [Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      filter: 'all'
    }
  },
  computed: {
    subclasses () {
      return this.$store.getters.getData('subclasses').filter(i => i.klass === this.klassId)
    },
    filteredSubclasses () {
      if (this.filter === 'all') {
        return this.subclasses
      }
      return this.subclasses.filter(i => i.id === this.filter)
    },
    subclassFilterOptions () {
      return [{ id: 'all', name: 'All' }, ...this.subclasses]
    }
  }
}
</script>
