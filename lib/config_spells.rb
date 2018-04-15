def config_spells(model)
  model['mechanic'] = insert_dd(model['mechanic'], model['die_type'])
  model['attack_type'] = model['attack_type'] ? model['attack_type'].split(',') : []
  model['effect'] = model['effect'] ? model['effect'].split(',') : []
  model['effect'].each { |e| e.strip! }
  model['damage_type'] = model['damage_type'] ? model['damage_type'].split(',') : []
  model['adv_options'] = []
  model['adv_options'] << insert_dd(model['adv_option_1'], model['die_type'])
  model['adv_options'] << insert_dd(model['adv_option_2'], model['die_type'])
  model['class_list'] = create_class_list(model)
  model
end