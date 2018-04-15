def config_weapon_mods(model)
  model_level = model['level'].to_i
  model['availability'] = availability(model)
  no_float = model['name'] != 'Piercing Mod'
  if model_level > 1
    i = 1
    while i <= model_level
      new_mod = model.clone
      new_mod['feature'] = set_weapon_mod_text(i, model['feature'], no_float)
      new_mod['name'] += " #{roman_numeral(i)}"
      new_mod['id'] += "_#{i.to_s}"
      new_mod['cost'] = i * new_mod['cost'].to_i
      $collection << new_mod
      i += 1
    end
  else
    $collection << model
  end
end

def set_weapon_mod_text(level, text, no_float = true)
  find = %r{\[.*?lvl.*?\]}mi
  text.gsub(find) do |match|
    replace_mod_lvl(level, match, no_float)
  end
end

def replace_mod_lvl(level, match, no_float = true)
  remove_delim = match.gsub(%r{[\[|\]]}, '')
  parts_array = remove_delim.split(%r{([^a-z|^A-Z|^0-9|^\.])})
  text = parts_array.length > 3 ?
      parts_array[0].to_f.method(parts_array[1]).(level.method(parts_array[3]).(parts_array[4].to_f)) :
      level.method(parts_array[1]).(parts_array[2].to_f)
  no_float ? text.to_i : '%.2f' % text
end

def availability(model)
  availability = []
  ['assault_rifle','heavy_pistol', 'smg', 'shotgun', 'sniper_rifle'].each do |w|
    availability << w.split('_').map{ |w| w.capitalize }.join(' ') unless model[w.camelize(false)].nil?
  end
  availability.length == 5 ? 'All' : availability.join(', ')
end

def roman_numeral(level)
  case level
    when 1
      'I'
    when 2
      'II'
    when 3
      'III'
    when 4
      'IV'
    when 5
      'V'
    else
      ''
  end
end