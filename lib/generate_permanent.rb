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

dir = 'class_features'
url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSGBdk0hRdRSA7UVMow0_VlmTnIyX7Tm14rOVcEI74EOGymh8lTFodPByXU8PeczJVZxL0omNWb6iIg/pub?gid=0&single=true&output=csv'

uri = URI(url)
resp = Net::HTTP.get_response(uri)

body = resp.body.force_encoding 'utf-8'

csv = CSV.parse(body, :headers => true)

csv.each do |row|
  frontmatter = {
      id: row[options[:id]].to_id
  }
  options[:frontmatter].each do |key|
    k = key.camelize(false)
    if row.has_key?(key)
      frontmatter[k] = row[key]
    end
  end
  frontmatter = frontmatter.inject({}){|obj,(k,v)| obj[k.to_s] = v; obj}
  outfile = File.new(File.join('data',dir,"#{frontmatter['id']}.md"), 'w')
  outfile.write(frontmatter.to_yaml(SortKeys: true))
  outfile.write("---\n#{row[options[:body]]}")
end
