<template>
  <div>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field v-model="short" label="Short Range" filled dense>
          <template #append>
            <span class="mt-3">
              {{ imperial ? 'ft' : 'm' }}
            </span>
          </template>
        </v-text-field>
      </v-col>
      <v-col v-if="!ignoreLong" cols="12" sm="6">
        <v-text-field v-model="long" label="Long Range" filled dense>
          <template #append>
            <span class="mt-3">
              {{ imperial ? 'ft' : 'm' }}
            </span>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MeHomebrewInputRange',
  props: {
    range: {
      type: Object,
      default: () => {
        return { short: 0, long: false, aoe: false }
      }
    },
    ignoreLong: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imperial () {
      return this.$store.getters['user/imperial']
    },
    short: {
      get () {
        const value = parseInt(this.range.short, 10) || 0
        return this.imperial ? value : ((value / 5) * 2)
      },
      set (value) {
        const parsed = parseInt(value)
        if (!parsed) {
          return
        }
        if (parsed < 0 || parsed > 10000) {
          return
        }
        const converted = this.imperial ? parsed : ((parsed / 2) * 5)
        if (converted < 5 && !this.imperial) {
          return
        }
        this.$emit('update', { ...this.range, short: converted })
      }
    },
    long: {
      get () {
        const value = parseInt(this.range.long, 10) || 0
        return this.imperial ? value : ((value / 5) * 2)
      },
      set (value) {
        const parsed = parseInt(value)
        if (!parsed) {
          return
        }
        if (parsed < 0 || parsed > 10000) {
          return
        }
        const converted = this.imperial ? parsed : ((parsed / 2) * 5)
        if (converted < 5 && !this.imperial) {
          return
        }
        this.$emit('update', { ...this.range, long: converted })
      }
    }
  }
}
</script>
