const editDateFieldStart = {
        type: 'date',
        name: 'kaynnistys_deadline',
        label: 'Suunniteltu deadline',
        help_text: 'Nam sed sapien vitae ex tempus vestibulum ut et massa.'
}
const editDateFieldCheckbox = {
        type: 'checkbox',
        name: 'vahvistus_start',
        label: 'Vahvista aikataulu',
        help_text: 'Nam sed sapien vitae ex tempus vestibulum ut et massa.'
}
const editDateFieldPrinciple = {
    type: 'date',
    name: 'principle_deadline',
    label: 'Suunniteltu deadline',
    help_text: 'Nam sed sapien vitae ex tempus vestibulum ut et massa.'
}
const editDateFieldOas= {
    type: 'date',
    name: 'oas_deadline',
    label: 'Suunniteltu deadline',
    help_text: 'Nam sed sapien vitae ex tempus vestibulum ut et massa.'
}
const editDateFieldProposition = {
    type: 'date',
    name: 'proposition_deadline',
    label: 'Suunniteltu deadline',
    help_text: 'Nam sed sapien vitae ex tempus vestibulum ut et massa.'
}
const editDateFieldCheckProposition = {
    type: 'date',
    name: 'checkproposition_deadline',
    label: 'Suunniteltu deadline',
    help_text: 'Nam sed sapien vitae ex tempus vestibulum ut et massa.'
}
const editDateFieldAcceptance = {
    type: 'date',
    name: 'acceptance_deadline',
    label: 'Suunniteltu deadline',
    help_text: 'Nam sed sapien vitae ex tempus vestibulum ut et massa.'
}
const editDateFieldInception = {
    type: 'date',
    name: 'inception_deadline',
    label: 'Suunniteltu deadline',
    help_text: 'Nam sed sapien vitae ex tempus vestibulum ut et massa.'
}

const start = {
    title: 'Käynnistys',
    fields: [editDateFieldStart, editDateFieldCheckbox]
}
const principle = {
    title: 'Periaatteet',
    fields: [editDateFieldPrinciple]
}
const oas = {
    title: 'OAS',
    fields: [editDateFieldOas]
}
const proposition = {
    title: 'Ehdotus',
    fields: [editDateFieldProposition]
}
const checkProposition = {
    title: 'Tarkastettu ehdotus',
    fields: [editDateFieldCheckProposition]
}
const acceptance = {
    title: 'Hyväksyminen',
    fields: [editDateFieldAcceptance]
}
const inception = {
    title: 'Voimaantulo',
    fields: [editDateFieldInception]
}

const projectTimetableEditSectionsMock = [start, principle, oas, proposition, checkProposition, acceptance, inception]

export default projectTimetableEditSectionsMock

