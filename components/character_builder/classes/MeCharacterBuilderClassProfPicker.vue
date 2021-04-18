<template>
  <div>
    <h3>Proficencies</h3>
    <template v-for="(profObj, ind) in [weaponProfs, armorProfs, toolProfs]">
      <div :key="ind" v-if="profObj.has || profObj.choices">
        <h4>{{profObj.title}}</h4>
        <div class="d-flex align-baseline">
          <template v-for="(prof,indd) in profObj.has">
            <v-chip
              :key="indd"
              class="mr-3"
              v-if="profObj.types.find(item => item.type == prof)"
            >
              {{profObj.types.find(item => item.type == prof).name}}
            </v-chip>
          </template>
          <v-autocomplete
            v-if="profObj.choices"
            :items="profObj.types.filter(item => profObj.choices.items.includes(item.type))"
            item-text="name"
            item-value="type"
            :label="'Choose '+(profObj.choices.count)+' more...'"
            :counter="profObj.choices.count"
            chips
            multiple
          />
        </div>
      </div>
    </template>
    {{JSON.stringify(toolProfs, undefined, 4)}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      weaponTypes: [
        {
          type: 'melee',
          name: 'Melee Weapons'
        },
        {
          type: 'assault_rifle',
          name: 'Assault Rifles'
        },
        {
          type: 'shotgun',
          name: 'Shotguns'
        },
        {
          type: 'smg',
          name: 'SMGs'
        },
        {
          type: 'sniper_rifle',
          name: 'Sniper Rifles'
        },
        {
          type: 'heavy_pistol',
          name: 'Heavy Pistols'
        }
      ],
      armorTypes: [
        {
          type: 'light',
          name: 'Light Armor'
        },
        {
          type: 'medium',
          name: 'Medium Armor'
        },
        {
          type: 'heavy',
          name: 'Heavy Armor'
        }
      ]
    }
  },
  computed: {
    character () {
      const char = this.$store.getters['cb/characters'][this.$route.query.cid] || {}
      return char.character
    },
    classes () {
      return this.$store.getters.getData('classes')
    },
    startingClass () {
      return this.character.classes[0]
    },
    startingClassData () {
      return this.startingClass && this.classes.find(({ id }) => id === this.startingClass.id)
    },
    weaponProfs () {
      return {
        ...this.startingClassData.profs.weapon,
        title: 'Weapons',
        types: this.weaponTypes
      }
    },
    armorProfs () {
      return {
        ...this.startingClassData.profs.armor,
        title: 'Armor',
        types: this.armorTypes
      }
    },
    toolProfs () {
      return {
        ...this.startingClassData.profs.tool,
        title: 'Tools',
        types: this.$store.getters.getData('tool-profs')
      }
    },
    skillProfs () {
      return {
        ...this.startingClassData.profs.skill,
        title: 'Skills'
      }
    },
    profs () {
      const fromStartingClass = this.startingClassData && [
        this.startingClassData.weaponProfs.mandatory.map(name => ({
          name,
          type: 'weapon'
        })),
        this.startingClassData.armorProfs.mandatory.map(name => ({
          name,
          type: 'armor'
        }))
      ].flat()
      return fromStartingClass
      // return startingClassData
    }
  }
}
</script>
