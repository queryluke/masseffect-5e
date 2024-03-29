<template>
  <v-list dense>
    <v-subheader>
      Equipment
    </v-subheader>
    <v-list-item v-for="eqItem of equipmentToggles" :key="eqItem.key">
      <v-list-item-action>
        <v-switch :input-value="options[eqItem.key] || false" :disabled="viewOnly" :false-value="false" :true-value="true" @change="change(eqItem.key, $event)" />
      </v-list-item-action>
      <v-list-item-title>
        {{ eqItem.label }}
      </v-list-item-title>
      <v-list-item-icon>
        <v-tooltip bottom max-width="200">
          <template #activator="{ on, attrs }">
            <v-icon
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              mdi-help-circle-outline
            </v-icon>
          </template>
          <span>{{ eqItem.note }}</span>
        </v-tooltip>
      </v-list-item-icon>
    </v-list-item>
    <v-subheader>
      Ability Scores
    </v-subheader>
    <v-list-item>
      <v-list-item-action>
        <v-switch :input-value="options.abilityScoreOnTop === true" :disabled="viewOnly || loading" :false-value="false" :true-value="true" @change="change('abilityScoreOnTop', $event)" />
      </v-list-item-action>
      <v-list-item-title>
        Show Scores Above Modifiers
      </v-list-item-title>
    </v-list-item>
    <v-subheader>
      Webhooks
    </v-subheader>
    <v-list-item v-for="webhook of webhooks" :key="webhook.id">
      <v-list-item-action>
        <v-switch :input-value="characterInWebhook(webhook) !== -1" :disabled="viewOnly || loading" :false-value="false" :true-value="true" @change="toggleWebhook(webhook, $event)" />
      </v-list-item-action>
      <v-list-item-title>
        {{ webhook.name }}
      </v-list-item-title>
    </v-list-item>
    <v-list-item v-if="!webhooks || !webhooks.length">
      <v-list-item-title class="text-wrap">
        <i>Add Discord Webhooks under your <a href="/profile">user profile</a>. Once you do, you can activate them here to forward your rolls to the webhook. (You must be logged in to the website to use webhooks.)</i>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('character')
export default {
  name: 'MeCsCharacterPreferencesSideNav',
  data () {
    return {
      loading: false,
      equipmentToggles: [
        { key: 'weaponSlots', label: 'Enforce Weapon Slots', note: 'You have 4 weapon slots. Two-handed weapons use two slots. Disable to equip more weapons.' },
        { key: 'grenadeSlots', label: 'Enforce Grenade Capacity', note: 'Leg armor provides grenade slots. Disable to equip more grenades or equip grenades without wearing leg armor.' },
        { key: 'medigelSlots', label: 'Enforce Medi-gel Slots', note: 'Chest and arm armor provide medi-gel slots. Disable to equip more medi-gel or equip medi-gel without wearing armor.' },
        { key: 'thermalClips', label: 'Enforce Thermal Clips', note: 'Chest and leg armor provide thermal clip slots. To reload weapons, you must have thermal clips equipped. Clicking the reload icon will consume a thermal clip. Disable to ignore these settings.' },
        { key: 'programInstall', label: 'Omni-Tool Programs Limits', note: 'By default, you may only have 3 programs equipped. Disable to equip more.' },
        { key: 'armorSpeedPenalty', label: 'Enforce Armor STR Requirement', note: 'Wearing heavier armor requires a certain amount of STR or your speed is reduced. Disable this setting to ignore the speed penalty of wearing heavier armor.' },
        { key: 'armorProficiencyPenalty', label: 'Enforce Armor Proficiency', note: 'Wearing 2 pieces of armor with which you lack proficiency gives you disadvantage on rolls that use STR or DEX. Wearing 4 pieces of armor with which you lack proficiency prevents you from casting powers. Disable this setting to ignore the proficiency limitations.' }
      ]
    }
  },
  computed: {
    ...mapGetters({ character: 'character' }),
    viewOnly () {
      return this.$store.state.character.viewOnly
    },
    options () {
      return this.$store.getters['character/character'].options
    },
    id () {
      return this.$store.state.character.id
    },
    name () {
      return this.$store.getters['character/character'].name
    },
    webhooks () {
      return JSON.parse(this.$store.state.user.webhooks) || []
    }
  },
  methods: {
    change (stat, value) {
      this.$store.dispatch('character/UPDATE_CHARACTER', { attr: `options.${stat}`, value: value || false })
    },
    async toggleWebhook (webhook, value) {
      this.loading = true
      try {
        const mutatedWebhooks = [...this.webhooks]
        const ind = this.webhooks.findIndex(hook => webhook.id === hook.id)
        if (!mutatedWebhooks[ind] || !mutatedWebhooks[ind].characters) { return }
        const characterIndex = this.characterInWebhook(mutatedWebhooks[ind])

        if (mutatedWebhooks[ind] && characterIndex !== -1) {
          // remove character from character array in the webhook
          mutatedWebhooks[ind].characters.splice(mutatedWebhooks[ind].characters.splice(characterIndex, 1))
        } else {
          // add character
          mutatedWebhooks[ind].characters.push({
            name: this.name,
            id: this.id
          })
        }

        // save
        this.$store.commit('user/SET_USER_SETTINGS', { webhooks: JSON.stringify(mutatedWebhooks) })
        await this.$store.dispatch('user/UPDATE_PROFILE', true)
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    characterInWebhook (webhook) {
      if (webhook && webhook.characters && webhook.characters.length) {
        const index = webhook.characters.findIndex(char => char.id === this.id)
        return index !== -1 ? index : -1
      }
      return -1
    }
  }
}
</script>
