def configure_monster(model)
  keep = %w(name image cr size type unit alignment profBonus barrier speed dc ac xp id)
  to_array = %w(damageResistances damageImmunities conditionImmunities damageVulnerabilities featuresActionsReactions savingThrows senses skills)
  monster = {
      actions: [],
      reactions: [],
      legendaryActions: [],
      features: [],
      spellcasting: false,
      techcasting: false,
  }
  monster['abilityScores'] = {
      str: model['str'].to_i,
      dex: model['dex'].to_i,
      con: model['con'].to_i,
      int: model['int'].to_i,
      wis: model['wis'].to_i,
      cha: model['cha'].to_i
  }
  monster['hp'] = {
      die: model['hpDieType'],
      average: model['avgHp'],
      numDice: model['hpDieAmount'],
  }
  monster['hp']['mod'] = 0
  monster['hp']['mod'] = ((model['con'].to_i - 10) / 2).floor * model['hpDieAmount'].to_i if model['con'].to_i > 11
  monster['hp']['mod'] = ((model['con'].to_i - 10) / 2).ceil * model['hpDieAmount'].to_i if model['con'].to_i < 10
  monster['sp'] = {
      shields: model['shields'].to_i,
      regen: model['regen']
  } unless model['shields'].nil?
  unless model['spellcasting'].nil?
    wisMod = ((model['wis'].to_i - 10) / 2).floor
    if model['spellcasting'] == 'innate'
      spells = model['spells'].split(',').collect do |x|
        parts = x.split('-')
        {
            level: parts[0],
            spells: parts[1].split(';').collect{|x| x.strip}
        }
      end
    else
      spells = []
      spells = model['slots'].split(',').collect do |x|
        parts = x.split('-')
        {
            level: parts[0],
            slots: parts[1],
            spells: []
        }
      end if model['slots']
      spells.unshift({level: 'cantrip', spells: []})
    end

    monster[:spellcasting] = {
        level: model['spellcasting'],
        dc: 8 + model['profBonus'].to_i + wisMod,
        hit: model['profBonus'].to_i + wisMod,
        spellList: model['spells'].to_s.split(',').collect{ |x| x.strip },
        spells: spells
    }
  end

  unless model['techcasting'].nil?
    intMod = ((model['int'].to_i - 10) / 2).floor
    monster['techcasting'] = {
        perDay: model['techPerDay'],
        tpSpent: model['techMax'],
        dc: 8 + model['profBonus'].to_i + intMod,
        hit: model['profBonus'].to_i + intMod,
        spells: model.techPowers.split(',')
    }
  end
  monster[:actions] << {
      type: 'common',
      name: 'Multiattack',
      description: model['multiattack']
  } unless model['multiattack'].nil?
  monster['senses'] = model['senses'].to_s.split(',')
  monster['senses'].unshift("passive Perception #{model['pp']}")
  keep.each { |key| monster[key] = model[key]}
  to_array.each { |key| monster[key] = model[key].to_s.split(',').collect{ |x| x.strip }}
  monster
end