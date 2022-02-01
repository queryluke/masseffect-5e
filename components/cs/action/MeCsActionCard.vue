<template>
  <!-- TODO: add action type for spells, maybe show-action-type? -->
  <v-card outlined class="pa-1 px-md-3" @click="moreInfo = !moreInfo">
    <v-row align="start" no-gutters>
      <v-col cols="5" md="3">
        <div class="d-flex align-center">
          <v-avatar v-if="item.icon" size="16" class="mr-1">
            <v-img :src="item.icon" />
          </v-avatar>
          <v-card flat color="transparent">
            <div class="mb-n1 text-body-1">
              <small class="text-truncate">
                {{ item.name }}
              </small>
            </div>
            <me-cs-action-properties :properties="item.properties" />
          </v-card>
        </div>
      </v-col>
      <v-col v-if="showCastingTime" class="text-center" cols="1">
        {{ item.castingTime }}
      </v-col>
      <v-col cols="2" class="text-center">
        <me-cs-action-range v-if="item.range" :range="item.range" />
      </v-col>
      <v-col :cols="showCastingTime ? 1 : 2">
        <me-cs-action-hit v-if="item.attack" :hit="item.attack" />
        <me-cs-action-dc v-if="item.dc" :dc="item.dc" />
      </v-col>
      <v-col cols="3" md="2">
        <v-card flat color="transparent">
          <me-cs-action-damage v-for="(damage, index) in item.damage" :key="`damage-${index}`" :damage="damage" />
        </v-card>
      </v-col>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="3">
        <me-cs-action-notes :notes="item.notes" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <small>
          <me-html :content="item.shortDesc" classes="text-caption" />
        </small>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col v-if="item.resource">
        <me-cs-action-resource :id="item.resource.id" :resource="item.resource" />
      </v-col>
    </v-row>
    <me-standard-dialog :shown="moreInfo" :title="item.name" @close="moreInfo = false">
      <component :is="item.moreInfo.component" v-if="item.moreInfo.component" :item="item.moreInfo.bind" />
      <me-html v-else :content="itemHtml" />
    </me-standard-dialog>
  </v-card>
</template>

<script>

export default {
  name: 'MeCsActionCard',
  props: {
    item: {
      type: Object,
      required: true
    },
    showCastingTime: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      moreInfo: false
    }
  },
  computed: {
    mobile () {
      return this.$vuetify.breakpoint.smAndDown
    },
    itemHtml () {
      if (this.item.moreInfo?.model) {
        return this.$store.getters.getItem(this.item.moreInfo.model, this.item.moreInfo.id).html
      }
      return this.item.moreInfo.bind
    }
  }
}
</script>
