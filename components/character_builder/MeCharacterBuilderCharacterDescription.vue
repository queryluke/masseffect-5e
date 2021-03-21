<template>
  <div>
    <h2 class="text-center">Describe Your Character</h2>
    <div class="d-flex mt-5">
        <div class="flex-grow-1">
            <v-text-field
              :value="name"
              outlined
              label="Name"
              v-model="name"
            />
            <v-text-field
              :value="image"
              outlined
              label="Image URL"
              v-model="image"
            />
        </div>
        <v-img
          v-if="image"
          :src="image"
          contain
          max-height="175"
          max-width="175"
          min-width="100"
          alt="Character Image" />
    </div>
    <v-select
      :value="characteristics.alignment"
      :items="alignmentOptions"
      label="Choose an Alignment"
      @change="newAlignment => handleChangeCharacteristic('alignment', newAlignment)"
    />
    <div class="d-flex align-center">
        <v-autocomplete
          :value="background.name"
          :items="backgrounds"
          item-text="name"
          label="Choose a background"
          @change="handleChangeBackground"
        />
    </div>
    <v-select
      v-if="background || background.name === 'Custom'"
      :value="background.feat.name"
      :items="feats"
      item-text="name"
      clearable
      label="Choose a feat"
      @change="handleChangeBackgroundFeat"
    />
    <!-- VueMarkdown(:source="featText").text-caption-->
    <v-select
      v-if="background.name ==='Custom'"
      :value="background.feature"
      :items="feats"
      item-text="name"
      clearable
      label="Choose a background feature"
      @change="handleChangeBackgroundFeature"
    />
    <h3 class="my-3">Characteristics</h3>
    <v-text-field
      class="mb-2"
      v-for="(characteristic, index) in characteristicsList"
      :key="index"
      :value="characteristics[characteristic]"
      outlined
      hide-details
      :label="characteristic"
      @change="newCharacteristic => handleChangeCharacteristic(characteristic, newCharacteristic)"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      alignmentOptions: [
        'Lawful Paragon',
        'Neutral Paragon',
        'Chaotic Paragon',
        'Lawful Balanced',
        'Balanced Neutral',
        'Chaotic Balanced',
        'Lawful Renegade',
        'Neutral Renegade',
        'Chaotic Renegade'
      ],
      characteristicsList: [
        'Personality Traits',
        'Ideal',
        'Bond',
        'Flaw',
        'Gender',
        'Place of Birth',
        'Age',
        'Height',
        'Weight',
        'Hair',
        'Eyes',
        'Skin',
        'Appearance',
        'Backstory'
      ]
    }
  },
  computed: {
    backgrounds () {
      const bgs = [...this.$store.getters.getData('backgrounds')]
      bgs.unshift('Custom')
      return bgs
    },
    feats () {
      return this.$store.getters.getData('feats')
    },
    background: {
      get () {
        return this.$store.getters['user/character'].background
      },
      set (value) {
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: 'background', value })
      }
    },
    characteristics: {
      get () {
        return this.$store.getters['user/character'].characteristics
      },
      set (value) {
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: 'characteristics', value })
      }
    },
    name: {
      get () {
        return this.$store.getters['user/character'].name
      },
      set (value) {
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: 'name', value })
      }
    },
    image: {
      get () {
        return this.$store.getters['user/character'].image
      },
      set (value) {
        return this.$store.commit('user/UPDATE_CHARACTER', { attr: 'image', value })
      }
    }
  },
  methods: {
    handleChangeName (name) {
      this.$emit('updateCharacter', { name })
    },
    handleChangeImage (image) {
      this.$emit('updateCharacter', { image })
    },
    handleChangeCharacteristic (characteristic, newCharacteristic) {
      const to = { ...this.characteristics }
      to[characteristic] = newCharacteristic
      this.characteristics = to
    },
    handleChangeBackground (newBackground) {
      this.background = { name: newBackground, feat: { name: '' }, feature: '' }
    },
    handleChangeBackgroundFeat (newFeat) {
      const to = { ...this.background }
      to.feat = { name: newFeat || '' }
      this.background = to
    },
    handleChangeBackgroundFeature (newFeature) {
      this.$emit('updateCharacter', { background: { feature: newFeature || '' } })
    }
  }
}
</script>
