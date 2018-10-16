const getInputs = (phase) => {
  switch (phase) {
    case 1: {
      return mockPhaseOne
    }

    case 2: {
      return mockPhaseTwo
    }

    case 3: {
      return mockPhaseThree
    }

    case 4: {
      return mockPhaseFour
    }

    case 5: {
      return mockPhaseFive
    }

    case 6: {
      return mockPhaseSix
    }

    default: return []
  }
}

const getProject = (id) => {
  const foundProject = projectData.find((project) => project.id === parseInt(id))
  if (!foundProject) { return projectData[0] }
  return foundProject
}

const getOwnProjects = () => {
  return ownProjects
}

const getAllProjects = () => {
  return allProjects
}

export default {
  getInputs,
  getOwnProjects,
  getAllProjects,
  getProject
}

const projectData = [
  {
    id: 1,
    name: 'Vallilanlaakson raitiotie',
    projectNumber: '5644_1',
    diaari: 'HEL2017-009847',
    projectCode: '12xxx',
    size: 'L',
    newResidency: 0,
    newBusinessPremises: 0,
    schedule: ['OAS 03.12.2018'],
    landowning: 'Kaupunki',
    inCharge: ['TESTI TESTERSSON', 'ESSI ESIMERKKI'],
    strategicGoals: ['1.2 Liikkumisen sujuvuus ja kestävät kulkumuodot', '1.4 Moderni ilmastovastuu'],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu orci lorem. Integer faucibus pharetra faucibus. Aliquam imperdiet, tortor semper condimentum gravida, sapien augue suscipit diam, ut congue nulla tortor vitae felis. Nullam et sapien ut ante dignissim auctor. Sed sodales malesuada risus sed maximus.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu orci lorem. Integer faucibus pharetra faucibus. Aliquam imperdiet, tortor semper condimentum gravida, sapien augue suscipit diam, ut congue nulla tortor vitae felis. Nullam et sapien ut ante dignissim auctor. Sed sodales malesuada risus sed maximus.
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu orci lorem. Integer faucibus pharetra faucibus. Aliquam imperdiet, tortor semper condimentum gravida, sapien augue suscipit diam, ut congue nulla tortor vitae felis. Nullam et sapien ut ante dignissim auctor. Sed sodales malesuada risus sed maximus.`,
    image: '/hankekuva.png'

  },
  {
    id: 2,
    name: 'Kuusiniementie 15, asemakaavan muutos',
    projectNumber: '0740_51',
    diaari: 'HEL 2017-007951',
    projectCode: '19xxx',
    size: 'S',
    newResidency: 786,
    newBusinessPremises: 0,
    schedule: ['Osallistumis- ja arviointisuunnitelma ja kaavan valmisteluaineisto (hakijan laatima viitesuunnitelma)  ovat esillä 20.11.–11.12.2017 Helsingin kaupungin verkkosivuilla www.hel.fi/suunnitelmat.', 'Mielipiteet osallistumis- ja arviointisuunnitelmasta sekä valmisteluaineistosta pyydetään esittämään viimeistään 11.12.2017', 'Kaupunkiympäristölautakunta hyväksyy kaavan arviolta keväällä 2018'],
    landowning: 'Yksityinen',
    inCharge: ['TESTI TESTERSSON', 'ESSI ESIMERKKI'],
    strategicGoals: [],
    description: 'Kaavaratkaisu mahdollistaa tontin tiivistämistä Kuusisaaren asemakaavan muutosperiaatteiden mukaisesti. Periaatteet on hyväksytty kaupunkisuunnittelulautakunnassa 10.3.2005. Rakennusoikeus nostetaan nykytilanteen mukaisesta tonttitehokkuudesta e=0.25 tonttitehokkuuteen e=0.28. Puretun asuinrakennuksen tilalle rakennetaan neljä uutta asuinrakennusta. Uudet asuinrakennukset ovat kaksikerroksisia, kivirakenteisia, vaaleaksi rapattuja yhden perheen asuinrakennuksia. Rantaan rakennetaan asukkaiden yhteiskäyttöinen laituri ja oleskeluterassi. Ranta-alue säilytetään luonnonmukaisena. Katunäkymä säilytetään vehreänä puu- ja pensasistutuksin.',
    image: '/kaava2.png'
  }
]

const ownProjects = [
  { id: 1, name: 'Vallilanlaakson raitiotie', status: 'Käynnistys', nextDeadline: Date.now(), size: 'L', edited: Date.now(), responsibility: 'Essi Esimerkki' },
  { id: 2, name: 'Kuusiniementie 15, asemakaavan muutos', status: 'OAS', nextDeadline: Date.now(), size: 'M', edited: Date.now(), responsibility: 'Pekka Juusonen' },
  { id: 1, name: 'Testi 10', status: 'Ehdotus', nextDeadline: Date.now(), size: 'XL', edited: Date.now(), responsibility: 'Testi Testersson' }
]

const allProjects = [
  ...ownProjects,
  { id: 1, name: 'Uusi kirjasto', status: 'Kanslia-Khs-Valtuusto', nextDeadline: Date.now(), size: 'M', edited: Date.now(), responsibility: 'Heikki Kallenen' },
  { id: 1, name: 'Puiston laajennus', status: 'OAS', nextDeadline: Date.now(), size: 'L', edited: Date.now(), responsibility: 'Essi Esimerkki' },
  { id: 1, name: 'Joku prokkis', status: 'Ehdotus', nextDeadline: Date.now(), size: 'M', edited: Date.now(), responsibility: 'Essi Esimerkki' },
  { id: 1, name: 'Urheilukenttä', status: 'Voimaantulo', nextDeadline: Date.now(), size: 'S', edited: Date.now(), responsibility: 'Essi Esimerkki' },
  { id: 1, name: 'Joku prokkis', status: 'Kanslia-Khs-Valtuusto', nextDeadline: Date.now(), size: 'XS', edited: Date.now(), responsibility: 'Kalle Heikkinen' }
]

// The following is mock data for inputs

const exampleNames = [
  'Essi Esimerkki',
  'Pentti Juusonen',
  'Sirpa Siilinen',
  'Juuso Juusonen'
]

const mockPhaseOne = {
  title: 'KÄYNNISTYS',
  sections: [
    {
      title: 'Hankkeen perustiedot',
      fields: [
        { title: 'Kaavahankkeen nimi (selkeä otsikko)', type: 'text', info: 'Anna kaavahankkeelle lyhyt ja selkeä nimi. Nimenä voi käyttää osoitetta, älä käytä korttelinumeroita' },
        { title: 'Mitä kaupunginosaa kaavahanke koskee', type: 'multiple', options: ['Alppiharju', 'Eira', 'Etu-Töölö', 'Haaga', 'Hermanni', 'Herttoniemi', 'Kaarela', 'Kaartinkaupunki', 'Kaivopuisto', 'Kalasatama', 'Kallio', 'Kamppi', 'Katajanokka', 'Kluuvi', 'Konala', 'Koskela', 'Kruununhaka', 'Kulosaari', 'Kumpula', 'Käpylä', 'Laajasalo', 'Laakso', 'Lauttasaari', 'Länsisatama', 'Malmi', 'Meilahti', 'Mellunkylä', 'Munkkiniemi', 'Mustikkamaa-Korkeasaari', 'Oulunkylä', 'Pakila', 'Pasila', 'Pitäjänmäki', 'Pukinmäki', 'Punavuori', 'Ruskeasuo', 'Santahamina', 'Suurmetsä', 'Suutarila', 'Sörnäinen', 'Taka-Töölö', 'Tammisalo', 'Tapaninkylä', 'Toukola', 'Tuomarinkylä', 'Töölö', 'Ulkosaaret', 'Ullanlinna', 'Ultuna', 'Vallila', 'Vanhakaupunki', 'Vartiokylä', 'Vartiosaari', 'Viikki', 'Vuosaari', 'Östersundom'], info: 'Valitse kaupunginosat alasvetovalikosta' },
        { title: 'Prosessin kokoluokka (kaavaprosessi)', type: 'select', options: ['XS', 'S', 'M', 'L', 'XL'], info: 'Valitse prosessi yksikön/tiimin päällikön kanssa. Katso ohje.' },
        { title: 'Hankenumero', type: 'text', info: 'Merkitse PW:n hankenumero' },
        { title: 'Diaarinumero', type: 'text', info: 'Katso Ahjosta' },
        { title: 'Hanketyyppi', type: 'select', options: ['asemakaava'], info: 'Valitse hanketyypiksi asemakaava.' },
        { title: 'Hanke näkyy raportoinnissa', type: 'radio', info: 'Oletuksena on Kyllä. Jos hanke on epävarma, vaihda tähän EI.' },
        { title: 'Priorisointimerkintä', type: 'radio', info: 'Merkitään tarvittaessa.' },
        { title: 'Kaavan hyväksyjätaho', type: 'select', options: ['kaupunginvaltuusto', 'kaupunkiympäristölautakunta'], info:'(automaattinen täyttö)' },
        // TO-DO: Kaavan hyväksyjätahon automaattinen täyttö kaavan koon perusteella
        { title: 'Strategiakytkentä (kaupungin strategiset tavoitteet)', type: 'multiple', options: ['A', 'B', 'C'], info: 'Valitse alasvetovalikosta 1-3 tavoitetta, joita hanke toteuttaa' },
        { title: 'Sisältyykö suunnittelualueeseen kaavoittamatonta aluetta', type: 'radio' }
      ]
    },
    {
      title: 'Suunnittelun tavoitteet ja alue',
      fields: [
        { title: 'Suunnittelualueen kuvaus (hankkeen kuvaus)', type: 'textarea', info: 'Laadi lyhyt ja selkeä hankekuvausteksti kuntalaisia ja ylintä johtoa varten' },
        { title: 'Suunnittelualueen rajaus', type: 'file', info: 'Lataa tähän rajaus (dgn)' },
        { title: 'Hankekortin kuva', type: 'file', info: 'Lataa tähän hankekortin kuva (JPG)' }
      ]
    },
    {
      title: 'Yhteyshenkilöt',
      fields: [
        { title: 'Vastuuhenkilö', type: 'select', options: exampleNames, info: 'Valitse listasta oma nimesi' },
        { title: 'Vastuuyksikkö', type: 'select', options: ['Yksikkö 1', 'Yksikkö 2'], info: 'Valitse listasta yksikkö, joka vastaa hankkeesta' },
        { title: 'Suunnitteluavustajan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta' },
        { title: 'Vuorovaikutussuunnittelijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Liikennesuunnittelijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Teknistaloudellisen asiantuntijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Rakennussuojeluasiantuntijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Maisema-arkkitehdin nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Yleiskaava-asiantuntijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Maaomaisuuden kehittäminen ja tontit, asiantuntijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Muun asiantuntijan nimi (Kymp)', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Muun asiantuntijan nimi (muut kaupungin toimialat)', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Viranomaisyhteistyötahot (kaupunkiorganisaation ulkopuoliset)', type: 'list', info: 'Luettele tahot.' },
        { title: 'Hakijan suunnittelijan nimi, konsultit, muut yhteistyötahot', type: 'text', info: 'Kerro tiedot.' }
      ]
    },
    {
      title: 'Hakijat ja perittävät kustannukset',
      fields: [
        { title: 'Hakemuksen saapumispäivämäärä', type: 'date', info: 'Katso hakemus Ahjosta' },
        { title: 'Mitä haetaan, hakemuksessa (1…n) esitetyt perustelut', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' },
        { title: 'Hakijan (1…n) nimi', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' },
        { title: 'Hakijan (1…n) osoite', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' },
        { title: 'Hakijan (1…n) tontti (korttelinro/tonttitonttinro)', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' }
      ]
    },
    {
      title: 'Kerrosalatiedot',
      fields: [
        //TO-DO: Esitä tämä osio kompaktimmin ruudulla. Esim. Excelin kaltainen matriisinäkymä, jossa vaakarivejä ja pystysarakkeita?
        { title: 'Asuminen, kerrostalo, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee kaupungin maalle kerrostaloihin' },
        { title: 'Asuminen, kerrostalo, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee valtion maalle kerrostaloihin' },
        { title: 'Asuminen, kerrostalo, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee yksityiselle maalle kerrostaloihin' },
        { title: 'Asuminen, pientalo, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee kaupungin maalle pientaloihin' },
        { title: 'Asuminen, pientalo, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee valtion maalle pientaloihin' },
        { title: 'Asuminen, pientalo, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee yksityiselle maalle pientaloihin' },
        { title: 'Asuminen, yhteensä', type: 'number', info: '(automaattinen täyttö)' },
        { title: 'Toimisto, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta toimistotilaa tulee kaupungin maalle.' },
        { title: 'Toimisto,uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta toimistotilaa tulee valtion maalle.' },
        { title: 'Toimisto, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta toimistotilaa tulee yksityiselle maalle.' },
        { title: 'Liiketila, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta liiketilaa tulee kaupungin maalle.' },
        { title: 'Liiketila, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta liiketilaa tulee valtion maalle.' },
        { title: 'Liiketila, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta liiketilaa tulee yksityiselle maalle.' },
        { title: 'Teollisuus, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta teollisuustilaa tulee kaupungin maalle kerrostaloihin.' },
        { title: 'Teollisuus, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta teollisuustilaa tulee valtion maalle.' },
        { title: 'Teollisuus, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta teollisuustilaa tulee kaupungin maalle kerrostaloihin.' },
        { title: 'Toimitila, yhteensä', type: 'number', info: '(automaattinen täyttö)' },
        { title: 'Julkiset, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uusia julkisia tiloja tulee kaupungin maalle kerrostaloihin.' },
        { title: 'Julkiset, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uusia julkisia tiloja tulee valtion maalle.' },
        { title: 'Julkiset, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uusia julkisia tiloja tulee yksityiselle maalle.' },
        { title: 'Julkiset, yhteensä', type: 'number', info: '(automaattinen täyttö)' }
      ]
    },
    {
      title: 'Maanomistus ja maankäyttösopimus',
      fields: [
        // TO-DO: Avoimet tekstikentät valinnan perusteella. "hidden" -> "visible", tjsp?
        { title: 'Maanomistus: kaupunki', type: 'radio', info: 'Kyllä -> avoin tekstikenttä. Kerro mitkä alueet ovat kaupungin omistuksessa' },
        { title: 'Maanomistus: valtio', type: 'radio', info: 'Kyllä -> avoin tekstikenttä. Kerro mitkä alueet ovat valtion omistuksessa' },
        { title: 'Maanomistus: yksityinen', type: 'radio', info: 'Kyllä -> avoin tekstikenttä. Kerro mitkä alueet ovat yksityisomistuksessa' }
      ]
    },
    {
      title: 'Aikataulu ja eteneminen',
      fields: [
        { title: 'Aloituskokous (suunniteltu pvm)', type: 'date', info: 'Arvioi alustavasti aloituskokouspäivä.' },
        { title: 'Kaavan yhteydessä laaditaan liikennesuunnitelma', type: 'radio' },
        { title: 'Kaavahanke viedään johdon käsittelyyn (jos palvelujen välisiä kysymyksiä)', type: 'radio' },
        { title: 'Kaavahanke esitellään Pajassa', type: 'radio' },
        { title: 'Kaavahanke vaatii ELY-yhteistyötä', type: 'radio' },
        { title: 'Viranomaisneuvottelu ELY:n kanssa on tarpeen', type: 'radio' },
        { title: 'Kaavahanke viedään päälliköiden Kick off -ryhmään ', type: 'radio' },
        { title: 'OAS ja valmisteluaineisto laitetaan yhtä aikaa esille', type: 'radio' },
        { title: 'OAS-vaiheessa tarvitaan keskustelutilaisuus', type: 'radio' },
        { title: 'OAS-vaiheessa tarvitaan lehti-ilmoitus', type: 'radio' },
        { title: 'Vuorovaikutusta on syytä järjestää tavallista enemmän', type: 'radio' },
        { title: 'Arvioitu ennakkotieto milloin OAS esilläolo alkaa', type: 'date', info: 'Arvioi alustavasti milloin OAS on esillä.' },
        { title: 'OAS-aineiston määräaika, jolloin aineiston tulee olla tarkastettu', type: 'date' },
        { title: 'Arvioitu ennakkotieto milloin tarkistettu ehdotus Kylk', type: 'date' }
      ]
    },
    {
      title: 'Konsulttityö', // TO-DO: Siirretään Aikataulu ja eteneminen -osion loppuun?
      fields: [
        { title: 'Tarvittava konsulttityö', type: 'textarea' },
        { title: 'Konsulttityön summa / vuosi', type: 'number' }
      ]
    }
  ]
}

const mockPhaseTwo = {
  title: 'Osallistumis- ja arviointisuunnitelma (OAS)',
  sections: [
    {
      title: 'Hankkeen perustiedot',
      fields: [
        { title: 'Uutta tai siirrettävää infraa', type: 'radio', info: 'Valitse kyllä, jos kaava-alueeseen sisältyy merkittävää uutta tai siirrettävää infraa.' }
      ]
    },
    {
      title: 'Suunnittelun tavoitteet ja alue',
      fields: [
        { title: 'OAS-kuva', type: 'file', info: 'Lataa tähän OAS-kuva (JPG)' },
        { title: 'Kaavan tavoitteet', type: 'textarea', info: 'Kuvaile kaavan tarkoitus ja tavoitteet. Kuvaile selkeästi ja havainnollisesti, mihin suunnitellaan mitäkin. Perustele tarvittaessa mihin tavoitteet pohjautuvat.' }
      ]
    },
    {
      title: 'Hakijat ja perittävät kustannukset',
      fields: [
        { title: 'Hakijalta/hakijoilta perittävä maksu', type: 'number' }
        // TO-DO: Tähän pitäisi tulla lista hakijoista (syötetty vaiheessa 1), ja kullekin hakijalle pitäisi pystyä allokoimaan hakijakohtainen summa maksua varten.
      ]
    },
    {
      title: 'Maanomistus ja maankäyttösopimus',
      fields: [
        // TO-DO: automaattinen täyttö
        { title: 'Maankäyttösopimus', type: 'radio', info: '(automaattinen täyttö)' },
        { title: 'Maankäyttösopimuslause', type: 'radio', info: '(automaattinen täyttö)' }
      ]
    },
    {
      title: 'Aikataulu ja eteneminen',
      fields: [
        { title: 'Aloituskokous (toteutunut pvm)', type: 'list', info: 'Merkitse toteutunut pvm.' },
        { title: 'Tarvittavat selvitykset (selvitys, resurssit, aikataulu)', type: 'textarea', info: 'Luettele tarvittavat selvitykset, kuka ne tekee ja mihin mennessä.' },
        { title: 'Asian otsikko esityslistalle (hyväksyminen)', type: 'textarea' }
      ]
    },
    {
      title: 'Osallistuminen ja aineistot',
      fields: [
        { title: 'OAS-vaiheen keskustelutilaisuuden (tai muut osallistumistavat) aika ja paikka', type: 'text', info: 'Lisää tilaisuuden paikka, päivä ja aika, jos tilaisuus järjestetään. Tarvittaessa kerro muista osallistumistavoista.' },
        { title: 'OAS-aineiston esilläoloaika alkaa', type: 'date' },
        { title: 'OAS-aineiston esilläoloaika päättyy', type: 'date' },
        { title: 'OAS-aineiston esilläolopaikka', type: 'text', info: 'Lisää tähän paikka, jossa aineisto pidetään nähtävillä tai poista rivi, jos tällaista muuta esilläpitopaikkaa ei ole (Verkkosivut ja KYMP:n asiakaspalvelu ovat aina nähtävilläolopaikkoina).' },
        { title: 'Mitä valmisteluaineistoa on esillä OAS:in kanssa', type: 'textarea', info: 'Kerro mitä muuta aineistoa on esillä OAS:n kanssa yhtä aikaa.' },
        { title: 'Pienoismallin tms. esilläolo OAS:n kanssa', type: 'radio', info: 'Kerro jos jotakin aineistoa, kuten pienoismalli, on esillä vain tietyssä paikassa esim. kirjastossa.' },
        { title: 'Milloin viimeistään mielipiteet OAS:sta toimitetaan', type: 'date' },
        { title: 'Erilliset neuvottelut asiantuntijoiden kanssa', type: 'radio', info: 'Poista lause, jos tiedät ettei neuvottelulle ole tarvetta.' }
      ]
    },
    {
      title: 'Osalliset',
      fields: [
        { title: 'Mitkä seurat ja yhdistykset ovat osallisia', type: 'list', info: 'Luettele alueen asukasyhdistykset ja muut asiaan liittyvät seurat ja -yhdistykset. Helsingin Yrittäjät mainitaan aina tässä luettelossa.' },
        { title: 'Mitkä asiantuntijaviranomaiset ovat osallisia', type: 'list', info: 'Luettele hankkeessasi tarvittavat tahot nimeltä tässä järjestyksessä: ensin kaupungin ulkopuoliset viranomaiset sitten kaupungin toimialat.' },
        { title: 'Onko alueella asunto- tai kiinteistöosakeyhtiöitä', type: 'textarea' }
      ]
    },
    {
      title: 'Vaikutusten arviointi',
      fields: [
        { title: 'Vaikutusten arviointi (suunniteltu)', type: 'textarea', info: 'Luettele vain ne vaikutukset, jotka todella arvioidaan. Kerro miten vaikutuksia arvioidaan. Kirjoita mitkä vaikutusten arvioinnit teetetään konsultilla.' }
      ]
    },
    {
      title: 'Suunnittelun taustatietoa',
      fields: [
        // TO-DO: Halutaanko tässä toistaa vaihe 1) maankäyttösopimustietoja? { title: 'Maanomistus: kaupunki', type: 'radio', info: 'Kyllä -> avoin tekstikenttä. Kerro mitkä alueet ovat kaupungin omistuksessa' },
        // TO-DO: Halutaanko tässä toistaa vaihe 1) maankäyttösopimustietoja? { title: 'Maanomistus: valtio', type: 'radio', info: 'Kyllä -> avoin tekstikenttä. Kerro mitkä alueet ovat valtion omistuksessa' },
        // TO-DO: Halutaanko tässä toistaa vaihe 1) maankäyttösopimustietoja? { title: 'Maanomistus: yksityinen', type: 'radio', info: 'Kyllä -> avoin tekstikenttä. Kerro mitkä alueet ovat yksityisomistuksessa' },

        { title: 'Vireilletulo, kenen aloitteesta', type: 'select', options: ['Kaupunki', 'Omistaja'], info: 'Kerro aloitteentekijätaho' },
        { title: 'Vireilletulovuosi', type: 'number', info: 'Kerro vuosi (esim. hakemuksen saapuminen tai OAS:n valmistelun aloitus' },
        { title: 'Vuosi jolloin hanke on ollut kaavoituskatsauksessa', type: 'number', info: 'Kerro vuosi.' },

        // TO-DO: Halutaanko tässä toistaa vaihe 2) maankäyttösopimustietoja? { title: 'Maankäyttösopimuslause', type: 'radio', info: '(automaattinen täyttö)' },

        { title: 'Alueella voimassa olevat asemakaavat ovat saaneet lainvoiman vuosina', type: 'list', info: 'Kerro voimassa olevien asemakaavojen vuosiluvut.' },
        { title: 'Voimassa olevien asemakaavojen sisältö: pääkohdat', type: 'textarea', info: 'Kerro voimassa olevien asemakaavojen pääkohdat (esim. käyttötarkoitus) lyhyesti. Kaavanumeroita ei tarvita.' },
        { title: 'Yleiskaava 2002:n aluemerkintä', type: 'text', info: 'Kerro lyhyesti, vain tarvittaessa.' },
        { title: 'Osayleiskaava ja sen aluemerkintä', type: 'text', info: 'Kerro lyhyesti, vain tarvittaessa.' },
        { title: 'Uuden yleiskaavan aluemerkintä', type: 'text', info: 'Kerro lyhyesti, vain tarvittaessa.' },
        { title: 'Tehdyt selvitykset', type: 'textarea', info: 'Kerro tehdyt selvitykset, jotka ovat oleellisia hankkeessasi.' },
        { title: 'Muut suunnitelmat ja päätökset', type: 'textarea', info: 'Kerro muut suunnitelmat ja päätökset, jotka ovat oleellisia hankkeessasi.' },
        { title: 'Voimassa oleva rakennuskielto', type: 'list', info: 'Kerro voimassa olevasta rakennuskiellosta.' },
        { title: 'Alueen lähtökohdat ja nykytilanne', type: 'textarea' },
        { title: 'Mihin lehteen OAS-lehti-ilmoitus tulee', type: 'text' }

      ]
    },
    {
      title: 'OAS:n perustiedot',
      fields: [
        { title: 'OAS-numero', type: 'text', info: 'Kaavoitussihteeri merkitsee päivämäärän ja OAS-numeron.' },
        { title: 'OAS:n päiväys', type: 'date', info: 'Kaavoitussihteeri merkitsee päivämäärän ja OAS-numeron.' },
        { title: 'OAS:n päivityslauseke', type: 'textarea' }
      ]
    }
  ]
}

const mockPhaseThree = {
  title: 'Ehdotus',
  sections: [
    {
      title: 'Kaavaselostuksen perustiedot',
      fields: [
        { title: 'Kaavanumero', type: 'number' },
        { title: 'Liikennesuunnitelman numero', type: 'number' },
        { title: 'Päivätty -päivämäärä, selostuksen päiväys', type: 'date' },
        { title: 'Mitä kaupunginosaa, korttelia, tonttia tai muita alueita kaavahanke koskee', type: 'textarea' },
        { title: 'Sijaintikuva', type: 'file' }
      ]
    },
    {
      title: 'Tiivistelmä',
      fields: [
        { title: 'Tiivistelmä kaavahankkeesta', type: 'textarea' },
        { title: 'Asukasmäärän lisäys alueella', type: 'number' }
      ]
    },
    {
      title: 'Alueen lähtökohdat ja nykytilanne',
      fields: [
        { title: 'Alueen lähtökohdat ja nykytilanne', type: 'textarea' }
      ]
    },
    {
      title: 'Mitoitus',
      fields: [
        { title: 'Suunittelualueen pinta-ala, ha', type: 'textarea', info: 'Tieto löytyy tekeillä olevasta kaavatiedostosta (dgn).' },
        { title: 'Kerrosalan lisäys, k-m2', type: 'number' },
        { title: 'Maanalaisten tilojen pinta-ala yhteensä, ha', type: 'number' },
        { title: 'Aluevarausten pinta-alat yhteensä, ha', type: 'number' },
        { title: 'Pinta-alan muutokset yhteensä, ha', type: 'number' },
        { title: 'Suojellut rakennukset, lukumäärä yhteensä', type: 'number' },
        { title: 'Suojellut rakennukset, kerrosala (k-m2) yhteensä', type: 'number' }
      ]
    },
    {
      title: 'Korttelialueet',
      fields: [
        { title: 'Xxkorttelialue: lähtökohdat', type: 'textarea' },
        { title: 'Xxkorttelialue: kaavaratkaisu', type: 'textarea' }
      ]
    },
    {
      title: 'Liikenne',
      fields: [
        { title: 'Liikenne: lähtökohdat', type: 'textarea' },
        { title: 'Liikenne: kaavaratkaisu', type: 'textarea' }
      ]
    },
    {
      title: 'Palvelut',
      fields: [
        { title: 'Palvelut: lähtökohdat', type: 'textarea' },
        { title: 'Palvelut: kaavaratkaisu', type: 'textarea' }
      ]
    },
    {
      title: 'Esteettömyys',
      fields: [
        { title: 'Esteettömyys: lähtökohdat', type: 'textarea' },
        { title: 'Esteettömyys: kaavaratkaisu', type: 'textarea' }
      ]
    },
    {
      title: 'Luonnonympäristö',
      fields: [
        { title: 'Luonnonympäristö: lähtökohdat, luontotietojärjestelmän luontokohteet', type: 'textarea' },
        { title: 'Luonnonympäristö: kaavaratkaisu', type: 'textarea' }
      ]
    },
    {
      title: 'Ekologinen kestävyys',
      fields: [
        { title: 'Ekologinen kestävyys: lähtökohdat', type: 'textarea' },
        { title: 'Ekologinen kestävyys: kaavaratkaisu', type: 'textarea' }
      ]
    },
    {
      title: 'Suojelukohteet',
      fields: [
        { title: 'Suojelukohteet: lähtökohdat, nykyiset suojelukohteet', type: 'textarea' },
        { title: 'Suojelukohteet: kaavaratkaisu', type: 'textarea' }
      ]
    },
    {
      title: 'Teknistaloudellinen suunnittelu',
      fields: [
        { title: 'Yhdyskuntatekninen huolto: lähtökohdat', type: 'textarea' },
        { title: 'Yhdyskuntatekninen huolto: kaavaratkaisu', type: 'textarea' },
        { title: 'Maaperän rakennettavuus, pohjarakentaminen ja pilaantuneisuuden kunnostaminen: lähtökohdat', type: 'textarea' },
        { title: 'Maaperän rakennettavuus, pohjarakentaminen ja pilaantuneisuuden kunnostaminen: kaavaratkaisu', type: 'textarea' },
        { title: 'Ympäristöhäiriöt : lähtökohdat', type: 'textarea' },
        { title: 'Ympäristöhäiriöt: kaavaratkaisu', type: 'textarea' },
        { title: 'Pelastusturvallisuus: kaavaratkaisu', type: 'textarea' },
        { title: 'Rakennetekniikka: kaavaratkaisu', type: 'textarea' }
      ]
    },
    {
      title: 'Nimistö',
      fields: [
        { title: 'Nimistö', type: 'textarea' }
      ]
    },
    {
      title: 'Vaikutukset',
      fields: [
        { title: 'Vaikutukset, yhteenveto laadituista selvityksistä', type: 'textarea' },
        { title: 'Yhdyskuntataloudelliset vaikutukset', type: 'textarea' },
        { title: 'Vaikutukset yhdyskuntarakenteeseen ja rakennettuun ympäristöön ', type: 'textarea' },
        { title: 'Vaikutukset luontoon ja maisemaan', type: 'textarea' },
        { title: 'Vaikutukset liikenteen ja teknisen huollon järjestämiseen', type: 'textarea' },
        { title: 'Vaikutukset kaupunkikuvaan ja kulttuuriperintöön', type: 'textarea' },
        { title: 'Vaikutukset ilmastonmuutoksen hillintään ja sopeutumiseen', type: 'textarea' },
        { title: 'Vaikutukset ihmisten terveyteen, turvallisuuteen, eri väestöryhmien toimintamahdollisuuksiin lähiympäristössä, sosiaalisiin oloihin ja kulttuuriin', type: 'textarea' },
        { title: 'Elinkeino-, työllisyys- ja talousvaikutukset', type: 'textarea' },
        { title: 'Muut merkittävät vaikutukset', type: 'textarea' }
      ]
    },
    {
      title: 'Toteutus',
      fields: [
        { title: 'Kaavan toteutus', type: 'textarea' },
        { title: 'Kaava-alueen kuuluminen toteuttamisprojektiin', type: 'textarea' },
        { title: 'Vaiheittain toteuttaminen ja kynnystoimet', type: 'textarea' },
        { title: 'Toteuttamispolut, vaihtoehdot', type: 'textarea' },
        { title: 'Rakennuskelpoiseksi saattaminen', type: 'textarea' },
        { title: 'Rakentamisaikataulu', type: 'textarea' },
        { title: 'Korttelikortit', type: 'textarea' }
      ]
    },
    {
      title: 'Suunnittelun lähtökohdat',
      fields: [
        { title: 'Ote Yleiskaava 2002:sta', type: 'file' },
        { title: 'Ote Helsingin uudesta yleiskaavasta', type: 'file' },
        { title: 'Ote voimassa olevista asemakaavoista', type: 'file' },
        { title: 'Ote maakuntakaavasta', type: 'file' },
        { title: 'Ote 2. vaihemaakuntakaavasta', type: 'file' },
        { title: 'Valtakunnalliset alueidenkäyttötavoitteet', type: 'multiple', options: ['A', 'B', 'C'], info: 'Valitse luettelosta vain olennaiset tavoitteet, jotka koskevat kaavahankettasi.' },
        { title: 'Kaavaratkaisu on ristiriidassa valtakunnallisten tavoitteiden kanssa', type: 'radio' },
        { title: 'Yleiskaavan suojelutavoitteet', type: 'textarea' },
        { title: 'Aluetta koskeva maanalainen yleiskaava', type: 'textarea' },
        { title: 'Aluetta koskevat uuden yleiskaavan tavoitteet', type: 'textarea' },
        { title: 'Kaavaratkaisu poikkeaa yleiskaavasta', type: 'radio' },
        { title: 'Maakuntakaava ja 2. vaihemaakuntakaava', type: 'textarea' },
        { title: 'Kaavaratkaisu poikkeaa maakuntakaavoista', type: 'radio' },
        { title: 'Voimassa olevan/olevien asemakaavan/kaavojen sisältö: tarkemmin', type: 'textarea' },
        { title: 'Rakennusjärjestys', type: 'select', options: ['Helsingin kaupungin rakennusjärjestys on hyväksytty 22.9.2010.'] },
        { title: 'Rakennuskiellot', type: 'textarea' },
        { title: 'Muut suunnitelmat ja päätökset', type: 'textarea' },
        { title: 'Pohjakartta', type: 'textarea' },
        { title: 'Maanomistus', type: 'textarea' }
      ]
    },
    {
      title: 'Suunnittelu- ja käsittelyvaiheet',
      fields: [
        { title: 'Vireilletulo', type: 'textarea' },
        { title: 'Valmisteluvaiheessa tehty viranomaisyhteistyö (yhteenveto)', type: 'textarea' },
        { title: 'Osallistumis- ja arviointisuunnitelmavaiheessa saadut mielipiteet (yhteenveto)', type: 'textarea' },
        { title: 'Vastineet OAS-vaiheessa saatuihin mielipiteisiin', type: 'textarea' },
        { title: 'OAS-vaiheen keskustelutilaisuuden yhteenveto', type: 'textarea' },
        { title: 'Miten OAS- ja luonnosvaiheessa saadut mielipiteet on otettu huomioon', type: 'textarea' },
        { title: 'Mielipiteiden esittäjien nimet', type: 'multiple', options: exampleNames },
        { title: 'Asemakaavaratkaisun eri vaihtoehdot', type: 'textarea' },
        { title: 'Valmisteluaineiston muut käsittelyvaiheet', type: 'textarea' }
      ]
    },
    {
      title: 'Ehdotuksen nähtävilläolo',
      fields: [
        { title: 'Keneltä pyydetään lausunnot kaavaehdotuksesta', type: 'multiple', options: exampleNames },
        { title: 'Nähtävilläoloajan pituus 14/30 pv', type: 'select', options: ['14 pv', '30 pv'] }
      ]
    }

  ]
}

const mockPhaseFour = {
  title: 'Tarkistettu ehdotus',
  sections: [
    {
      title: 'Ehdotuksen nähtävilläolo',
      fields: [
        { title: 'Ehdotuksen julkinen nähtävilläolo, toteutuneet päivämäärät', type: 'textarea' },
        { title: 'Muistutusten lukumäärä', type: 'textarea' },
        { title: 'Nähtävilläoloajan ulkopuolella saapuneiden kirjeiden lukumäärä', type: 'textarea' },
        { title: 'Keneltä on saatu lausunnot', type: 'textarea' },
        { title: 'Muistutusten/kirjeiden esittäjien nimet, (ja ovatko pyytäneet tiedon kaavan päätöksistä)', type: 'textarea' },
        { title: 'Ehdotuksen julkisen nähtävilläolon aikana saadut muistutukset (yhteenveto)', type: 'textarea' },
        { title: 'Ehdotuksen julkisen nähtävilläolon ulkopuolella saadut kirjeet (yhteenveto)', type: 'textarea' },
        { title: 'Ehdotuksen julkisen nähtävilläolon aikana saadut lausunnot (yhteenveto)', type: 'textarea' }
      ]
    },
    {
      title: 'Toimenpiteet ehdotuksen nähtävilläolon jälkeen',
      fields: [
        { title: 'Vastineet muistutuksiin ja miten muistutukset on otettu huomioon', type: 'textarea' },
        { title: 'Vastineet kirjeisiin ja miten kirjeet on otettu huomioon', type: 'textarea' },
        { title: 'Vastineet julkisen nähtävilläolon aikana saatuihin lausuntoihin ja miten ne on otettu huomioon', type: 'textarea' },
        { title: 'Kaavaehdotukseen tehdyt muutokset', type: 'textarea' },
        { title: 'Aineistoon tehdyt täydennykset', type: 'textarea' },
        { title: 'Julkisen nähtävilläolon jälkeinen vuorovaikutus', type: 'textarea' }
      ]
    },
    {
      title: 'Tarkistetun ehdotuksen lautakuntakäsittely',
      fields: [
        { title: 'Asian otsikko esityslistalle (tarkistettu ehdous)', type: 'textarea' },
        { title: 'Tarkistetun ehdotuksen esittely lautakunnalle, pvm (toteutunut)', type: 'textarea' }
      ]
    }
  ]
}

const mockPhaseFive = {
  title: 'Kanslia-KHS-Valtuusto',
  sections: [
    {
      title: 'Hyväksyminen',
      fields: [
        { title: 'Asemakaavan muutoksen hyväksyminen Kylk:ssä', type: 'textarea' }
      ]
    }
  ]
}

const mockPhaseSix = {
  title: 'Voimaantulo',
  sections: [
    {
      title: 'Voimaantulo',
      fields: [
        { title: 'Voimaantulo pvm', type: 'date' }
      ]
    }
  ]
}
