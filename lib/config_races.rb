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