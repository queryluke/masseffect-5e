<template lang="pug">
  div
    h2.display-3 Consumables
    rule-card
      span(slot="header") Medi-gel
      template(slot="text")
        p.
          As an action, use a medi-gel pack to expend one of your hit die. This can be done during combat.
        p.headline Capacity: 4
        p.
          All armor comes standard with 4 medi-gel. Some armor and mods allow you to increase this ammount.
        p.headline Resupply: Common
        p.
          Medi-gel (medical gel) is an all-purpose medicinal salve combining an anaesthetic and clotting agent used by
          paramedics, EMTs, and military personnel, produced by the Sirta Foundation. As long as your in a relatively
          civilized environment, you can resupply all of your medi-gel for 1,000 credits.
    rule-card
      span(slot="header") Thermal Clips
      template(slot="text")
        p.
          Specialized Thermal Clips can augment your weapon's damage and damage type. Once loaded, the augmentation
          lasts until you reload the weapon. When reloading, you can always pop in another specialized clip.
        p.headline Capacity: 6
        p.
          All armor comes standard with 6 thermal clip slots. Some armor and mods allow you to increase this ammount.
        p.headline Resupply: Uncommon
        p.
          Nicer gun shops and military operations have a good stock of specialized thermal clips. Each specialized clip costs 500 credits.
          If you want to track standard thermal clips, see the Variant Thermal Clip Rules Below
        v-btn(to="/thermal-clips").mt-3 Thermal Clip List
    rule-card
      span(slot="header") Thermal Clips (variant)
      template(slot="text")
        p.
          For an additional challenge, you can have your player's keep track of all their thermal clips (specialized or not).
          For GMs, if you're using this rule, you can allow players to bring thermal clip backpacks if they're venturing out
          into the wilderness. But if you players are fighting NPCs that use thermal clips, they should be able to loot
          plenty of thermal clips after the battle.
        p.headline Capacity: 10
        p.
          All armor comes standard with 10 thermal clip slots. Some armor and mods allow you to increase this amount.
        p.headline Resupply: Common
        p.
          You can resupply all of you standard thermal clips at a gun shop or military depot for 500 credits. Specialized clips
          still cost 500 credits each.
    rule-card
      span(slot="header") Grenades
      template(slot="text")
        p.headline Capacity: 2
        p.
          All armor comes standard with 2 grenade slots. Some armor and mods allow you to increase this ammount.
        p.headline Resupply: Rare
        p.
          Grenades are a military resource, so, depending on your campaign setting they might be an uncommon or rare item.
          If your character is part of a military outfit, you can resupply every time you return to base (or to your ship).
          Otherwise, finding grenades may be a bit more difficult, requiring you to barter, steal, or loot them.
        v-btn(to="/grenades").mt-3 Grenade List
    rule-card
      span(slot="header") Heavy Weapon Charges
      template(slot="text")
        p.headline Capacity: (based on weapon)
        p.
          See the weapon list for the number of charges a heavy weapon has.
        p.headline Resupply: Very Rare
        p.
          If you've got your hands on a heavy weapon, you're either a military specialist or damn lucky you survived the
          battle. It's not easy resupplying your charges. You've either got to have some serious military or black market connections.
          If military, you might get special permission to keep the weapon and granted a steady stream of charges (once per long rest).
          That's between you and your GM.
        p.
          Otherwise, you'll have to pay a pretty penny on the black market (around 20,000 credits) to resupply your charges.
          In most cases, it's easier to scavenge or steal ammo. Or simply leave the damn thing were you found it.
        v-btn(to="/weapons").mt-3 Weapon List
</template>

<script>
  import RuleCard from './../components/RuleCard.vue'
  export default {
    name: 'Consumables',
    components: { RuleCard }
  };
</script>
