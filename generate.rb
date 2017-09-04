#!/usr/bin/env ruby

require 'json'
require 'csv'
require 'net/http'
require 'date'
Encoding.default_external = Encoding::UTF_8


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
  if string
    string.gsub(/\[dd\]/,die.to_s)
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
  model['id'] = model['name'].downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  model['mechanic'] = insert_dd(model['mechanic'], model['die-type']).split('--').map { |l| l.strip }
  model['attack-type'] = model['attack-type'] ? model['attack-type'].split(',') : []
  model['effect'] = model['effect'] ? model['effect'].split(',') : []
  model['damage-type'] = model['damage-type'] ? model['damage-type'].split(',') : []
  model['adv-options'] = []
  model['adv-options'] << insert_dd(model['adv-option-1'], model['die-type'])
  model['adv-options'] << insert_dd(model['adv-option-2'], model['die-type'])
  model['class-list'] = create_class_list(model)
  model
end

def generate_model(headers)
  model = {}
  headers.each do |h|
    snake = h.gsub(' ','-').downcase
    model[snake] = ''
  end
  model
end

def generate_config_file(page)
  uri = URI(page[:url])
  resp = Net::HTTP.get_response(uri)

  csv = CSV.parse(resp.body)

  model = generate_model(csv[0])
  csv.delete_at(0)
  collection = []

  csv.each do |line|
    unless line[0].nil?
      interator = 0
      dup_model = model.dup
      dup_model.each_key do |key|
        dup_model[key] = line[interator]
        interator = interator + 1
      end

      case page[:type]
      when 'spells'
        dup_model = config_spells(dup_model)
      else
        if dup_model.has_key?('features')
          dup_model['features'] = set_features(dup_model['features'])
        end
      end

      collection << dup_model
    end
  end

  date = DateTime.now

  data = {
    updated: date.strftime("%B %e, %Y @ %l:%M %p"),
    source: page[:url],
    "#{page[:type]}" => collection
  }


  puts "working on #{page[:type]}"
  File.open("src/data/#{page[:type]}.json", 'wb') {|f| f.write JSON.pretty_generate(data) }

end

pages = [
  {
    :type => 'spells',
    :url => 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSs9dkG94f5fPCOJ38g-xCUCwnYynzbiFdggQ1KqM1vMscINwcn2_OGPqGhvxOrYl18oK7dO2notL_y/pub?gid=0&single=true&output=csv'
  },
].each do |p|
  generate_config_file(p)
end
