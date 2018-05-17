def config_commonplace_items(model)
  index = $collection.find_index { |i| i[:type] == model['type'] }
  if index.nil?
    $collection << { :type => model['type'], :items => [{ :name => model['name'], :cost => model['cost'] }] }
  else
    $collection[index][:items] << { :name => model['name'], :cost => model['cost'] }
  end
end