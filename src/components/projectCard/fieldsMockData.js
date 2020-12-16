export const fieldsMockData = [
    {
        label: 'Kaavaprosessin kokoluokka',
        name: 'kaavaprosessin_kokoluokka',
        display: 'basic'

    },
    {
        label: 'Sitova tavoite',
        name: 'yksikon_sitova_tavoite',
        display: 'basic',
        choices: [
            {
                value: true,
                label: 'Kyllä'
            },
            {
                value: false,
                label: 'Ei'
            },
            {
                value: null,
                label: 'Ei tietoa'
            }
        ]
    },
    {
        label: 'Pinonumero',
        name: 'pinonumero',
        display: 'basic'

    },
    {
        label: 'Hankenumero',
        name: 'hankenumero',
        display: 'basic'

    },
    {
        label: 'Diaarinumero',
        name: 'diaarinumero',
        display: 'basic'

    },
    {
        label: 'Kaavanumero',
        name: 'kaavanumero',
        display: 'basic'
    },
    {
        label: 'Projektityyppi',
        name: 'projektityyppi',
        value: 'asemakaava',
        display: 'basic'
    },

    {
        label: 'Liikennesuunnitelma',
        name: 'kaavan_liikennesuunnitelma',
        choices: [
            {
                label: 'Ei laadita',
                value: 'ei_laadita'
            },
            {
                label: 'laaditaan (A projektiluokka)',
                value: 'laaditaan_a_projektiluokka'
            },
            {
                label: 'laaditaan (B projektiluokka)',
                value: 'laaditaan_b_projektiluokka'
            },
            {
                label: 'laaditaan (C projektiluokka)',
                value: 'laaditaan_c_projektiluokka'
            }
        ],
        display: 'basic'
    },
    {
        label: 'Kaavan hyväksyjätaho',
        name: 'kaavan_hyvaksyjataho',
        display: 'basic'
    }, {
        label: 'Onko kiinteistön maanomistajana Helsingin kaupunki',
        name: 'maanomistus_kaupunki',
        display: 'contract',
        choices: [
            {
                value: true,
                label: 'Kyllä'
            },
            {
                value: false,
                label: 'Ei'
            },
            {
                value: null,
                label: 'Ei tietoa'
            }
        ]
    },
    {
        label: 'Onko kiinteistön maanomistajana valtio',
        name: 'maanomistus_valtio',
        display: 'contract',
        choices: [
            {
                value: true,
                label: 'Kyllä'
            },
            {
                value: false,
                label: 'Ei'
            },
            {
                value: null,
                label: 'Ei tietoa'
            }
        ]
    },
    {
        label: 'Onko kiinteistön maanomistajana yksityinen',
        name: 'maanomistus_yksityinen',
        display: 'contract',
        choices: [
            {
                value: true,
                label: 'Kyllä'
            },
            {
                value: false,
                label: 'Ei'
            },
            {
                value: null,
                label: 'Ei tietoa'
            }
        ]
    },
    {
        label: 'Maankäyttösopimuksen tarve on arvioitava',
        name: 'maankayttosopimus_tarve',
        display: 'contract',
        choices: [
            {
                value: true,
                label: 'Kyllä'
            },
            {
                value: false,
                label: 'Ei'
            },
            {
                value: null,
                label: 'Ei tietoa'
            }
        ]
    },
    {
        label: 'Maankäyttösopimusmenettely',
        name: 'maankayttosopimus_menettely',
        display: 'contract',
        choices: [
            {
              label: 'Ei tarvita',
              value: 'ei_tarvita'
            },
            {
              label: 'Tarvitaan (ei valmis)',
              value: 'tarvitaan_ei_valmis'
            },
            {
              label: 'Tarvitaan (esisopimus tehty)',
              value: 'tarvitaan_esisopimus_tehty'
            },
            {
              label: 'Tarvitaan (sopimus allekirjoitettu)',
              value: 'tarvitaan_sopimus_allekirjoitettu'
            }
          ]
    },
    {
        label: 'Strategiakytkentä',
        name: 'strategiset_tavoitteet_17_21',
        display: 'strategy',
        choices: [
            {
              label: '1.1 Asuntotuotannon edistäminen',
              value: '11_asuntotuotannon_edistaminen'
            },
            {
              label: '1.2 Liikkumisen sujuvuus ja kestävät kulkumuodot',
              value: '12_liikkumisen_sujuvuus_ja_kestavat_kulkumuodot'
            },
            {
              label: '1.3 Keskustan elinvoimaisuuden kehittäminen',
              value: '13_keskustan_elinvoimaisuuden_kehittaminen'
            },
            {
              label: '1.4 Moderni ilmastovastuu',
              value: '14_moderni_ilmastovastuu'
            },
            {
              label: '1.5 Elävät, omaleimaiset ja turvalliset kaupunginosat',
              value: '15_elavat_omaleimaiset_ja_turvalliset_kaupungi8b14'
            },
            {
              label: '1.6 Segregaation ehkäisy',
              value: '16_segregaation_ehkaisy'
            },
            {
              label: '2.1 Monipuoliset sijaintipaikat yrityksille',
              value: '21_monipuoliset_sijaintipaikat_yrityksille'
            },
            {
              label: '2.2 Kumppanuus ja osallisuus toimintatapana vahvistuvat',
              value: '22_kumppanuus_ja_osallisuus_toimintatapana_vah0cb8'
            },
            {
              label: '2.3 Hallitusti nopeampaan ja ketterämpään toimintakulttuuriin',
              value: '23_hallitusti_nopeampaan_ja_ketterampaan_toimib9d7'
            },
            {
              label: '2.5 Palveluita uudistetaan asukaslähtöisesti',
              value: '25_palveluita_uudistetaan_asukaslahtoisesti'
            },
            {
              label: '3.1 Omaisuudenhallintaa toteutetaan elinkaaritaloudellisesti',
              value: '31_omaisuudenhallintaa_toteutetaan_elinkaarita50a6'
            },
            {
              label: '3.2 Investointien vaikuttavuus ja oikea-aikaisuus',
              value: '32_investointien_vaikuttavuus_ja_oikea_aikaisuus'
            },
            {
              label: '3.3 Tuottavuuden parantaminen',
              value: '33_tuottavuuden_parantaminen'
            },
            {
              label: '3.4 Kiinteistökannan laadun parantaminen',
              value: '34_kiinteistokannan_laadun_parantaminen'
            },
            {
              label: '4.1 Vahvistetaan kaupungin asemaa metropolialueena',
              value: '41_vahvistetaan_kaupungin_asemaa_metropolialueena'
            }
          ]
    },
    {
        label: 'Asuminen, yhteensä',
        name: 'asuminen_yhteensa',
        display: 'floor-area-information',
        unit: 'k-m2'
    },
    {
        label: 'Toimitila, yhteensä',
        name: 'toimitila_yhteensa',
        display: 'floor-area-information',
        unit: 'k-m2'
    },
    {
        label: 'Julkiset, yhteensä',
        name: 'julkiset_yhteensa',
        display: 'floor-area-information',
        unit: 'k-m2'
    },
    {
        label: 'Muut, yhteensä',
        name: 'muut_yhteensa',
        display: 'floor-area-information',
        unit: 'k-m2'
    },

    {
        label: 'Suunnittelualueen kuvaus',
        name: 'suunnittelualueen_kuvaus',
        display: 'description'
    }

]