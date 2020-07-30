// const sections = [
//   {
//     title: 'Kerrosalan lisäys yhteensä',
//     fields: ['asuminen_yhteensa', 'toimitila_yhteensa', 'kerrosalan_lisays_yhteensa']
//   },
//   {
//     title: 'Julkiset',
//     fields: [
//       'julkiset_uusi_k_m2kunta',
//       'julkiset_uusi_k_m2valtio',
//       'julkiset_uusi_k_m2muut'
//     ]
//   }
// ]

// Asuminen
// asuminen_kerrostalo_uusi_k_m2kunta
// asuminen_kerrostalo_uusi_k_m2valtio
// asuminen_kerrostalo_uusi_k_m2muut
// asuminen_pientalo_uusi_k_m2kunta
// asuminen_pientalo_uusi_k_m2valtio
// asuminen_pientalo_uusi_k_m2muut

// Muut

// muut_uusi_k_m2kunta
// muut_uusi_k_m2valtio
// muut_uusi_k_m2muut
// lisatietoa_kerrosaloista

// Toimitilat

// toimisto_uusi_k_m2kunta
// toimisto_uusi_k_m2valtio
// toimisto_uusi_k_m2muut
// liiketila_uusi_k_m2kunta
// liiketila_uusi_k_m2valtio
// liiketila_uusi_k_m2muut
// teollisuus_uusi_k_m2kunta
// teollisuus_uusi_k_m2valtio
// teollisuus_uusi_k_m2muut
// ]

// Asuminen
// asuminen_kerrostalo_uusi_k_m2kunta
// asuminen_kerrostalo_uusi_k_m2valtio
// asuminen_kerrostalo_uusi_k_m2muut
// asuminen_pientalo_uusi_k_m2kunta
// asuminen_pientalo_uusi_k_m2valtio
// asuminen_pientalo_uusi_k_m2muut

export const mockAttributeData = {
  asuminen_kerrostalo_uusi_k_m2kunta: 72,
  asuminen_kerrostalo_uusi_k_m2valtio: 13
}

export const mockFloorAreaTotals = [
  {
    title: 'Kunta',
    value: 10000
  },
  {
    title: 'Valtio',
    value: 10000
  },
  {
    title: 'Muut',
    value: 10000
  },
  {
    title: 'Yhteensä',
    value: 10000
  }
]

const getFieldsInsideMatrixField = (fieldNames, columnCount) => {
  const fields = fieldNames.map((name, index) => ({
    name,
    placeholder: '0',
    type: 'number',
    row: Math.floor(index / columnCount),
    column: index % columnCount
  }))
  return fields
}

const livingMatrixFields = [
  'asuminen_kerrostalo_uusi_k_m2kunta',
  'asuminen_kerrostalo_uusi_k_m2valtio',
  'asuminen_kerrostalo_uusi_k_m2muut',
  'asuminen_pientalo_uusi_k_m2kunta',
  'asuminen_pientalo_uusi_k_m2valtio',
  'asuminen_pientalo_uusi_k_m2muut'
]

const publicMatrixFields = [
  'julkiset_uusi_k_m2kunta',
  'julkiset_uusi_k_m2valtio',
  'julkiset_uusi_k_m2muut'
]

const businessPremisesMatrixFields = [
  'toimisto_uusi_k_m2kunta',
  'toimisto_uusi_k_m2valtio',
  'toimisto_uusi_k_m2muut',
  'liiketila_uusi_k_m2kunta',
  'liiketila_uusi_k_m2valtio',
  'liiketila_uusi_k_m2muut',
  'teollisuus_uusi_k_m2kunta',
  'teollisuus_uusi_k_m2valtio',
  'teollisuus_uusi_k_m2muut'
]

const otherMatrixFields = [
  'muut_uusi_k_m2kunta',
  'muut_uusi_k_m2valtio',
  'muut_uusi_k_m2muut'
]

const additionalInformationFields = {
  field: {
    type: 'long_string',
    label: 'Lisätietoja kerrosalatiedoista',
    placeholder: 'Kirjoita lisätiedot tähän',
    name: 'lisatietoa_kerrosaloista'
  }
}

const livingMatrix = {
  field: {
    type: 'matrix',
    matrix: {
      rows: ['Kerrostalo', 'Pientalo'],
      columns: ['Kunta', 'Valtio', 'Muut'],
      showTotals: true,
      valueEnding: 'k-m^2',
      fields: getFieldsInsideMatrixField(livingMatrixFields, 3)
    }
  },
  attributeData: {
    asuminen_kerrostalo_uusi_k_m2kunta: '72',
    asuminen_kerrostalo_uusi_k_m2valtio: 13,
    '4': 'd'
  }
}

const publicMatrix = {
  field: {
    type: 'matrix',
    matrix: {
      rows: [''],
      columns: ['Kunta', 'Valtio', 'Muut'],
      showTotals: true,
      valueEnding: 'k-m^2',
      fields: getFieldsInsideMatrixField(publicMatrixFields, 3)
    }
  },
  attributeData: {
    '2': '',
    '3': 'c',
    '4': 'd'
  }
}

const businessPremisesMatrix = {
  field: {
    type: 'matrix',
    matrix: {
      rows: ['Toimisto', 'Liiketila', 'Teollisuus'],
      columns: ['Kunta', 'Valtio', 'Muut'],
      showTotals: true,
      valueEnding: 'k-m^2',
      fields: getFieldsInsideMatrixField(businessPremisesMatrixFields, 3)
    }
  },
  attributeData: {
    '2': '',
    '3': 'c',
    '4': 'd'
  }
}

const otherMatrix = {
  field: {
    type: 'matrix',
    matrix: {
      rows: [''],
      columns: ['Kunta', 'Valtio', 'Muut'],
      showTotals: true,
      valueEnding: 'k-m^2',
      fields: getFieldsInsideMatrixField(otherMatrixFields, 3)
    }
  },
  attributeData: {
    '2': '',
    '3': 'c',
    '4': 'd'
  }
}

const floorAreaFormSections = [
  {
    title: 'Asuminen',
    formField: livingMatrix
  },
  {
    title: 'Toimitilat',
    formField: businessPremisesMatrix
  },
  {
    title: 'Julkiset',
    formField: publicMatrix
  },
  {
    title: 'Muut',
    formField: otherMatrix
  },
  {
    title: 'Lisätietoja',
    formField: additionalInformationFields
  }
]

export default floorAreaFormSections
