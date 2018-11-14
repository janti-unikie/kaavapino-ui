const mockData = [
  { title: 'Ehdotus', sections: [{ title: 'Tilastotiedot-liite', disabled: true }, { title: 'Kustannukset-liite', disabled: true }, { title: 'Vuorovaikutusraportti', disabled: true }, { title: 'Ehdotusvaiheen listateksti', disabled: true }, { title: 'Selostus' }] },
  { title: 'OAS', sections: [{ title: 'Lehti-ilmoitus (OAS)', disabled: true }, { title: 'OAS-saatekirje', disabled: true }, { title: 'Kirje hakijalle maksusta', disabled: true }, { title: 'OAS', disabled: false }] },
  { title: 'Tarkistettu ehdotus', sections: [{ title: 'Tehdyt muutokset -liite', disabled: true }, { title: 'Kirje kaupunginhallitukselle', disabled: true }, { title: 'Tarkistettu ehdotus –vaiheen listateksti', disabled: true }] }
]

const fetchDocuments = () => {
  return mockData
}

export default {
  fetchDocuments
}