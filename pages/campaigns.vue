<template>
  <v-container style="max-width: 1200px">
    <section>
      This is where you can view / join campaigns. Share dice rolls and other campaign stuff.
      <ul>
        <li>Shared Dice Roll Log</li>
        <li>Map with grid and tokens</li>
        <li>Campaign tracker info, like credits, NPCs, handouts, etc</li>
      </ul>
    </section>
    <section>
      <h2>My Campaigns</h2>
      <v-btn @click="createCampaign()">Create New Campaign</v-btn>
      <section>
        <v-card v-for="campaign in myCampaigns" :key="campaign.id">
          <v-card-text>
            <h3>{{ campaign.name }}</h3>
            <v-row>
              <v-col cols="4">
                <h4 v-if="campaign.characters">Characters in Campaign:</h4>
                <v-card>
                  <v-card-text>
                    <v-list>
                      <v-list-item v-for="character in campaign.characters" :key="character.id">
                        <v-list-item-avatar><v-img :src="character.image" aspect-ratio="1" max-width="120px"></v-img></v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>{{ character.name }}</v-list-item-title>
                          <v-list-item-subtitle>{{ character.name }}</v-list-item-subtitle>
                          <v-btn max-width="200px" x-small @click="addRemoveCharacter(character, campaign, true)">Remove from Campaign</v-btn>
                        </v-list-item-content>
                        <!--v-list-item-action><v-btn x-small @click="addRemoveCharacter(character, campaign, true)">Remove from Campaign</v-btn></v-list-item-action-->
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="8">
                <h4>Campaign Logs</h4>
                <me-cs-logs-list :data="campaign.logs || []"></me-cs-logs-list>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-list>
              <v-list-item-group title="My Characters">
                <v-list-item v-for="character in myCharacters" :key="character.id">
                  <v-list-item-content>
                    <v-card>
                      <v-card-text>
                        {{ character.name }}
                      </v-card-text>
                      <v-card-actions>
                        <v-btn @click="addRemoveCharacter(character, campaign)">Add Character to Campaign</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-actions>
        </v-card>
      </section>
    </section>
  </v-container>
</template>

<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('characters/FETCH_CHARACTERS')
    store.dispatch('SET_META', {
      title: 'Campaign Manager',
      description: 'Build your own ME5e Campaign'
    })
  },
  data () {
    return {
      campaigns: [{
        name: 'My Campaign',
        id: 'campaign1',
        players: [{
          name: 'Player 1',
          id: '123123'
        }],
        characters: [{
          name: 'Char 1',
          logs: [{
            id: 'foo',
            text: 'hello'
          },
          {
            id: 'bar',
            text: 'world'
          }]
        },
        {
          name: 'Char 2',
          logs: [{
            id: '123',
            text: 'yellow'
          },
          {
            id: 'abc',
            text: 'bard'
          }]
        }]
      }]
    }
  },
  computed: {
    username () {
      return this.$store.state.user.username
    },
    attributes () {
      const { attributes } = this.$store.state.auth.cognitoUser
      return attributes
    },
    owner () {
      return this.attributes.sub
    },
    myCampaigns () {
      return this.$store.getters['campaigns/campaigns']
    },
    myCharacters () {
      return this.$store.getters['characters/characters']
    }
  },
  methods: {
    addRemoveCharacter (character, campaign, remove) {
      debugger
      const c = JSON.parse(JSON.stringify(campaign))
      c.characters[character.id] = (remove ? undefined : character)
      if (!c.characters[character.id]) {
        delete c.characters[character.id]
      }
      this.$store.commit('campaigns/PUT_CAMPAIGN', c)
    },
    createCampaign () {
      debugger
      const campaign = {
        id: this.owner + '--' + new Date().getTime(),
        owner: {
          id: this.owner,
          username: this.username
        },
        characters: {},
        logs: [],
        name: this.username + '\'s Campaign'
      }
      console.log(campaign)
      this.$store.commit('campaigns/PUT_CAMPAIGN', campaign)
    }
  }

}
</script>
