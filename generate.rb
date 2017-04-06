#!/usr/bin/env ruby

require 'json'
require 'yaml'
require 'csv'
require 'net/http'
Encoding.default_external = Encoding::UTF_8

output_type = "yaml"

drones = {
  "combat" => "The drone has X[dd] health. On your turn, it moves to an enemy of your choosing and makes a melee attack. On a success, the target takes 1[dd] shocking damage. Deals double damage to shields. The drone'ss attack can detonate targets.",
  "defense" => "",
  "support" => "The drone has 2X healing serums. On your turn, it moves to target creature of your choosing and injects any number of healing serums into their arm. The target is healed for Y[dd] damage, where Y is the number of serums used. Support Drone lasts 1 minute or until all serums are used.",
  "kamakaze" => "",
}

def inspect_feature(string, spell = false)
  if string
    string.gsub(/\[(.*?)\]/) do |s|
      replacement = s.gsub(/(\[|\])/,'')
      if replacement =~ /\|spell/
        replacement = replacement.gsub(/\|spell/,'')
        spell = true
      end
      target = spell ? "spell-modal" : replacement.gsub(" ","-").downcase
      spellTarget = spell ? 'data-spell="' + replacement + '"': ""
      '<button type="button" class="link" ' + spellTarget + ' data-toggle="modal" data-target="#' + target + '">' + replacement +'</button>'
    end
  end
end

def config_races(model)
  abilities = []
  model["abilities"].split("--").each do |a|
    separated = a.split(":")
    ability = {
      'title' => separated[0].strip,
      'text' => separated[1] ? separated[1].strip : ''
    }
    abilities << ability
  end
  model["abilities"] = abilities
  model
end

def insert_dd(string, die)
  if string
    string.gsub(/\[dd\]/,die.to_s)
  end
end

def insert_higher_level_text(string, die, tp, level)
  hlt = {
    "cantrip" => "The spell's damage increases by 1[dd] when you reach 5th level (2[dd]), 11th level (3[dd]), and 17th level (4[dd]).",
    "spell" => "When you cast this spell using a spell slot of [spellLevelp1] level or higher, the damage increases by 1[dd] for each slot level above [spellLevel]",
    "tech" => "You can spend up to [maxTP] TP.",
    "barrier" => "The spell potential tick use increases by 1 when you reach 5th level (4 ticks), 11th level (5 ticks), and 17th level (6 ticks).",
    "ac" => "When you cast this spell using a spell slot of [spellLevelp1] level or higher, the increase the AC loss by 1 for each slot level above [spellLevel]",
  }
  text = hlt[string]
  if text
    if die
      text = insert_dd(text, die)
    end
    if tp
      text = text.gsub(/\[maxTP\]/, tp)
    end
    if level
      plus1 = level.to_i + 1
      text = text.gsub(/\[spellLevelp1\]/, plus1.to_s).gsub(/\[spellLevel\]/, level)
    end
  else
    text = ''
  end
  text
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
  model["mechanic"] = insert_dd(model["mechanic"], model["die-type"])
  model["adv-option-1"] = insert_dd(model["adv-option-1"], model["die-type"])
  model["adv-option-2"] = insert_dd(model["adv-option-2"], model["die-type"])
  model["higher-levels"] = insert_higher_level_text(model["higher-levels"], model["die-type"], model["max-tp"], model["level"])
  model["class-list"] = create_class_list(model)
  model
end

def generate_model(headers)
  model = {}
  headers.each do |h|
    snake = h.gsub(" ","-").downcase 
    model[snake] = ""
  end
  model
end

def generate_config_file(page, output)
  uri = URI(page[:url])
  resp = Net::HTTP.get_response(uri)

  csv = CSV.parse(resp.body)

  model = generate_model(csv[0])
  csv.delete_at(0)
  collection = []

  csv.each do |line|
    interator = 0
    dup_model = model.dup
    dup_model.each_key do |key|
      dup_model[key] = line[interator]
      interator = interator + 1
    end

    case page[:type]
    when "races"
      race = dup_model["race"].gsub(" ","-").downcase
      directory = "races/#{race}"
      Dir.mkdir(directory) unless File.exists?(directory)
      File.open("#{directory}/index.html", "w") do |f|
        f.write("---\nlayout: race\ntitle: Races - #{dup_model["race"]}\nrace: #{dup_model["race"]}\n---")
      end
      dup_model = config_races(dup_model)
    when "classes"
      c = dup_model["class"].gsub(" ","-").downcase
      directory = "classes/#{c}"
      Dir.mkdir(directory) unless File.exists?(directory)
      File.open("#{directory}/index.html", "w") do |f|
        f.write("---\nlayout: class\ntitle: Classes - #{dup_model["class"]}\nclass: #{dup_model["class"]}\n---")
      end
    when "subclasses"
      dup_model["2"] = inspect_feature(dup_model["2"], true)
      dup_model["6"] = inspect_feature(dup_model["6"], true)
      dup_model["10"] = inspect_feature(dup_model["10"], true)
      dup_model["14"] = inspect_feature(dup_model["14"], true)
      dup_model["18"] = inspect_feature(dup_model["18"], true)
    when "spells"
      dup_model = config_spells(dup_model)
    else
      if dup_model.has_key?("features")
        dup_model["features"] = inspect_feature(dup_model["features"])
      end
    end

    collection << dup_model
  end


  puts "working on #{page[:type]}"
  File.open("_data/#{page[:type]}.json", "wb") {|f| f.write collection.to_json }

end

pages = [
  {
    :type => "races",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=0&single=true&output=csv"
  },
  {
    :type => "classes",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=781894233&single=true&output=csv"
  },
  {
    :type => "subclasses",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1874613976&single=true&output=csv"
  },
  {
    :type => "spells",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=686320782&single=true&output=csv",
  },
  {
    :type => "weapons",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1499213134&single=true&output=csv",
  },
  {
    :type => "heavy_weapons",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1966803402&single=true&output=csv",
  },
  {
    :type => "fighting_styles",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=2000756233&single=true&output=csv"
  },
  {
    :type => "adept",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1555546585&single=true&output=csv"
  },
  {
    :type => "engineer",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1365181965&single=true&output=csv"
  },
  {
    :type => "infiltrator",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=378282529&single=true&output=csv"
  },
  {
    :type => "soldier",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=1216928408&single=true&output=csv"
  },
  {
    :type => "vanguard",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=854116423&single=true&output=csv"
  },
  {
    :type => "misc",
    :url => "https://docs.google.com/spreadsheets/d/1RilxN9RRAuSwZoeuC5YN5xwBvZNk7BuhASQKof44bBo/pub?gid=867312306&single=true&output=csv"
  }
].each do |p|
  generate_config_file(p, output_type)
end