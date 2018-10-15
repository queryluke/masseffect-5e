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
  data = $collection

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

      case page[:type]
        when 'bestiary'
          next if dup_model['image'].nil?
          dup_model = configure_monster(dup_model)
        when 'weapon_mods'
          config_weapon_mods(dup_model)
          dup_model = nil
        when 'armor_mods'
          dup_model['id'] = "#{dup_model['id']}_#{dup_model['type'].downcase}"
        when 'commonplace_items'
          config_commonplace_items(dup_model)
          dup_model = nil
        else
          dup_model = dup_model
      end

      $collection << dup_model unless dup_model.nil?
    end
  end

  data = $collection

  File.open("../static/data/#{page[:type]}.json", 'wb') {|f| f.write JSON.pretty_generate(data) }

end