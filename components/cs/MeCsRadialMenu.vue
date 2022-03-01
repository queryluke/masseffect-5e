<!--template :style="'display: ' + showMenu ? 'inherit' : 'inherit' ">
  <div class="me-cs-radial-menu-container">
    <radial-menu
      class="me-cs-radial-menu"
      :style="'top:'+this.yPos+'px; left: '+this.xPos+'px; z-index: 200;'"
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
      this.showMenu = true
      this.xPos = event.view.innerWidth / 2 - 30
      this.yPos = event.view.innerHeight / 2 - 30
    }
  },
  mounted () {
    window.addEventListener('keydown', (e) => {
      if (e.key === '\\') {
        this.moveToPress(e)
      }
    })
  }
}
</script>

<style scoped>
.me-cs-radial-menu {
  position: fixed;
}
</style-->
