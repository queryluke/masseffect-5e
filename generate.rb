#!/usr/bin/env ruby

require 'json'
require 'csv'
require 'net/http'
require 'date'
Encoding.default_external = Encoding::UTF_8

imports = ARGV

def set_features(string)
  features = []
  if string
    string.split(',').each do |f|

      feature = {
        'text' => f.strip,
        'add-text' => '',
        'level' => ''
      }

      f.match(/\(.*?\)/) do |m|
        code = m.to_s
        ability = f.sub(/#{Regexp.escape(code)}/,'')
        feature['text'] = ability.strip

        case code
          when '(adv)'
            feature['add-text'] = ', select an Advancement option';
          when '(ad)'
            feature['add-text'] = '. You can cast this spell using your AD';
          else
            feature['add-text'] = code.strip;
        end

      end

      features << feature

    end
  end
  features
end

def config_races(model)
  skills = []
  model['skills'].split('--').each do |a|
    separated = a.split(':')
    if separated[1] and separated[1].include? ">"
      listed  = separated[1].split('>').each { |a| a.strip! }
      text = listed.shift
      type = 'list'
      list = listed
    else
      text = separated[1] ? separated[1].strip! : ''
      type = 'paragraph'
      list = ''
    end
    skill = {
      'title' => separated[0].strip,
      'text' => text,
      'type' => type,
      'list' => list
    }
    skills << skill
  end
  model['features'] = skills
  model
end

def insert_dd(string, die)
  if string && die
    string.gsub(/\[dd\]/,die.to_s)
  else
    string
  end
end

def create_class_list(model)
  classes = ['adept','engineer','infiltrator','sentinel','soldier','vanguard'];
  output = []
  classes.each do |c|
    if model[c]
      if !model[c].empty?
        part = model[c] == 'x' ? c.capitalize : model[c].gsub(/(\[|\])/,'') + ' ' + c.capitalize + ' only'
        output << part
      end
    end
  end
  output.join(', ')
end

def config_spells(model)
  model['mechanic'] = insert_dd(model['mechanic'], model['die_type'])
  model['attack_type'] = model['attack_type'] ? model['attack_type'].split(',') : []
  model['effect'] = model['effect'] ? model['effect'].split(',') : []
  model['damage_type'] = model['damage_type'] ? model['damage_type'].split(',') : []
  model['adv_options'] = []
  model['adv_options'] << insert_dd(model['adv_option_1'], model['die_type'])
  model['adv_options'] << insert_dd(model['adv_option_2'], model['die_type'])
  model['class_list'] = create_class_list(model)
  model
end

def generate_renderable(text)
  id = 0
  list_regex = %r{{!list}(?<data>.*?){list}}m
  table_regex = %r{{!table}(?<data>.*?){table}}m

  if text.nil?
    return []
  end
  text.split('--').map do |e|
    if table_regex =~ e
      type = 'table'
      match = table_regex.match(e)[:data]
      data = {headers: [], items: []}
      row = 0
      match.split('>').map do |r|
        if row == 0
          data[:headers] = r.strip.split('|').map { |i| i.strip}
          row += 1
        else
          data[:items] << r.strip.split('|').map { |i| i.strip}
          row += 1
        end
      end
    elsif list_regex =~ e
      type = 'list'
      data = list_regex.match(e)[:data].split('*').map do |i|
        unless i.strip.empty?
          i.strip
        end
      end.compact
    else
      type = 'line'
      data = e.strip
    end
    id += 1
    {id: id, type: type, data: data}
  end
end

def generate_model(headers)
  model = {}
  headers.each do |h|
    snake = h.gsub(/\W/,'_').downcase
    model[snake] = ''
  end
  model
end

def ordinalize(int)
  case(int)
    when 1
      return '1st'
    when 2
      return '2nd'
    when 3
      return '3rd'
    else
      return "#{int}th"
  end
end

class String
  def is_i?
    !!(self =~ /\A[-+]?[0-9]+\z/)
  end
end

def generate_config_file(page)
  puts "working on #{page[:type]}"

  uri = URI(page[:url])
  resp = Net::HTTP.get_response(uri)

  body = resp.body.force_encoding 'utf-8'

  csv = CSV.parse(body)

  headers = csv[0]
  model = generate_model(csv[0])
  csv.delete_at(0)
  collection = []
  date = DateTime.now
  data = {
      updated: date.strftime("%B %e, %Y @ %l:%M %p"),
      source: page[:url].sub(%r(/pub\?.*),'/pubhtml'),
      data: collection
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
        dup_model[:id] = dup_model[page[:id]].downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
      end

      if page[:type] =~ %r{_progression}
        dup_model['features'] = dup_model['features'].split(',').map do |l|
          if l =~ %r{\(adv\)$}
            new_l = l.gsub(%r{\(adv\)$},'')
            key = new_l.downcase.strip.gsub(' ', '_').gsub(/[^a-zA-z\-]/, '')
            display = new_l.strip + ' (select advancement)'
          else
            key = l.downcase.strip.gsub(' ', '_').gsub(/[^a-zA-z\-]/, '')
            display = l.strip
          end
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
        subclass_progression =
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
            unless key == 'name' || key == 'description' || key == 'class'
              if dup_model[key]
                dup_model[key] = dup_model[key].split(',').map do |l|
                  { key: l.downcase.strip.gsub(' ', '_').gsub(/[^a-zA-z\-]/, ''), value: l }
                end
              end
            end
          end
        else
          dup_model = dup_model
      end

      page[:renderables].each do |renderable|
        if dup_model.has_key?(renderable)
          dup_model["#{renderable}_text_dump"] = dup_model[renderable].nil? ? '' : dup_model[renderable].gsub(/\W/,'')
          dup_model[renderable] = generate_renderable(dup_model[renderable])
        end
      end

      collection << dup_model
    end
  end

  data[:data] = collection

  File.open("data/#{page[:type]}.json", 'wb') {|f| f.write JSON.pretty_generate(data) }

end

[
  {
    type: 'spells',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSs9dkG94f5fPCOJ38g-xCUCwnYynzbiFdggQ1KqM1vMscINwcn2_OGPqGhvxOrYl18oK7dO2notL_y/pub?gid=0&single=true&output=csv',
    renderables: ['mechanic'],
    id: 'name'
  },
  {
    type: 'skills',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFYAlUo84hir8VGSHwP4pKqnTcih_5UD0Uqtgi9w-QHEvrSxLthv1xXG0jb_tpbBRNZXE1Dv0nF0_q/pub?gid=0&single=true&output=csv',
    renderables: [],
    id: 'name'
  },
  {
    type: 'feats',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTPhVRIodUwbDYFw8wJZtmb63tTjFJMxY-cN6P5nayPpJhNxAQFqIxeSLd5Tz75aOZ7CLuBkNsDrcs9/pub?gid=0&single=true&output=csv',
    id: 'name',
    renderables: ['description']
  },
  {
    type: 'class_features',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSGBdk0hRdRSA7UVMow0_VlmTnIyX7Tm14rOVcEI74EOGymh8lTFodPByXU8PeczJVZxL0omNWb6iIg/pub?gid=0&single=true&output=csv',
    renderables: %w(mechanic),
    id: 'name'
  },
  {
    type: 'races',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQI4F-wI2gwN395GApB347yPb1PixjOtOqZ0qoBYw7d57MPETHS40ZjIy1-DIfZf06PUwrspMiuAMlk/pub?gid=0&single=true&output=csv',
    renderables: ['skills'],
    id: 'name'
  },
  {
    type: 'racial_traits',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRETKGL62kEZPA69PhA3AGMiVeHOWBRkTMDL3f_K-oajryEjwdq7fRAj-qfIusPsLMiIqmB12D4Zun8/pub?gid=0&single=true&output=csv',
    renderables: ['description'],
    id: 'name'
  },
  {
    type: 'thermal_clips',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmZ3vjTr5MljolyW6N_pnqxBA6Gj8lEw4VihCRj0jROiCDJdWOg5udY0_XIXnbKM8XvamqGawcHKBX/pub?gid=0&single=true&output=csv',
    renderables: [],
    id: 'name'
  },
  {
    type: 'grenades_mines',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBAZH9BXc9xIj62i-StAKv08-iNSQSUyiWjz7TrVqcjEVe-uDaFIy9a4zRxYchDikCsskcNf-vexsG/pub?gid=0&single=true&output=csv',
    renderables: ['desc'],
    id: 'name'
  },
  {
    type: 'weapons',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSq70x_GZuDKcELgX8k_7Hd6nLGu3DoIEdDwP-YEGjUU-ghGc7ot_Q7140FZwGbEalHgzPwVm4BN8y_/pub?gid=0&single=true&output=csv',
    renderables: ['notes'],
    id: 'name'
  },
  {
    type: 'backgrounds',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQSUXve_hXfyu3glsSiuz-Ju2YUUToorjPPjpfSPiaHaA6yZTKLGMehtmvKtfQ3lSDErrGXgsQp1tFT/pub?gid=0&single=true&output=csv',
    renderables: %w(feature_description description),
    id: 'name'
  },
  {
    type: 'armor_mods',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRIPzbOBXOdWbaY779un1EV3HyacCV3fe15kHW4ABjMV0yHi3GZHVqnbiOVSQ_Dgh1whimOITGOXHkn/pub?output=csv',
    renderables: [],
    id: 'name'
  },
  {
    type: 'classes',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=0&single=true&output=csv',
    renderables: [],
    id: 'name'
  },
  {
    type: 'engineer_progression',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=859616161&single=true&output=csv',
    renderables: [],
  },
  {
    type: 'sentinel_progression',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=1389384549&single=true&output=csv',
    renderables: [],
  },
  {
    type: 'infiltrator_progression',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=782961022&single=true&output=csv',
    renderables: [],
  },
  {
    type: 'vanguard_progression',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=1618519913&single=true&output=csv',
    renderables: [],
  },
  {
    type: 'soldier_progression',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=2098633418&single=true&output=csv',
    renderables: [],
  },
  {
    type: 'adept_progression',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=1256776098&single=true&output=csv',
    renderables: [],
  },
  {
    type: 'subclasses',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=596741267&single=true&output=csv',
    renderables: [],
    id: 'name'
  }
].each do |p|
  if imports.length > 0
    if imports.include?(p[:type])
      generate_config_file(p)
    end
  else
    generate_config_file(p)
  end
end
