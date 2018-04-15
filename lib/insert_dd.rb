def insert_dd(string, die)
  if string && die
    string.gsub(/\[dd\]/,die.to_s)
  else
    string
  end
end