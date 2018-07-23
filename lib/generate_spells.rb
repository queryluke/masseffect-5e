#!/usr/bin/env ruby

require 'json'
require 'csv'
require 'net/http'
require 'date'
require 'yaml'
Encoding.default_external = Encoding::UTF_8

class String
  def is_i?
    !!(self =~ /\A[-+]?[0-9]+\z/)
  end
  def camelize(uppercase_first_letter = true)
    string = self
    if uppercase_first_letter
      string = string.sub(/^[a-z\d]*/) { $&.capitalize }
    else
      string = string.sub(/^(?:(?=\b|[A-Z_])|\w)/) { $&.downcase }
    end
    string.gsub(/(?:_|(\/))([a-z\d]*)/) { "#{$1}#{$2.capitalize}" }.gsub('/', '::')
  end
  def to_id()
    string = self
    string = string.gsub(/\s/, '_').downcase
    string.gsub(/[^\w-]/, '')
  end
end

spells = JSON.parse(File.read('data/spells.json'))

spells['data'].each do |spell|
  ac = []
  %w(adept engineer infiltrator sentinel soldier vanguard).each { |c| ac.push(c) if spell[c] }
  frontmatter = {
      id: spell['id'],
      name: spell['name'],
      level: spell['level'],
      type: spell['type'],
      attackType: spell['attack_type'],
      effect: spell['effect'],
      damageType: spell['damage_type'],
      castingTime: spell['casting_time'],
      duration: spell['duration'],
      concentration: spell['concentration'] ? true : false,
      distance: {
          'range' => spell['range'],
          'aoeType' => spell['aoe'],
          'aoeDistance' => spell['aoe_distance']
      },
      detonates: spell['detonates'],
      primes: spell['primes'],
      availableClasses: ac,
      advancementOptions: [
          {
              'name' => spell['adv_option_1'].split(':')[0].strip,
              'description' => spell['adv_option_1'].split(':')[1].strip
          },
          {
              'name' => spell['adv_option_2'].split(':')[0].strip,
              'description' => spell['adv_option_2'].split(':')[1].strip
          }
      ]
  }
  text = spell['mechanic'].map { |m| m['data'] }.join("\n")
  frontmatter = frontmatter.inject({}){|obj,(k,v)| obj[k.to_s] = v; obj}
  outfile = File.new(File.join('data','spells',"#{frontmatter['id']}.md"), 'w')
  outfile.write(frontmatter.to_yaml)
  outfile.write("---\n#{text}")
end

# csv.each do |row|
#   frontmatter = {
#       id: row[options[:id]].to_id
#   }
#   options[:frontmatter].each do |key|
#     k = key.camelize(false)
#     if row.has_key?(key)
#       frontmatter[k] = row[key]
#     end
#   end
#   frontmatter = frontmatter.inject({}){|obj,(k,v)| obj[k.to_s] = v; obj}
#   outfile = File.new(File.join('data',dir,"#{frontmatter['id']}.md"), 'w')
#   outfile.write(frontmatter.to_yaml(SortKeys: true))
#   outfile.write("---\n#{row[options[:body]]}")
# end
