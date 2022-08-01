<template>
  <div>
    <v-alert type="info" prominent>
      <v-row align="center">
        <v-col cols="12" sm="auto" class="grow" :class="{'text-caption': $vuetify.breakpoint.xsOnly}">
          Over the past year, we've made some great strides towards a fully-functioning, modern character sheet. Please click on
          the LEARN MORE button for more information about what is still being developed.
        </v-col>
        <v-col cols="12" sm="auto" class="shrink">
          <v-btn :small="$vuetify.breakpoint.xsOnly" @click="showPsa = true">
            Learn More
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-dialog v-model="showPsa" :fullscreen="$vuetify.breakpoint.xsOnly" max-width="700">
      <v-card>
        <v-toolbar flat color="info">
          <v-toolbar-title>
            Character Builder / Sheet P.S.A
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon @click="showPsa = false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-6">
          <v-card outlined>
            <v-card-title>Class Features, Racial Traits, and Feats</v-card-title>
            <v-card-text>
              <p>
                99% of class features, racial traits, and feats are covered in the character sheet. There are still a
                few "oddballs" left to sort out (like makeshift grenades and dual wielder). In addition, we are
                constantly making minor improvements to how class features interact with the sheet.
              </p>
            </v-card-text>
          </v-card>

          <v-card outlined>
            <v-card-title>Equipment</v-card-title>
            <v-card-text>
              <p>
                99% of weapons, mods, armor bonuses, and gear are covered. Like features, feats, and traits, there are
                a few remaining to figure out.
              </p>
            </v-card-text>
          </v-card>

          <v-card outlined>
            <v-card-title>Homebrew</v-card-title>
            <v-card-text>
              <p>
                The Custom option in the Settings menu <em>only supports a few data types</em>: Class Features, Traits, Feats, and Actions
                (including Bonus and Reactions). <strong>These are mostly text-based features with limited character sheet interaction.</strong> Thus,
                if you create a custom feat that gives you a new proficiency or adds to an ability score, you'll need to
                manually adjust/override those settings.
              </p>
              <p>
                Our next development task is to provide a fully-fledged homebrew system which allows players to make their
                own weapons, powers, subclasses, races, and more!
              </p>
            </v-card-text>
          </v-card>

          <v-card outlined>
            <v-card-title>Other odds and ends...</v-card-title>
            <v-card-text>
              <p>
                Beyond that, other things not yet developed are:
              </p>
              <ul>
                <li>Death Saves</li>
                <li>Inspiration</li>
                <li>Crit roll notifications & crit damage</li>
                <li>Advantage and Disadvantage on rolls</li>
                <li>XP & Milestone Tracking</li>
              </ul>
            </v-card-text>
          </v-card>

          <v-card outlined>
            <v-card-title>Importing v1.2 Characters</v-card-title>
            <v-card-text>
              <p>
                The underlying data models are too different and it would have taken a significant amount of hours to develop this feature.
                Unfortunately, there is no workaround for this except for recreating your old character in the new builder.
              </p>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPsa: false
    }
  }
}
</script>
