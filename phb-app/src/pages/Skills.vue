<template lang="jade">
  v-container
    v-layout(row wrap)
      v-flex.xs12
        h2 Skills
    div.mt-3
      v-expansion-panel(popout).mb-2
        v-expansion-panel-content(
          v-for="skill in skills"
          v-bind:skill="skill"
          v-bind:key="skill.name"
          hide-actions)
          div(slot="header")
            v-layout
              v-flex.xs2
                v-icon {{ skill.micon }}
              v-flex.xs10 {{ skill.name }}
              v-spacer
              v-flex.hidden-sm-and-down {{ skill.link }}
          v-card
            v-card-text.grey.lighten-3 {{ skill.description }}
    v-layout(row wrap justify-space-between).mt-4
      span Last Updated: {{ updated }}
      a(:href="source" target="_blank") Source
</template>

<script>
  import Vue from 'vue';
  import VueResource from 'vue-resource';
  Vue.use(VueResource);

  export default {
    name: 'Skills',
    data() {
      return {
        skills: [],
        source: '',
        updated: ''
      };
    },
    created() {
      return this.$http
        .get('../data/skills.json')
        .then(response => response.json())
        .then(response => {
          this.skills = response.skills;
          this.updated = response.updated;
          this.source = response.source;
        });
    }
  };
</script>
