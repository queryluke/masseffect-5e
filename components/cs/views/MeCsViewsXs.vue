<template>
  <v-container>
    <div v-if="mobileView === 'abilities'">
      <me-cs-card title="Abilities">
        <me-cs-abilities />
      </me-cs-card>
      <me-cs-card title="Saving Throws">
        <me-cs-saving-throws />
      </me-cs-card>
      <me-cs-card title="Senses">
        <me-cs-senses />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'skills'">
      <me-cs-card title="Skills">
        <me-cs-skills />
      </me-cs-card>
      <me-cs-card title="Proficiencies">
        <div class="px-4">
          <me-cs-proficiencies />
        </div>
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'notes'">
      <me-cs-card title="Notes">
        <me-cs-notes />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'details'">
      <me-cs-card title="Reputation">
        <me-cs-reputation />
      </me-cs-card>
      <me-cs-card title="Character Details">
        <me-cs-details />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'equipment'">
      <me-cs-card title="Equipment">
        <me-cs-equipment-header />
        <v-divider class="my-2" />
        <me-cs-equipment />
      </me-cs-card>
    </div>
    <div v-if="mobileView === 'actions'">
      <me-cs-card-sticky-header>
        <template #header>
          <me-cs-card-title>Actions</me-cs-card-title>
          <me-cs-card-nav-chips chip-set="actions" />
          <div class="mt-1">
            <me-cs-global-notes sub-type="action" />
          </div>
        </template>
        <v-card-text class="px-2">
          <me-cs-actions />
        </v-card-text>
      </me-cs-card-sticky-header>
    </div>
    <div v-if="mobileView === 'features'">
      <me-cs-card-sticky-header>
        <template #header>
          <me-cs-card-title>Features & Traits</me-cs-card-title>
          <me-cs-card-nav-chips chip-set="features" />
        </template>
        <v-card-text class="px-2">
          <me-cs-features />
        </v-card-text>
      </me-cs-card-sticky-header>
    </div>
    <div v-if="mobileView === 'powers'">
      <me-cs-card title="Powers">
        <div class="mt-1">
          <me-cs-powers-mods />
        </div>
        <v-row class="my-4">
          <v-col cols="8">
            <me-cs-powers-tech-points />
          </v-col>
          <v-col cols="4" class="text-right">
            <v-btn x-small outlined color="primary" @click="$store.dispatch('character/navigation/SHOW_SIDE_NAV', 'me-cs-powers-manager')">
              Manage
            </v-btn>
          </v-col>
        </v-row>
        <div class="my-2">
          <me-cs-powers-level-filter />
          <div class="mt-1">
            <me-cs-global-notes sub-type="power" />
          </div>
        </div>
        <template v-for="powerLevel in [0, 1, 2, 3, 4, 5, 6]">
          <me-cs-powers-by-level :key="`powerLevel-${powerLevel}`" :level="powerLevel" />
        </template>
      </me-cs-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'MeCsViewsXs',
  computed: {
    mobileView () {
      return this.$store.getters['character/navigation/mobileView']
    }
  }
}
</script>
