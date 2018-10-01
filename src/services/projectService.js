const getInputs = (phase) => {
  switch (phase) {
    case 1: {
      return mockPhaseOne
    }

    case 2: {
      return mockPhaseTwo
    }

    default: return []
  }
}

export default {
  getInputs
}

// The following is mock data

const exampleNames = [
  '-',
  'Essi Esimerkki',
  'Pentti Juusonen',
  'Sirpa Siilinen',
  'Juuso Juusonen'
]

const mockPhaseOne = {
  title: 'KÄYNNISTYS',
  sections: [
    {
      title: 'Perustiedot',
      fields: [
        { title: 'Diaarinumero', type: 'text', info: 'Katso Ahjosta' },
        { title: 'Hankenumero', type: 'text', info: 'Merkitse PW:n hankenumero' },
        { title: 'Mitä kaupunginosaa kaavahanke koskee', type: 'select', options: ['-', 'Vuosaari', 'Katajanokka', 'Hakaniemi'], info: 'Valitse kaupunginosat alasvetovalikosta' },
        { title: 'Kaavahankkeen nimi', type: 'text', info: 'Anna kaavahankkeelle lyhyt ja selkeä nimi. Nimenä voi käyttää osoitetta, älä käytä korttelinumeroita' },
        { title: 'Hanke näkyy raportoinnissa', type: 'radio', info: 'Oletuksena on Kyllä. Jos hanke on epävarma, vaihda tähän EI.' },
        { title: 'Suunnittelualueen kuvaus', type: 'textarea', info: 'Laadi lyhyt ja selkeä hankekuvausteksti kuntalaisia ja ylintä johtoa varten' },
        // { title: 'Suunnittelualueen rajaus', type: 'image', info: 'Lataa tähän rajaus (dgn)' },
        { title: 'Hakemuksen saapumispäivämäärä', type: 'date', info: 'Katso hakemus Ahjosta' },
        { title: 'Hakijan (1…n) nimi', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' },
        { title: 'Hakijan (1…n) osoite', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' },
        { title: 'Hakijan (1…n) tontti (korttelinro/tonttitonttinro)', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' },
        { title: 'Mitä haetaan, hakemuksessa (1…n) esitetyt perustelut', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' },
        { title: 'Vastuuhenkilö', type: 'select', options: exampleNames, info: 'Valitse listasta oma nimesi' },
        { title: 'Vastuuyksikkö', type: 'select', options: ['-', 'Yksikkö 1', 'Yksikkö 2'], info: 'Valitse listasta yksikkö, joka vastaa hankkeesta' },
        { title: 'Suunnitteluavustajan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta' }
      ]
    },
    {
      title: 'Tavoitteet ja mitoitus',
      fields: [
        { title: 'Vuorovaikutussuunnittelijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Liikennesuunnittelijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Teknistaloudellisen asiantuntijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Rakennussuojeluasiantuntijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Maisema-arkkitehdin nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Yleiskaava-asiantuntijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Maaomaisuuden kehittäminen ja tontit, asiantuntijan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Muun asiantuntijan nimi (Kymp)', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Muun asiantuntijan nimi (muut kaupungin toimialat)', type: 'select', options: exampleNames, info: 'Valitse listasta asiantuntija, joka osallistuu hankkeeseesi' },
        { title: 'Viranomaisyhteistyötahot (kaupunkiorganisaation ulkopuoliset)', type: 'list', info: 'Luettele tahot' },
        { title: 'Hakijan suunnittelijan nimi, konsultit, muut yhteistyötahot', type: 'text', info: 'Kerro tiedot' },
        { title: 'Strategiakytkentä', type: 'multiple', options: ['A', 'B', 'C'], info: 'Valitse alasvetovalikosta 1-3 tavoitetta, joita hanke toteuttaa' },
        { title: 'Asuminen, kerrostalo, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee kaupungin maalle kerrostaloihin' },
        { title: 'Asuminen, kerrostalo, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee valtion maalle kerrostaloihin' },
        { title: 'Asuminen, kerrostalo, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee yksityiselle maalle kerrostaloihin' },
        { title: 'Asuminen, pientalo, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee kaupungin maalle pientaloihin' },
        { title: 'Asuminen, pientalo, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee valtion maalle pientaloihin' },
        { title: 'Asuminen, pientalo, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee yksityiselle maalle pientaloihin' },
        { title: 'Asuminen, yhteensä', type: 'number' }
      ]
    },
    {
      title: 'Eteneminen ja aikataulu',
      fields: [
        { title: 'Toimisto, uusi k-m2/KUNTA', type: 'number' },
        { title: 'Toimisto,uusi k-m2/VALTIO', type: 'number' },
        { title: 'Toimisto, uusi k-m2/MUUT', type: 'number' },
        { title: 'Liiketila, uusi k-m2/KUNTA', type: 'number' },
        { title: 'Liiketila, uusi k-m2/VALTIO', type: 'number' },
        { title: 'Liiketila, uusi k-m2/MUUT', type: 'number' },
        { title: 'Teollisuus, uusi k-m2/KUNTA', type: 'number' },
        { title: 'Teollisuus, uusi k-m2/VALTIO', type: 'number' },
        { title: 'Teollisuus, uusi k-m2/MUUT', type: 'number' },
        { title: 'Toimitila, yhteensä', type: 'number' },
        { title: 'Julkiset, uusi k-m2/KUNTA', type: 'number' },
        { title: 'Julkiset, uusi k-m2/VALTIO', type: 'number' },
        { title: 'Julkiset, uusi k-m2/MUUT', type: 'number' },
        { title: 'Julkiset, yhteensä', type: 'number' }
      ]
    },
    {
      title: 'Muuta',
      fields: [
        { title: 'hanketyyppi', type: 'text' },
        { title: 'prosessin kokoluokka (XS/S/M/L/XL)', type: 'select', options: ['-', 'XS', 'S', 'M', 'L', 'XL'] },
        { title: 'Kaavan hyväksyjätaho', type: 'select', options: ['-', 'kaupunginvaltuusto', 'kaupunkiympäristölautakunta'] },
        { title: 'priorisointimerkintä', type: 'radio' },
        { title: 'aloituskokous (suunniteltu pvm)', type: 'date' },
        { title: 'kaavahanke viedään johdon käsittelyyn (jos palvelujen välisiä kysymyksiä)', type: 'radio' },
        { title: 'kaavahanke esitellään Pajassa', type: 'radio' },
        { title: 'kaavahanke vaatii ELY-yhteistyötä', type: 'radio' },
        { title: 'viranomaisneuvottelu ELY:n kanssa on tarpeen', type: 'radio' },
        { title: 'kaavahanke viedään päälliköiden Kick off -ryhmään	', type: 'radio' },
        { title: 'Arvioitu ennakkotieto milloin tarkistettu ehdotus Kylk', type: 'date' },
        { title: 'OAS ja luonnos laitetaan yhtä aikaa esille', type: 'radio' },
        { title: 'OAS-vaiheessa tarvitaan keskustelutilaisuus', type: 'radio' },
        { title: 'OAS-vaiheessa tarvitaan lehti-ilmoitus', type: 'radio' },
        { title: 'Vuorovaikutusta on syytä järjestää tavallista enemmän', type: 'radio' },
        { title: 'Alueella on voimassa asemakaava(t) numero(t)', type: 'multiple', options: [1, 2, 3, 4] },
        { title: 'Sisältyykö suunnittelualueeseen kaavoittamatonta aluetta', type: 'radio' },
        { title: 'Arvioitu ennakkotieto milloin OAS esilläolo alkaa', type: 'date' },
        { title: 'OAS-aineiston määräaika, jolloin aineiston tulee olla tarkastettu', type: 'date' },
        { title: 'Asukasmäärän lisäys alueella', type: 'number' },
        { title: 'Ehdotuksen suunniteltu lautakuntapäivämäärä (arvio)', type: 'date' },
        { title: 'Tarkistetun ehdotuksen suunniteltu lautakuntapäivämäärä (arvio)', type: 'date' },
        { title: 'Tarvittava konsulttityö', type: 'textarea' },
        { title: 'Konsulttityön summa / vuosi', type: 'number' }
      ]
    }
  ]
}

const mockPhaseTwo = {
  title: 'OAS',
  sections: [
    {
      title: 'A',
      fields: [
        { title: 'Vireilletulo, kenen aloitteesta', type: 'select', options: ['-', 'Kaupunki', 'Omistaja'], info: 'Kerro aloitteentekijätaho' },
        { title: 'Vireilletulovuosi', type: 'number', info: 'Kerro vuosi (esim. hakemuksen saapuminen tai OAS:n valmistelun aloitus' },
        { title: 'Vuosi jolloin hanke on ollut kaavoituskatsauksessa', type: 'number' },
        { title: 'Kaupungin maanomistus', type: 'text', info: 'Kerro mitkä alueet ovat kaupungin omistuksessa' },
        { title: 'Muu kuin kaupungin maanomistus', type: 'text' },
        { title: 'Maankäyttösopimus', type: 'radio' },
        { title: 'Alueella voimassa olevat asemakaavat ovat saaneet lainvoiman vuosina', type: 'list' },
        { title: 'Voimassa olevien asemakaavojen sisältö: pääkohdat', type: 'textarea' },
        { title: 'Valtakunnalliset alueidenkäyttötavoitteet', type: 'select', options: ['-', 'hupi', 'liikunta'] }
      ]
    },
    {
      title: 'B',
      fields: [
        { title: 'Aluetta koskevat kohteet, joka on Museoviraston inventoinnissa (RKY) sisällytetty valtakunnallisesti merkittävien rakennettujen kulttuuriympäristöjen luetteloon', type: 'textarea' },
        { title: 'Yleiskaava 2002:n aluemerkintä', type: 'text' },
        { title: 'Uuden yleiskaavan aluemerkintä', type: 'text' },
        { title: 'Voimassa oleva rakennuskielto', type: 'list' },
        { title: 'Tehdyt selvitykset', type: 'textarea' },
        { title: 'Kaavan tavoitteet', type: 'textarea' },
        { title: 'Uutta tai siirrettävää infraa', type: 'radio' },
        { title: 'Aloituskokous (toteutunut pvm)', type: 'list' },
        { title: 'Tarvittavat selvitykset (selvitys, resurssit, aikataulu)', type: 'textarea' },
        { title: 'Kaavan yhteydessä laaditaan liikennesuunnitelma', type: 'radio' },
        { title: 'Mihin lehteen OAS-lehti-ilmoitus tulee', type: 'text' },
        { title: 'Hakijalta/hakijoilta perittävä maksu', type: 'number' }
      ]
    },
    {
      title: 'C',
      fields: [
        { title: 'Maankäyttösopimus', type: 'radio' },
        { title: 'Vaikutusten arviointi (suunniteltu)', type: 'textarea' },
        { title: 'Mitkä seurat ja yhdistykset ovat osallisia', type: 'list' },
        { title: 'Mitkä asiantuntijaviranomaiset ovat osallisia', type: 'list' },
        { title: 'OAS-aineiston esilläoloaika alkaa', type: 'date' },
        { title: 'OAS-aineiston esilläoloaika päättyy', type: 'date' },
        { title: 'OAS-aineiston esilläolopaikka', type: 'text' },
        { title: 'Mitä valmisteluaineistoa on esillä OAS:in kanssa', type: 'textarea' },
        { title: 'Pienoismallin tms.esilläolo OAS:n kanssa', type: 'textarea' },
        { title: 'OAS-vaiheen keskustelutilaisuuden (tai muut osallistumistavat) aika ja paikka', type: 'text' },
        { title: 'Erilliset neuvottelut asiantuntijoiden kanssa', type: 'text' },
        { title: 'Onko alueella asunto- tai kiinteistöosakeyhtiöitä', type: 'textarea' },
        { title: 'Milloin viimeistään mielipiteet OAS:sta toimitetaan', type: 'date' },
        { title: 'OAS-numero', type: 'text' },
        { title: 'OAS:n päiväys', type: 'date' },
        { title: 'OAS:n päivityslauseke', type: 'textarea' }
      ]
    }
  ]
}