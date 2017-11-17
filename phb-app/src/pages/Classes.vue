<template lang="pug">
  div
    h2 Classes
    v-layout(row wrap)
      v-flex(v-for="item in items" v-bind:key="item.id").xs12.sm6.md4
        v-card(hover @click="toSingle(item.id)").ma-2
          v-container(fluid grid-list-lg)
            v-layout(row wrap)
              v-flex.xs8
                h3.headline.mb-0 {{ item.name }}
                p {{ item.snippet }}
              v-flex.xs4
                v-card-media(:src="`../assets/images/classes/${item.id}.svg`" height="100px" contain)
              v-flex.xs12
                p.ma-0 #[strong Hit Die:] {{ item.hit_die }}
                p.ma-0 #[strong Primary Ability:] {{ item.primary_ability }}
                p #[strong Saves:] {{ item.saving_throw.replace(/,\s/, ' & ') }}
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  export default {
    name: 'Classes',
    methods: {
      toSingle(id) {
        this.$router.push(`/classes/${id}`);
      }
    },
    data() {
      return {
        items: [],
        source: '',
        updated: '',
      };
    },
    created() {
      return this.$http
        .get('../data/classes.json')
        .then(response => response.json())
        .then(response => {
          this.items = response.data;
          this.updated = response.updated;
          this.source = response.source;
        });
    },
  };
</script>
