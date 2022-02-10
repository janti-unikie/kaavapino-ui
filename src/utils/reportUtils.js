const getFilterName = id => {
  switch (id) {
    case 'id':
      return 'Tunniste'
    case 'identifier':
      return 'Identifier'
    case 'user':
      return 'Vastuuhenkilö'
    case 'user__uuid':
      return 'Vastuuhenkilön tunniste'
    case 'created_at':
      return 'Luotu (päivä ja aika)'
    case 'created_at__date':
      return 'Luotu (päivä)'
    case 'modified_at':
      return 'Muokattu (päivä ja aika)'
    case 'modified_at__date':
      return 'Muokattu (päivä)'
    case 'name':
      return 'Nimi'
    case 'subtype':
      return 'Koko (luku)'
    case 'subtype__name':
      return 'Koko (nimi)'
    case 'phase':
      return 'Vaihe (tunniste)'
    case 'phase__index':
      return 'Vaihe (luku)'
    case 'phase__name':
      return 'Vaihe (nimi)'
    default:
      return 'ei tietoa'
  }
}

const getOptionName = id => {
  switch (id) {
    case 'in':
      return 'sisältää arvot (pilkulla eroitettuna)'
    case 'icontains':
      return 'sisältää arvon'
    case 'exact':
      return 'täsmälleen'
    case 'iexact':
      return 'täsmälleen (Merkkikoolla ei väliä)'
    case 'lt':
      return 'vähemmän kuin'
    case 'gt':
      return 'suurempi kuin'
    case 'date__exact':
      return 'täsmälleen'
    case 'date__lte':
      return 'vähemmän tai yhtäsuuri kuin'
    case 'date__gte':
      return 'suurempi tai yhtäsuuri kuin'
    case 'isnull': {
      return 'käyttäjä vastuuhenkilö'
    }  
    default:
      return 'ei tietoa'
  }
}

export default {
  getFilterName,
  getOptionName
}
