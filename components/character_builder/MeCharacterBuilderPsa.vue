<template>
  <div>
    <v-alert type="info" prominent>
      <v-row align="center">
        <v-col class="grow">
          The Character Builder and Sheet are still in BETA development. Please click on
          the LEARN MORE button to the right to review what features are working and what have not yet been developed.
        </v-col>
        <v-col class="shrink">
          <v-btn @click="showPsa = true">
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
          <p>
            Although we hope to eventually achieve the level of complexity and coverage of other online character sheets,
            we still have a long way to go. Thus, before sending any bug reports or feature requests, please review
            the following information.
          </p>
          <p>The following outlines features that are still in development and potential workarounds.</p>

          <v-card outlined>
            <v-card-title>Importing v1.2 Characters</v-card-title>
            <v-card-text>
              <p>
                The underlying data models are too different and it would have taken a significant amount of hours to develop this feature.
                Unfortunately, there is no workaround for this except for recreating your old character in the new builder.
              </p>
            </v-card-text>
          </v-card>

          <v-card outlined>
            <v-card-title>Bespoke Species Traits</v-card-title>
            <v-card-text>
              <p>
                Overall, selecting a species will apply any necessary modifiers to your character. But bespoke traits (Geth's Innate Shielding)
                and multipart traits (Hanar's Tentacles, which has an attack, bonus action, action and limitation) are not accounted for.
              </p>
              <p>
                <strong>Workaround:</strong> Overriding stats or creating custom features in the Custom tab of the
                Settings. For example, for a Hanar's Tentacle attack you can create a Custom Bonus Action for the grapple
                and a Custom Action for the Secret Toxin
              </p>
            </v-card-text>
          </v-card>

          <v-card outlined>
            <v-card-title>Class Features</v-card-title>
            <v-card-text>
              <p>
                Ability Score Improvements and Proficiencies are working. Beyond that, limited use feature will have a counter
                for keeping track of uses but nothing else. For example, it will not keep track of which metabiotics a Nemesis
                Vanguard has selected. The only exception is Fighting Style selection.
              </p>
              <p>
                <strong>Workaround:</strong> Using the Notes or creating custom features in the Custom tab of the Settings.
                For example, if you're a 20th-level adept you could make a custom class feature named "Signature Biotics: Lance"
                with 1 use on a short rest recharge, with a description "Cast at 2nd level".
              </p>
            </v-card-text>
          </v-card>

          <v-card outlined>
            <v-card-title>Feats</v-card-title>
            <v-card-text>
              <p>
                Feats are the least developed feature. The few that are limited use have couters. Otherwise, you
                will need to add any ability score improvements, proficiencies, and other features using the Settings.
              </p>
              <p><strong>Workaround:</strong> Adding ability score bonues and proficiences in the Settings tab. Creating custom features in the Custom tab of the Settings.</p>
            </v-card-text>
          </v-card>

          <v-card outlined>
            <v-card-title>Weapon Mods</v-card-title>
            <v-card-text>
              <p>
                Weapon attacks should be properly calculated. However, adding mods has no effect on the weapon's stats.
              </p>
              <p>
                <strong>Workaround:</strong> Click on the <v-icon>mdi-cog</v-icon> icon for the weapon, and use the
                Override Stats tab to add any additional stats from the mods.
              </p>
            </v-card-text>
          </v-card>

          <v-card outlined>
            <v-card-title>Armor & AC</v-card-title>
            <v-card-text>
              <p>
                Your AC is calculated based on the armor you have equipped! ... eeeeeexcept for mods and set bonuses and/or
                anything else that adds to your AC or defenses.
              </p>
              <p>
                <strong>Workaround:</strong> Use the Defensive tab in Settings to add a bonus or completely override your AC.
              </p>
            </v-card-text>
          </v-card>

          <v-card outlined>
            <v-card-title>Power Damage</v-card-title>
            <v-card-text>
              <p>
                Powers are almost complete, but the "quick cards" that show information about the power on your character
                sheet do not display damage (this is not yet in a machine-readable format).
              </p>
              <p>
                <strong>Workaround:</strong> Clicking on the power for its full description.
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
                <strong>Workaround:</strong> For weapons, see Weapon Mods above, you can completely override a weapons stats (including it's name)
                to create a homebrewed weapon. For Armor see above as well.
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
                <li>Hit Dice tracking</li>
                <li>Advantage/Disadvantage notifications on saves/checks</li>
                <li>Initiative</li>
                <li>Inspiration</li>
              </ul>
              <p>
                <strong>Workaround:</strong> Liberal use of the notes? ¯\_(ツ)_/¯
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
