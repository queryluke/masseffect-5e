require('date-format-lite')

function formatDate (dateString, format) {
  return dateString.date(format)
}

export default formatDate
