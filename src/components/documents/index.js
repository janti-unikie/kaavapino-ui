import React, { Component } from 'react'
import DocumentGroup from './DocumentGroup'

const data = [
  { title: 'Ehdotus', documents: [{ title: 'Tilastotiedot-liite', disabled: true }, { title: 'Kustannukset-liite', disabled: true }, { title: 'Vuorovaikutusraportti', disabled: true }, { title: 'Ehdotusvaiheen listateksti', disabled: true }, { title: 'Selostus' }] },
  { title: 'OAS', documents: [{ title: 'Lehti-ilmoitus (OAS)', disabled: true }, { title: 'OAS-saatekirje', disabled: true }, { title: 'Kirje hakijalle maksusta', disabled: true }, { title: 'OAS', disabled: false }] },
  { title: 'Tarkistettu ehdotus', documents: [{ title: 'Tehdyt muutokset -liite', disabled: true }, { title: 'Kirje kaupunginhallitukselle', disabled: true }, { title: 'Tarkistettu ehdotus –vaiheen listateksti', disabled: true }] }
]

class DocumentsPage extends Component {
  render() {
    return (
      <div className='documents-page-container'>
        { data.map(({ title, documents }, i) => <DocumentGroup title={title} documents={documents} key={i} />) }
      </div>
    )
  }
}

export default DocumentsPage