<template>
  <v-container>
    <me-page-title title="Feats" />
    <p>
      A feat represents a talent or an area of expertise that gives a character special capabilities. It embodies
      training, experience, and abilities beyond what a class provides. Mass Effect 5e uses a number of feats in the
      Player's Manual, providing page numbers for reference.
    </p>
    <p>
      At certain levels, your class gives you the Ability Score Improvement feature. Using the optional feats rule, you
      can forgo taking that feature to take a feat of your choice instead. You can take each feat only once, unless
      the feat’s description says otherwise.
    </p>
    <p>
      You must meet any prerequisite specified in a feat to take that feat. If you ever lose a feat’s prerequisite,
      you can’t use that feat until you regain the prerequisite.
    </p>
    <me-expansion-list
      :items="items"
      :headers="headers"
    >
      <template v-slot:header.indicator="{ item }">
        <v-avatar :class="[item.new ? 'deep-purple' : 'deep-orange']" size="30px" class="white--text text-caption my-n2">
          {{ item.new ? 'New' : 'PHB' }}
        </v-avatar>
      </template>
      <template v-slot:body="{ item }">
        <p v-if="item.prerequisite">
          <strong>Prerequisite:</strong>
          <em class="pl-1">
            {{ item.prerequisite }}
          </em>
        </p>
        <div class="text-body-2">
          <me-html :content="item.html" />
        </div>
      </template>
    </me-expansion-list>
  </v-container>
</template>

<script>
export default {
  async fetch () {
    this.items = await this.$store.dispatch('FETCH_DATA', 'feats')
    this.$store.commit('pageTitle', 'Feats')
  },
  data () {
    return {
      items: []
    }
  },
  computed: {
    headers () {
      return this.$store.getters['config/featHeaders']
    }
  },
  head () {
    return {
      title: 'Feats | Mass Effect 5e',
      meta: [
        { hid: 'description', name: 'description', content: 'New feats available! Plus a curated list of D&D 5th edition feats.' }
      ]
    }
  }
}
</script>
