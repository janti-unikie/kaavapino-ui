const statusToColor = (status) => {
  switch (status) {
    case 1: return '#00963b'
    case 2: return '#ffc61e'
    case 3: return '#fd4f00'
    case 4: return '#2400c7'
    case 5: return 'black'
    default: return 'white'
  }
}

const statusToText = (status) => {
  switch (status) {
    case 1: return 'Käynnistys'
    case 2: return 'OAS'
    case 3: return 'Ehdotus'
    case 4: return 'Tarkistettu ehdotus'
    case 5: return 'Kanslia-Khs-Valtuusto'
    default: return 'Voimaantulo'
  }
}

const formatDate = (value) => {
  const date = new Date(value)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`
}

const projectSizeToText = (size) => {
  switch (size) {
    case 1: return 'XS'
    case 2: return 'S'
    case 3: return 'M'
    case 4: return 'L'
    default: return 'XL'
  }
}

export default {
  statusToColor,
  statusToText,
  formatDate,
  projectSizeToText
}