def ordinalize(int)
  case(int)
    when 1
      return '1st'
    when 2
      return '2nd'
    when 3
      return '3rd'
    else
      return "#{int}th"
  end
end