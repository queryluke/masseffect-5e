def generate_config_file(page)
  puts "working on #{page[:type]}"

  uri = URI(page[:url])
  resp = Net::HTTP.get_response(uri)

  body = resp.body.force_encoding 'utf-8'

  csv = CSV.parse(body)

  headers = csv[0]
  model = generate_model(csv[0], page[:camel])
  csv.delete_at(0)
  $collection = []
  date = DateTime.now
  data = {
      updated: date.strftime("%B %e, %Y @ %l:%M %p"),
      source: page[:url].sub(%r(/pub\?.*),'/pubhtml'),
      data: $collection
  }
  if page[:type] =~ %r{_progression}
    data[:headers] = headers.map do |h|
      if h.is_i?
        { display: ordinalize(h.to_i), spell_header: true }
      else
        { display: h, spell_header: false }
      end
    end
    subclass_increment = 1
  end

  csv.each do |line|
    unless line[0].nil?
      iterator = 0
      dup_model = model.dup
      dup_model.each_key do |key|
        dup_model[key] = line[iterator]
        iterator += 1
      end

      if page[:id] && dup_model.has_key?(page[:id])
        dup_model['id'] = dup_model[page[:id]].downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
      end

      if page[:type] =~ %r{_progression}
        dup_model['features'] = dup_model['features'].split(',').map do |l|
          key = l.downcase.strip.gsub(' ', '_').gsub(/[^a-zA-z\-]/, '')
          display = l.strip
          if key == 'subclass_feature'
            subclass_progression = subclass_increment
            subclass_increment = subclass_increment + 1
          end
          {
              key: key,
              display: display,
              subclass_progression: subclass_progression
          }

        end
        row_data = dup_model.map do |k,v|
          { key: k, value: v }
        end
        dup_model = { level: dup_model['level'], row_data: row_data }
      end
      case page[:type]
        when 'spells'
          dup_model = config_spells(dup_model)
        when 'grenades_mines'
          dup_model['desc'] = dup_model['desc'].gsub(/\[range\]/,dup_model['range'])
          dup_model['desc'] = dup_model['desc'].gsub(/\[blast\]/,dup_model['blast'])
          if dup_model['damage_amount'] && dup_model['dd'] && dup_model['damage_type']
            damage_string =  "#{dup_model['damage_amount']}#{dup_model['dd']} #{dup_model['damage_type']}"
            dup_model['desc'] = dup_model['desc'].gsub(/\[damage_string\]/,damage_string)
          end
        when 'subclasses'
          dup_model.each_key do |key|
            unless key == 'name' || key == 'description' || key == 'class' || key == 'id'
              if dup_model[key]
                dup_model[key] = dup_model[key].split(',')
              end
            end
          end
        when 'bestiary'
          next if dup_model['image'].nil?
          dup_model = configure_monster(dup_model)
        when 'weapon_mods'
          config_weapon_mods(dup_model)
          dup_model = nil
        when 'commonplace_items'
          config_commonplace_items(dup_model)
          dup_model = nil
        else
          dup_model = dup_model
      end

      page[:renderables].each do |renderable|
        if dup_model.has_key?(renderable)
          dup_model["#{renderable}_text_dump"] = dup_model[renderable].nil? ? '' : dup_model[renderable].gsub(/\W/,'')
          dup_model[renderable] = generate_renderable(dup_model[renderable])
        end
      end
      # puts dup_model.inspect

      $collection << dup_model unless dup_model.nil?
    end
  end

  data[:data] = $collection

  File.open("data/#{page[:type]}.json", 'wb') {|f| f.write JSON.pretty_generate(data) }

end