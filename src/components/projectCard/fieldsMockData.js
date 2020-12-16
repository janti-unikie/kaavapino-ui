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
    },

    {
        label: 'Suunnittelualueen kuvaus',
        name: 'suunnittelualueen_kuvaus',
        display: 'description'
    }

]