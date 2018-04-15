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