export const deadlines = { deadline_sections: [
    {
        'id': 1,
        'title': 'Käynnistys',
        'color': '#02d7a7',
        'color_code': '#02d7a7',
        'list_prefix': '1',
        'sections': [
            {
                'name': '1. Käynnistys',
                'attributes': [
                    {
                        'label': 'Kylk:in hyväksymispäätöksen päivämäärä',
                        'name': 'kylk_hyvaksymispaatos_pvm',
                        'help_text': 'Pääkäyttäjä merkitsee päivämäärän sen jälkeen kun lautakunta on tehnyt päätöksen. Tieto siirtyy projektikorttiin, kaavaselostukseen ja kaavan tietomalliin.',
                        'help_link': null,
                        'multiple_choice': false,
                        'character_limit': null,
                        'fieldset_attributes': [],
                        'fieldset_index': null,
                        'type': 'date',
                        'required': false,
                        'choices': null,
                        'generated': false,
                        'unit': null,
                        'calculations': null,
                        'visibility_conditions': [],
                        'autofill_rule': null,
                        'autofill_readonly': null,
                        'updates_autofill': false,
                        'related_fields': [],
                        'searchable': false,
                        'highlight_group': 'Pääkäyttäjät',
                        'display': null
                    }
                ]
            }
        ]
    }, {
    'id': 2,
        'title': 'OAS',
        'color': '#03d7a7',
        'color_code': '#03d7a7',
        'list_prefix': '2',
        'sections': [
            {
                'name': '2. OAS',
                'attributes': [
                    {
                        'label': 'Kylk:in hyväksymispäätöksen päivämäärä',
                        'name': 'kylk_hyvaksymispaatos_pvm',
                        'help_text': 'Pääkäyttäjä merkitsee päivämäärän sen jälkeen kun lautakunta on tehnyt päätöksen. Tieto siirtyy projektikorttiin, kaavaselostukseen ja kaavan tietomalliin.',
                        'help_link': null,
                        'multiple_choice': false,
                        'character_limit': null,
                        'fieldset_attributes': [],
                        'fieldset_index': null,
                        'type': 'date',
                        'required': false,
                        'choices': null,
                        'generated': false,
                        'unit': null,
                        'calculations': null,
                        'visibility_conditions': [],
                        'autofill_rule': null,
                        'autofill_readonly': null,
                        'updates_autofill': false,
                        'related_fields': [],
                        'searchable': false,
                        'highlight_group': 'Pääkäyttäjät',
                        'display': null
                    },
                    {
                        'label': 'Kylk:in hyväksymispäätöksen päivämäärä',
                        'name': 'kylk_hyvaksymispaatos_pvm',
                        'help_text': 'Pääkäyttäjä merkitsee päivämäärän sen jälkeen kun lautakunta on tehnyt päätöksen. Tieto siirtyy projektikorttiin, kaavaselostukseen ja kaavan tietomalliin.',
                        'help_link': null,
                        'multiple_choice': false,
                        'character_limit': null,
                        'fieldset_attributes': [],
                        'fieldset_index': null,
                        'type': 'checkbox',
                        'required': false,
                        'choices': null,
                        'generated': false,
                        'unit': null,
                        'calculations': null,
                        'visibility_conditions': [],
                        'autofill_rule': null,
                        'autofill_readonly': null,
                        'updates_autofill': false,
                        'related_fields': [],
                        'searchable': false,
                        'highlight_group': 'Pääkäyttäjät',
                        'display': null
                    }
                ]
            }
        ]
    },
    {
        'id': 3,
            'title': 'Ehdotus',
            'color': '#03d7a7',
            'color_code': '#03d7a7',
            'list_prefix': '3',
            'sections': [
                {
                    'name': '3. Ehdotus',
                    'attributes': [
                        {
                            'label': 'Ehdotus päivämäärä',
                            'name': 'kylk_hyvaksymispaatos_pvm',
                            'help_text': 'Pääkäyttäjä merkitsee päivämäärän sen jälkeen kun lautakunta on tehnyt päätöksen. Tieto siirtyy projektikorttiin, kaavaselostukseen ja kaavan tietomalliin.',
                            'help_link': null,
                            'multiple_choice': false,
                            'character_limit': null,
                            'fieldset_attributes': [],
                            'fieldset_index': null,
                            'type': 'date',
                            'required': false,
                            'choices': null,
                            'generated': false,
                            'unit': null,
                            'calculations': null,
                            'visibility_conditions': [],
                            'autofill_rule': null,
                            'autofill_readonly': null,
                            'updates_autofill': false,
                            'related_fields': [],
                            'searchable': false,
                            'highlight_group': 'Pääkäyttäjät',
                            'display': null
                        },
                        {
                            'label': 'Kylk:in hyväksymispäätöksen päivämäärä',
                            'name': 'kylk_hyvaksymispaatos_pvm',
                            'help_text': 'Pääkäyttäjä merkitsee päivämäärän sen jälkeen kun lautakunta on tehnyt päätöksen. Tieto siirtyy projektikorttiin, kaavaselostukseen ja kaavan tietomalliin.',
                            'help_link': null,
                            'multiple_choice': false,
                            'character_limit': null,
                            'fieldset_attributes': [],
                            'fieldset_index': null,
                            'type': 'checkbox',
                            'required': false,
                            'choices': null,
                            'generated': false,
                            'unit': null,
                            'calculations': null,
                            'visibility_conditions': [],
                            'autofill_rule': null,
                            'autofill_readonly': null,
                            'updates_autofill': false,
                            'related_fields': [],
                            'searchable': false,
                            'highlight_group': 'Pääkäyttäjät',
                            'display': null
                        }
                    ]
                }
            ]
        }

]

    }