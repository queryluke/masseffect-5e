<template lang="pug">
  div
    h2.display-3 Classes
    v-layout(row wrap)
      v-flex(v-for="item in items" v-bind:key="item.id").xs12.sm6.md4
        v-card(hover).ma-2
          v-container(fluid grid-list-lg @click="toSingle(item.id)")
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
    page-footer(:list="listName")
</template>

<script>
  import PageFooter from '../components/PageFooter.vue';
  import {mapGetters} from 'vuex';

  export default {
    components: {PageFooter},
    computed: {
      ...mapGetters(['getData'])
    },
    name: 'Classes',
    methods: {
      toSingle(id) {
        this.$router.push(`/classes/${id}`);
      }
    },
    data() {
      return {
        items: [],
        listName: 'classes'
      };
    },
    created() {
      this.items = this.getData('classes');
    },
  };
</script>
