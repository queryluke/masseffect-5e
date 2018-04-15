def generate_model(headers, camelCase = false)
  model = {}
  headers.each do |h|
    key = h.gsub(/\W/,'_').downcase
    if camelCase
      key = key.split('_').collect(&:capitalize).join unless key == 'unshackled_ai'
      key = key[0,1].downcase + key[1..-1]
    end
    model[key] = ''
  end
  model
end