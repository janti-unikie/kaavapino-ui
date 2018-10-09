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
  'Essi Esimerkki',
  'Pentti Juusonen',
  'Sirpa Siilinen',
  'Juuso Juusonen'
]

const mockPhaseOne = {
  title: 'KÄYNNISTYS',
  sections: [
    {
      title: 'Kaavahankkeen perustietoja',
      fields: [
        { title: 'Kaavahankkeen nimi', type: 'text', info: 'Anna kaavahankkeelle lyhyt ja selkeä nimi. Nimenä voi käyttää osoitetta, älä käytä korttelinumeroita' },
        { title: 'Prosessin kokoluokka (XS/S/M/L/XL)', type: 'select', options: ['XS', 'S', 'M', 'L', 'XL'], info: 'Valitse prosessi yksikön/tiimin päällikön kanssa. Katso ohje.' },
        { title: 'Diaarinumero', type: 'text', info: 'Katso Ahjosta' },
        { title: 'Hankenumero', type: 'text', info: 'Merkitse PW:n hankenumero' },
        { title: 'Mitä kaupunginosaa kaavahanke koskee', type: 'select', options: ['Vuosaari', 'Katajanokka', 'Hakaniemi'], info: 'Valitse kaupunginosat alasvetovalikosta' },
        { title: 'Hanke näkyy raportoinnissa', type: 'radio', info: 'Oletuksena on Kyllä. Jos hanke on epävarma, vaihda tähän EI.' }
      ]
    },
    {
      title: 'Suunnittelun tavoitteet ja alue',
      fields: [
        { title: 'Suunnittelualueen kuvaus', type: 'textarea', info: 'Laadi lyhyt ja selkeä hankekuvausteksti kuntalaisia ja ylintä johtoa varten' },
        // { title: 'Suunnittelualueen rajaus', type: 'image', info: 'Lataa tähän rajaus (dgn)' },
        { title: 'Alueella on voimassa asemakaava(t) numero(t)', type: 'textarea' },
        { title: 'Hanketyyppi', type: 'text' },
        { title: 'Sisältyykö suunnittelualueeseen kaavoittamatonta aluetta', type: 'radio' },
        { title: 'Asukasmäärän lisäys alueella', type: 'number' },
        { title: 'Kaavan tavoitteet', type: 'textarea', info: 'Kuvaile kaavan tarkoitus ja tavoitteet. Kuvaile selkeästi ja havainnollisesti, mihin suunnitellaan mitäkin. Perustele tarvittaessa mihin tavoitteet pohjautuvat.' },
        { title: 'Strategiakytkentä', type: 'multiple',options: ['A', 'B', 'C'], info: 'Valitse alasvetovalikosta 1-3 tavoitetta, joita hanke toteuttaa' }
      ]
    },
    {
      title: 'Hakemuksen tiedot',
      fields: [
        { title: 'Hakemuksen saapumispäivämäärä', type: 'date', info: 'Katso hakemus Ahjosta' },
        { title: 'Mitä haetaan, hakemuksessa (1…n) esitetyt perustelut', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' }
      ]
    },
    {
      title: 'Hakijan tiedot',
      fields: [
        { title: 'Hakijan (1…n) nimi', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' },
        { title: 'Hakijan (1…n) osoite', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' },
        { title: 'Hakijan (1…n) tontti (korttelinro/tonttitonttinro)', type: 'multiple', options: exampleNames, info: 'Katso hakemus Ahjosta' }
      ]
    },
    {
      title: 'Vastuuhenkilöiden ja hyväksyjätahon tiedot',
      fields: [
        { title: 'Vastuuhenkilö', type: 'select', options: exampleNames, info: 'Valitse listasta oma nimesi' },
        { title: 'Vastuuyksikkö', type: 'select', options: ['Yksikkö 1', 'Yksikkö 2'], info: 'Valitse listasta yksikkö, joka vastaa hankkeesta' },
        { title: 'Suunnitteluavustajan nimi', type: 'select', options: exampleNames, info: 'Valitse listasta' },
        { title: 'Kaavan hyväksyjätaho', type: 'select', options: ['kaupunginvaltuusto', 'kaupunkiympäristölautakunta'] }
      ]
    },
    {
      title: 'Mitoitus, k-m2',
      fields: [
        { title: 'Asuminen, kerrostalo, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee kaupungin maalle kerrostaloihin' },
        { title: 'Asuminen, kerrostalo, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee valtion maalle kerrostaloihin' },
        { title: 'Asuminen, kerrostalo, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee yksityiselle maalle kerrostaloihin' },
        { title: 'Asuminen, pientalo, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee kaupungin maalle pientaloihin' },
        { title: 'Asuminen, pientalo, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee valtion maalle pientaloihin' },
        { title: 'Asuminen, pientalo, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta asuinkerrosalaa tulee yksityiselle maalle pientaloihin' },
        { title: 'Asuminen, yhteensä', type: 'number' },
        { title: 'Toimisto, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta toimistotilaa tulee kaupungin maalle.' },
        { title: 'Toimisto,uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta toimistotilaa tulee valtion maalle.' },
        { title: 'Toimisto, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta toimistotilaa tulee yksityiselle maalle.' },
        { title: 'Liiketila, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta liiketilaa tulee kaupungin maalle.' },
        { title: 'Liiketila, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta liiketilaa tulee valtion maalle.' },
        { title: 'Liiketila, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta liiketilaa tulee yksityiselle maalle.' },
        { title: 'Teollisuus, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uutta teollisuustilaa tulee kaupungin maalle kerrostaloihin.' },
        { title: 'Teollisuus, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uutta teollisuustilaa tulee valtion maalle.' },
        { title: 'Teollisuus, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uutta teollisuustilaa tulee kaupungin maalle kerrostaloihin.' },
        { title: 'Toimitila, yhteensä', type: 'number' },
        { title: 'Julkiset, uusi k-m2/KUNTA', type: 'number', info: 'Arvioi alustavasti paljonko uusia julkisia tiloja tulee kaupungin maalle kerrostaloihin.' },
        { title: 'Julkiset, uusi k-m2/VALTIO', type: 'number', info: 'Arvioi alustavasti paljonko uusia julkisia tiloja tulee valtion maalle.' },
        { title: 'Julkiset, uusi k-m2/MUUT', type: 'number', info: 'Arvioi alustavasti paljonko uusia julkisia tiloja tulee yksityiselle maalle.' },
        { title: 'Julkiset, yhteensä', type: 'number' }
      ]
    },
    {
      title: 'Eteneminen, aikataulu, osallistuminen, esittelyt, ELY-yhteistyö ja esillelaitto',
      fields: [
        { title: 'Aloituskokous (suunniteltu pvm)', type: 'date', info: 'Arvioi alustavasti aloituskokouspäivä.' },
        { title: 'Kaavahanke viedään johdon käsittelyyn (jos palvelujen välisiä kysymyksiä)', type: 'radio' },
        { title: 'Kaavahanke esitellään Pajassa', type: 'radio' },
        { title: 'Kaavahanke vaatii ELY-yhteistyötä', type: 'radio' },
        { title: 'Viranomaisneuvottelu ELY:n kanssa on tarpeen', type: 'radio' },
        { title: 'Kaavahanke viedään päälliköiden Kick off -ryhmään ', type: 'radio' },
        { title: 'Arvioitu ennakkotieto milloin tarkistettu ehdotus Kylk', type: 'date' },
        { title: 'OAS ja luonnos laitetaan yhtä aikaa esille', type: 'radio' },
        { title: 'OAS-vaiheessa tarvitaan keskustelutilaisuus', type: 'radio' },
        { title: 'OAS-vaiheessa tarvitaan lehti-ilmoitus', type: 'radio' },
        { title: 'Vuorovaikutusta on syytä järjestää tavallista enemmän', type: 'radio' },
        { title: 'Arvioitu ennakkotieto milloin OAS esilläolo alkaa', type: 'date', info: 'Arvioi alustavasti milloin OAS on esillä.' },
        { title: 'OAS-aineiston määräaika, jolloin aineiston tulee olla tarkastettu', type: 'date' },
        { title: 'Ehdotuksen suunniteltu lautakuntapäivämäärä (arvio)', type: 'date', info: 'Arvioi alustavasti lautakuntapäivä.' },
        { title: 'Tarkistetun ehdotuksen suunniteltu lautakuntapäivämäärä (arvio)', type: 'date', info: 'Arvioi alustavasti lautakuntapäivä.' }
      ]
    },
    {
      title: 'Lisätiedot suunnittelijoilta',
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
        { title: 'Hakijan suunnittelijan nimi, konsultit, muut yhteistyötahot', type: 'text', info: 'Kerro tiedot' }
      ]
    },
    {
      title: 'Konsulttityö',
      fields: [
        { title: 'Tarvittava konsulttityö', type: 'textarea' },
        { title: 'Konsulttityön summa / vuosi', type: 'number' }
      ]
    },
    {
      title: 'Muuta',
      fields: [
        { title: 'Priorisointimerkintä', type: 'radio', info: 'Merkitään tarvittaessa.' }
      ]
    }
  ]
}

const mockPhaseTwo = {
  title: 'Osallistumis- ja arviointisuunnitelma (OAS)',
  sections: [
    {
      title: 'Vireilletulo, eteneminen ja aikataulut',
      fields: [
        { title: 'Vireilletulo, kenen aloitteesta', type: 'select', options: ['Kaupunki', 'Omistaja'], info: 'Kerro aloitteentekijätaho' },
        { title: 'Vireilletulovuosi', type: 'number', info: 'Kerro vuosi (esim. hakemuksen saapuminen tai OAS:n valmistelun aloitus' },
        { title: 'Aloituskokous (toteutunut pvm)', type: 'list', info: 'Merkitse toteutunut pvm.' },
        { title: 'Tehdyt selvitykset', type: 'textarea', info: 'Kerro tehdyt selvitykset, jotka ovat oleellisia hankkeessasi.' },
        { title: 'Tarvittavat selvitykset (selvitys, resurssit, aikataulu)', type: 'textarea', info: 'Luettele tarvittavat selvitykset, kuka ne tekee ja mihin mennessä.' }
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
        { title: 'Pienoismallin tms.esilläolo OAS:n kanssa', type: 'textarea', info: 'Kerro jos jotakin aineistoa, kuten pienoismalli, on esillä vain tietyssä paikassa esim. kirjastossa.' },
        { title: 'Erilliset neuvottelut asiantuntijoiden kanssa', type: 'text', info: 'Poista lause, jos tiedät ettei neuvottelulle ole tarvetta.' },
        { title: 'Milloin viimeistään mielipiteet OAS:sta toimitetaan', type: 'date' }
      ]
    },
    {
      title: 'Osalliset',
      fields: [
        { title: 'Mitkä seurat ja yhdistykset ovat osallisia', type: 'list', info: 'Luettele alueen asukasyhdistykset ja muut asiaan liittyvät seurat ja -yhdistykset. Helsingin Yrittäjät mainitaan aina tässä luettelossa.' },
        { title: 'Mitkä asiantuntijaviranomaiset ovat osallisia', type: 'list', info: 'Luettele hankkeessasi tarvittavat tahot nimeltä tässä järjestyksessä: ensin kaupungin ulkopuoliset viranomaiset sitten kaupungin toimialat.' }
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
        { title: 'Kaupungin maanomistus', type: 'text', info: 'Kerro mitkä alueet ovat kaupungin omistuksessa' },
        { title: 'Muu kuin kaupungin maanomistus', type: 'text', info: 'Kerro mitkä alueet ovat yksityisomistuksessa' },
        { title: 'Maankäyttösopimus', type: 'radio' },
        { title: 'Vuosi jolloin hanke on ollut kaavoituskatsauksessa', type: 'number', info: 'Kerro vuosi.' },
        { title: 'Alueella voimassa olevat asemakaavat ovat saaneet lainvoiman vuosina', type: 'list', info: 'Kerro voimassa olevien asemakaavojen vuosiluvut.' },
        { title: 'Voimassa olevien asemakaavojen sisältö: pääkohdat', type: 'textarea', info: 'Kerro voimassa olevien asemakaavojen pääkohdat (esim. käyttötarkoitus) lyhyesti. Kaavanumeroita ei tarvita.' },
        { title: 'Valtakunnalliset alueidenkäyttötavoitteet', type: 'select', options: ['hupi', 'liikunta'], info: 'Valitse luettelosta vain olennaiset tavoitteet, jotka koskevat kaavahankettasi.' },
        { title: 'Aluetta koskevat kohteet, joka on Museoviraston inventoinnissa (RKY) sisällytetty valtakunnallisesti merkittävien rakennettujen kulttuuriympäristöjen luetteloon', type: 'textarea', info: 'Kerro lyhyesti, vain tarvittaessa.' },
        { title: 'Yleiskaava 2002:n aluemerkintä', type: 'text', info: 'Kerro lyhyesti, vain tarvittaessa.' },
        { title: 'Uuden yleiskaavan aluemerkintä', type: 'text', info: 'Kerro lyhyesti, vain tarvittaessa.' },
        { title: 'Voimassa oleva rakennuskielto', type: 'list', info: 'Kerro voimassa olevasta rakennuskiellosta.' },
        { title: 'Muut suunnitelmat ja päätökset', type: 'textarea', info: 'Kerro muut suunnitelmat ja päätökset, jotka ovat oleellisia hankkeessasi.' },
        { title: 'Uutta tai siirrettävää infraa', type: 'radio', info: 'Valitse kyllä, jos kaava-alueeseen sisältyy merkittävää uutta tai siirrettävää infraa.' },
        { title: 'Kaavan yhteydessä laaditaan liikennesuunnitelma', type: 'radio' },
        { title: 'Mihin lehteen OAS-lehti-ilmoitus tulee', type: 'text' },
        { title: 'Hakijalta/hakijoilta perittävä maksu', type: 'number' },
        { title: 'Onko alueella asunto- tai kiinteistöosakeyhtiöitä', type: 'textarea' }
      ]
    },
    {
      title: 'Kaavoitussihteeri täyttää',
      fields: [
        { title: 'OAS-numero', type: 'text', info: 'Kaavoitussihteeri merkitsee päivämäärän ja OAS-numeron.' },
        { title: 'OAS:n päiväys', type: 'date', info: 'Kaavoitussihteeri merkitsee päivämäärän ja OAS-numeron.' }
      ]
    },
    {
      title: 'OAS:n päivityslauseke',
      fields: [
        { title: 'OAS:n päivityslauseke', type: 'textarea' }
      ]
    }
  ]
}