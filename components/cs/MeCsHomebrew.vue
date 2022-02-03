<template>
  <div>
    <v-row class="mt-8 mt-md-0">
      <v-col cols="12">
        <v-select
          label="Type"
          :items="types"
          :value="brew.type"
          dense
          hide-details
          @change="change('type', $event)"
        >
          <template #item="{ item }">
            <span class="text-capitalize">
              {{ item.replace('-', ' ') }}
            </span>
          </template>
          <template #selection="{ item }">
            <span class="text-capitalize">
              {{ item.replace('-', ' ') }}
            </span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="Name"
          :value="brew.name"
          dense
          hide-details
          @change="change('name', $event)"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Uses"
          :value="brew.uses"
          dense
          hide-details
          @change="change('uses', $event)"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          label="Recharge"
          :items="recharges"
          :value="brew.recharge"
          clearable
          dense
          hide-details
          @change="change('recharge', $event)"
        >
          <template #item="{ item }">
            <span class="text-capitalize">
              {{ item }} rest
            </span>
          </template>
          <template #selection="{ item }">
            <span class="text-capitalize">
              {{ item }} rest
            </span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12">
        <v-textarea
          auto-grow
          label="Description"
          :rows="3"
          :value="brew.description"
          dense
          hide-details
          @change="change('description', $event)"
        />
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn :disabled="viewOnly" @click="saveHomebrewItem">
          Save
        </v-btn>
      </v-col>
    </v-row>
    <v-list dense two-line>
      <template v-for="homebrew in brews">
        <v-list-item :key="homebrew.id">
          <v-list-item-avatar v-if="!viewOnly" @click="loadBrew(homebrew)">
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ homebrew.name }}</v-list-item-title>
            <v-list-item-subtitle class="text-capitalize">
              {{ homebrew.type.replace('-', ' ') }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action v-if="!viewOnly" @click="deleteHomebrewItem(homebrew.id)">
            <v-icon color="error">
              mdi-delete
            </v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  data () {
    return {
      types: ['trait', 'class-feature', 'feat', 'action', 'bonus-action', 'reaction'],
      recharges: ['short', 'long'],
      brew: {
        id: null,
        type: null,
        name: null,
        uses: 0,
        recharge: null,
        description: null
      }
    }
  },
  computed: {
    ...mapGetters(['character']),
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    brews () {
      return this.character.brews || []
    },
    emptyBrew () {
      return {
        id: null,
        type: null,
        name: null,
        uses: 0,
        recharge: null,
        description: null
      }
    }
  },
  methods: {
    change (attr, val) {
      let changeVal = val
      if (attr === 'uses') {
        changeVal = Number.parseInt(changeVal, 10)
        if (Number.isNaN(changeVal) || changeVal < 0) {
          changeVal = 0
        }
      }
      this.brew = { ...this.brew, [attr]: changeVal }
    },
    deleteHomebrewItem (id) {
      const brews = [...this.brews]
      const index = brews.findIndex(i => i.id === id)
      if (index > -1) {
        brews.splice(index, 1)
        this.$store.dispatch('character/UPDATE_CHARACTER', {
          cid: this.cid,
          attr: 'brews',
          value: brews
        })
      }
    },
    saveHomebrewItem () {
      if (!this.brew.type || !this.brew.name) {
        return
      }
      const id = this.brew.id ? this.brew.id : `${this.brew.name.toLowerCase().replaceAll(/\W\s/g, '')}-${new Date().getTime()}`
      const description = this.brew.description ? `<p>${this.brew.description.split('\n').join('</p><p>')}</p>` : ''
      const brews = [...this.brews]
      const index = brews.findIndex(i => i.id === id)
      const newBrew = { id, html: description, name: this.brew.name, type: this.brew.type, mechanics: { uses: this.brew.uses, recharge: this.brew.recharge } }
      if (index > -1) {
        brews.splice(index, 1, newBrew)
      } else {
        brews.push(newBrew)
      }
      this.$store.dispatch('character/UPDATE_CHARACTER', { cid: this.cid, attr: 'brews', value: brews })
      this.brew = this.emptyBrew
    },
    loadBrew (brew) {
      const description = brew.html.replaceAll('</p><p>', '\n').replace('<p>', '').replace('</p>', '')
      this.brew = { ...this.brew, name: brew.name, id: brew.id, type: brew.type, description, ...brew.mechanics }
    }
  }
}
</script>
