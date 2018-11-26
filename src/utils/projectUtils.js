const formatDate = (value) => {
  const date = new Date(value)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`
}

export default {
  formatDate
}