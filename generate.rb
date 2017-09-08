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
  model['mechanic'] = generate_renderable(insert_dd(model['mechanic'], model['die_type']))
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
    snake = h.gsub(' ','_').downcase
    model[snake] = ''
  end
  model
end

def generate_config_file(page)
  uri = URI(page[:url])
  resp = Net::HTTP.get_response(uri)

  body = resp.body.force_encoding 'utf-8'

  csv = CSV.parse(body)

  model = generate_model(csv[0])
  csv.delete_at(0)
  collection = []

  csv.each do |line|
    unless line[0].nil?
      iterator = 0
      dup_model = model.dup
      dup_model.each_key do |key|
        dup_model[key] = line[iterator]
        iterator += 1
      end

      if page[:id] && dup_model.has_key?(page[:id])
        dup_model[:id] = dup_model[page[:id]].downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
      end

      case page[:type]
      when 'spells'
        dup_model = config_spells(dup_model)
      else
        page[:renderables].each do |renderable|
          if dup_model.has_key?(renderable)
            dup_model[renderable] = generate_renderable(dup_model[renderable])
          end
        end
      end
      collection << dup_model
    end
  end

  date = DateTime.now

  data = {
    updated: date.strftime("%B %e, %Y @ %l:%M %p"),
    source: page[:url].sub(%r(/pub\?.*),'/pubhtml'),
    data: collection
  }
  File.open("data/#{page[:type]}.json", 'wb') {|f| f.write JSON.pretty_generate(data) }

end

pages = [
  {
    type: 'spells',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSs9dkG94f5fPCOJ38g-xCUCwnYynzbiFdggQ1KqM1vMscINwcn2_OGPqGhvxOrYl18oK7dO2notL_y/pub?gid=0&single=true&output=csv',
    id: 'name'
  },
  {
    type: 'skills',
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFYAlUo84hir8VGSHwP4pKqnTcih_5UD0Uqtgi9w-QHEvrSxLthv1xXG0jb_tpbBRNZXE1Dv0nF0_q/pub?gid=0&single=true&output=csv',
    id: 'name',
    renderables: []
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
  }
].each do |p|
  if imports.length > 0
    if imports.include?(p[:type])
      generate_config_file(p)
    end
  else
    puts "working on #{p[:type]}"
    generate_config_file(p)
  end
end
