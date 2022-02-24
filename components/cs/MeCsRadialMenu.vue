<template>
  <div class="me-cs-radial-menu" :style="'bottom:'+this.yPos+'px; left: '+this.xPos+'px;'">
    <radial-menu
      style="margin: auto; margin-top: 300px; background-color: white"
      :itemSize="50"
      :radius="120"
      :angle-restriction="180">
        <radial-menu-item
          v-for="(item, index) in items"
          :key="index"
          style="background-color: white; color: red;"
          @click="() => handleClick(item)">
          <span>{{item}}</span>
        </radial-menu-item>
      </radial-menu>
      <div style="margin-top: 16px; color: red;">{{ lastClicked }}</div>
  </div>
</template>

<script>
import { RadialMenu, RadialMenuItem } from 'vue-radial-menu'
export default {
  components: {
    RadialMenu,
    RadialMenuItem
  },
  data () {
    return {
      items: ['Roll Dice', 'Change Character', 'Homepage'],
      lastClicked: '',
      xPos: 400,
      yPos: 0
    }
  },
  methods: {
    handleClick (item) {
      this.lastClicked = item
    },
    moveToPress (event) {
      console.log(event)
      this.xPos = event.layerX
      this.yPos = event.layerY
    }
  },
  mounted () {
    // Define variable
    let pressTimer = null

    // Define funtion handlers
    // Create timeout ( run function after 1s )
    const start = (e) => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          // Run function
          handler(e)
        }, 1000)
      }
    }

    // Cancel Timeout
    const cancel = (e) => {
      // Check if timer has a value or not
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    // Run Function
    const handler = (e) => {
      this.moveToPress(e)
      cancel()
    }

    // Add Event listeners
    document.addEventListener('mousedown', start)
    document.addEventListener('touchstart', start)
    // Cancel timeouts if this events happen
    document.addEventListener('click', cancel)
    // el.addEventListener('mouseout', cancel)
    document.addEventListener('touchend', cancel)
    document.addEventListener('touchcancel', cancel)
  }
}
</script>

<style scoped>
.me-cs-radial-menu {
  position: fixed;
}
</style>
