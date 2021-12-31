<template>
  <v-container />
</template>

<script>
import { Auth } from 'aws-amplify'
export default {
  async beforeCreate () {
    await Auth.signOut()
  }
}
</script>
