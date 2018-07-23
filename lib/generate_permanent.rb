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

options = {
    frontmatter: ['name'],
    id: 'name',
    body: 'mechanic'
}

dir = 'classes'
theClass = 'soldier'
url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=2098633418&single=true&output=csv'

uri = URI(url)
resp = Net::HTTP.get_response(uri)

body = resp.body.force_encoding 'utf-8'

csv = CSV.parse(body, :headers => true)

progression = []
csv.each do |row|
  level = {
      level: row['Level'].to_i,
      proficiencyBonus: row['Proficiency'].to_i,
      sneakAttack: row['Sneak Attack Damage'],
      features: row['Features'].split(',').map{|feature| feature.strip },
      cantrips: row['Cantrips'].to_s.is_i? ? row['Cantrips'].to_i : nil,
      spellSlots: {
          1 => row['1'] === '-' ? nil : row['1'],
          2 => row['2'] === '-' ? nil : row['2'],
          3 => row['3'] === '-' ? nil : row['3'],
          4 => row['4'] === '-' ? nil : row['4'],
          5 => row['5'] === '-' ? nil : row['5'],
      },
      barrierTicks: row['Barrier Ticks'].to_s.is_i? ? row['Barrier Ticks'].to_i : nil,
      techPoints: row['Tech Points'].to_s.is_i? ? row['Tech Points'].to_i : nil,
      maxTechPoints: row['Max TP'].to_s.is_i? ? row['Max TP'].to_i : nil,
      newBioticSpellCount: row['newBioticSpellCount'].to_s.is_i? ? row['newBioticSpellCount'].to_i : nil,
      newSpellLevelMax: row['spellLevel'].to_s.is_i? ? row['spellLevel'].to_i : nil,
      newTechSpellCount: row['newTechSpellCount'].to_s.is_i? ? row['newTechSpellCount'].to_i : nil,
  }
  level = level.inject({}){|obj,(k,v)| obj[k.to_s] = v; obj}
  progression << level
end

uri = URI('https://docs.google.com/spreadsheets/d/e/2PACX-1vR_ggYGhA2KS7Vyo30ImCIIkRK6omm7dD0tiyeR1ytpg2EUpiMRyIT1QniX6vujm3DnV3eRj5pW6-TX/pub?gid=596741267&single=true&output=csv')
resp = Net::HTTP.get_response(uri)
body = resp.body.force_encoding 'utf-8'
csv = CSV.parse(body, :headers => true)
subclasses = []
csv.each do |row|
  features = row.map do |(key,value)|
    value.split(',').map { |v| v.strip } if key.is_i? and !value.nil?
  end
  subclass = {
      name: row['Name'],
      description: row['Description'],
      features: features.compact
  }
  subclass = subclass.inject({}){|obj,(k,v)| obj[k.to_s] = v; obj}
  subclasses << subclass if row['class'].downcase == theClass
end

classfile = YAML.load_file(File.join('data','classes_in_yaml',"#{theClass}.yaml"))

classfile['progression'] = progression
classfile['subclasses'] = subclasses

File.open("data/#{dir}/#{theClass}.json", 'wb') {|f| f.write JSON.pretty_generate(classfile) }

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
