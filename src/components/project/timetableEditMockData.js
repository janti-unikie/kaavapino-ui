const editDateFieldStart = {
        type: 'date',
        name: 'kaynnistys_deadline',
        label: 'Suunniteltu deadline',
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
    fields: [editDateFieldStart]
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