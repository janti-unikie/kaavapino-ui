import { getFieldAutofillValue } from '../../../utils/projectAutofillUtils'
describe('Autofill tests', () => {

  it('Autofill rule succeeds (string)', () => {
    const field = {}
    const conditionObject = {}
    conditionObject.variable = 'a'
    conditionObject.operator = '=='
    conditionObject.comparison_value = 'testitulos'
    conditionObject.comparison_value_type = 'string'

    const condition = { condition: conditionObject, then_branch : 'uusitulos' }
    field.autofill_rule =[condition]

    const formValues = {
      a: 'testitulos'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe('uusitulos')
  })
  it('Autofill rule not succeeds (string)', () => {
    const field = {}
    const conditionObject = {}
    conditionObject.variable = 'a'
    conditionObject.operator = '=='
    conditionObject.comparison_value = 'testjotain'
    conditionObject.comparison_value_type = 'string'

    const condition = { condition: conditionObject, then_branch : 'uusitulos' }
    field.autofill_rule =[condition]

    const formValues = {
      a: 'testitulos'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(undefined)
  })
  it('Autofill rule succeeds (boolean)', () => {
    const field = {}
    const conditionObject = {}
    conditionObject.variable = 'a'
    conditionObject.operator = '=='
    conditionObject.comparison_value = true
    conditionObject.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject, then_branch : 'True' }
    field.autofill_rule =[condition]

    const formValues = {
      a: true
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(true)
  })
  it('Autofill rule not succeeds (boolean)', () => {
    const field = {}
    const conditionObject = {}
    conditionObject.variable = 'a'
    conditionObject.operator = '=='
    conditionObject.comparison_value = true
    conditionObject.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject, then_branch : 'True' }
    field.autofill_rule = [condition]

    const formValues = {
      a: false
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(undefined)
  })
  it('Autofill rule succeeds (boolean)', () => {
    const field = {}
    const conditionObject = {}
    conditionObject.variable = 'a'
    conditionObject.operator = '!='
    conditionObject.comparison_value = true
    conditionObject.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject, then_branch : 'True' }
    field.autofill_rule =[condition]

    const formValues = {
      a: true
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(undefined)
  })
  it('Autofill rule not succeeds (boolean)', () => {
    const field = {}
    const conditionObject = {}
    conditionObject.variable = 'a'
    conditionObject.operator = '!='
    conditionObject.comparison_value = true
    conditionObject.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject, then_branch : 'True' }
    field.autofill_rule = [condition]

    const formValues = {
      a: false
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(true)
  })
 it('Autofill rule succeeds multiple (string)', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'yksikon_johtaja'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = 'Mikko'
    conditionObject1.comparison_value_type = 'string'

    const conditionObject2 = {}
    conditionObject2.variable = 'yksikon_johtaja'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = 'Jaakko'
    conditionObject2.comparison_value_type = 'string'

    const conditionObject3 = {}
    conditionObject3.variable = 'yksikon_johtaja'
    conditionObject3.operator = '=='
    conditionObject3.comparison_value = 'Ville'
    conditionObject3.comparison_value_type = 'string'

    const condition = { condition: conditionObject1, then_branch : 'Eteläinen' }
    const condition2 = { condition: conditionObject2, then_branch : 'Pohjoinen' }
    const condition3 = { condition: conditionObject3, then_branch : 'Itäinen' }

    field.autofill_rule =[condition, condition2, condition3]

    const formValues = {
      yksikon_johtaja: 'Jaakko'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe('Pohjoinen')
  })
  it('Autofill rule succeeds multiple (string)', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'yksikon_johtaja'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = 'Mikko'
    conditionObject1.comparison_value_type = 'string'

    const conditionObject2 = {}
    conditionObject2.variable = 'yksikon_johtaja'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = 'Jaakko'
    conditionObject2.comparison_value_type = 'string'

    const conditionObject3 = {}
    conditionObject3.variable = 'yksikon_johtaja'
    conditionObject3.operator = '=='
    conditionObject3.comparison_value = 'Ville'
    conditionObject3.comparison_value_type = 'string'

    const condition = { condition: conditionObject1, then_branch : 'Eteläinen' }
    const condition2 = { condition: conditionObject2, then_branch : 'Pohjoinen' }
    const condition3 = { condition: conditionObject3, then_branch : 'Itäinen' }

    field.autofill_rule =[condition, condition2, condition3]

    const formValues = {
      yksikon_johtaja: 'Ville'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe('Itäinen')
  })
  it('Autofill rule not succeeds multiple (string)', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'yksikon_johtaja'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = 'Mikko'
    conditionObject1.comparison_value_type = 'string'

    const conditionObject2 = {}
    conditionObject2.variable = 'yksikon_johtaja'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = 'Jaakko'
    conditionObject2.comparison_value_type = 'string'

    const conditionObject3 = {}
    conditionObject3.variable = 'yksikon_johtaja'
    conditionObject3.operator = '=='
    conditionObject3.comparison_value = 'Ville'
    conditionObject3.comparison_value_type = 'string'

    const condition = { condition: conditionObject1, then_branch : 'Eteläinen' }
    const condition2 = { condition: conditionObject2, then_branch : 'Pohjoinen' }
    const condition3 = { condition: conditionObject3, then_branch : 'Itäinen' }

    field.autofill_rule =[condition, condition2, condition3]

    const formValues = {
      yksikon_johtaja: 'Kalevi'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(undefined)
  })
  it('Autofill rule succeeds multiple (string)', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'vastuuyksikko'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = 'Läntinen alueyksikkö'
    conditionObject1.comparison_value_type = 'string'

    const conditionObject2 = {}
    conditionObject2.variable = 'vastuuyksikko'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = 'Koivusaari-Lauttasaari'
    conditionObject2.comparison_value_type = 'string'

    const conditionObject3 = {}
    conditionObject3.variable = 'vastuuyksikko'
    conditionObject3.operator = '=='
    conditionObject3.comparison_value = 'Kaarela-Vihdintie'
    conditionObject3.comparison_value_type = 'string'

    const conditionObject4 = {}
    conditionObject4.variable = 'vastuuyksikko'
    conditionObject4.operator = '=='
    conditionObject4.comparison_value = 'Pohjoinen alueyksikko'
    conditionObject4.comparison_value_type = 'string'

    const condition = { condition: conditionObject1, then_branch : 'Tuomas Eskola' }
    const condition2 = { condition: conditionObject2, then_branch : 'Mikko Reinikainen' }
    const condition3 = { condition: conditionObject3, then_branch : 'Suvi Tyynilä' }
    const condition4 = { condition: conditionObject4, then_branch : 'Antti Varkemaa' }

    field.autofill_rule =[condition, condition2, condition3, condition4]

    const formValues = {
      vastuuyksikko: 'Kaarela-Vihdintie'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe('Suvi Tyynilä')
  })
  it('Autofill rule succeeds multiple not found (string)', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'vastuuyksikko'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = 'Läntinen alueyksikkö'
    conditionObject1.comparison_value_type = 'string'

    const conditionObject2 = {}
    conditionObject2.variable = 'vastuuyksikko'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = 'Koivusaari-Lauttasaari'
    conditionObject2.comparison_value_type = 'string'

    const conditionObject3 = {}
    conditionObject3.variable = 'vastuuyksikko'
    conditionObject3.operator = '=='
    conditionObject3.comparison_value = 'Kaarela-Vihdintie'
    conditionObject3.comparison_value_type = 'string'

    const conditionObject4 = {}
    conditionObject4.variable = 'vastuuyksikko'
    conditionObject4.operator = '=='
    conditionObject4.comparison_value = 'Pohjoinen alueyksikko'
    conditionObject4.comparison_value_type = 'string'

    const condition = { condition: conditionObject1, then_branch : 'Tuomas Eskola' }
    const condition2 = { condition: conditionObject2, then_branch : 'Mikko Reinikainen' }
    const condition3 = { condition: conditionObject3, then_branch : 'Suvi Tyynilä' }
    const condition4 = { condition: conditionObject4, then_branch : 'Antti Varkemaa' }

    field.autofill_rule =[condition, condition2, condition3, condition4]

    const formValues = {
      vastuuyksikko: 'Eteläinen yksikkö'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(undefined)
  })
  it('Autofill rule succeeds (list)', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'vastuuyksikko'
    conditionObject1.operator = 'in'
    conditionObject1.comparison_value = ['eka', 'toka', 'kolmas']
    conditionObject1.comparison_value_type = 'list<string>'

    const condition = { condition: conditionObject1, then_branch : 'loytyy_listasta' }

    field.autofill_rule =[condition]

    const formValues = {
      vastuuyksikko: 'toka'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe('loytyy_listasta')
  })
  it('Autofill rule not succeeds (list)', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'vastuuyksikko'
    conditionObject1.operator = 'in'
    conditionObject1.comparison_value = ['eka', 'toka', 'kolmas']
    conditionObject1.comparison_value_type = 'list<string>'

    const condition = { condition: conditionObject1, then_branch : 'loytyy_listasta' }

    field.autofill_rule =[condition]

    const formValues = {
      vastuuyksikko: 'neljäs'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(undefined)
  })
  it('Autofill rule succeeds combine rule (boolean)', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'sisaltyyko_kaavoittamatonta'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = true
    conditionObject1.comparison_value_type = 'boolean'

    const conditionObject2 = {}
    conditionObject2.variable = 'sisaltyyko_kaavoitettua'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = true
    conditionObject2.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject1, then_branch : 'asemakaava ja' }
    const condition2 = { condition: conditionObject2, then_branch : 'asemakaavan muuttaminen' }

    field.autofill_rule =[condition, condition2]

    const formValues = {
      sisaltyyko_kaavoittamatonta: true,
      sisaltyyko_kaavoitettua: false
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(' asemakaava ja')
  })
  it('Autofill rule combine rule (boolean) 2', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'sisaltyyko_kaavoittamatonta'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = true
    conditionObject1.comparison_value_type = 'boolean'

    const conditionObject2 = {}
    conditionObject2.variable = 'sisaltyyko_kaavoitettua'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = true
    conditionObject2.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject1, then_branch : 'asemakaava ja' }
    const condition2 = { condition: conditionObject2, then_branch : 'asemakaavan muuttaminen' }

    field.autofill_rule =[condition, condition2]

    const formValues = {
      sisaltyyko_kaavoittamatonta: false,
      sisaltyyko_kaavoitettua: true
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(' asemakaavan muuttaminen')
  })
  it('Autofill rule succeeds combine rule (boolean) 3', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'sisaltyyko_kaavoittamatonta'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = true
    conditionObject1.comparison_value_type = 'boolean'

    const conditionObject2 = {}
    conditionObject2.variable = 'sisaltyyko_kaavoitettua'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = true
    conditionObject2.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject1, then_branch : 'asemakaava ja' }
    const condition2 = { condition: conditionObject2, then_branch : 'asemakaavan muuttaminen' }

    field.autofill_rule =[condition, condition2]

    const formValues = {
      sisaltyyko_kaavoittamatonta: true,
      sisaltyyko_kaavoitettua: true
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(' asemakaava ja asemakaavan muuttaminen')
  })

  it('Autofill rule succeeds combine rule (boolean) 4', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'sisaltyyko_kaavoittamatonta'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = true
    conditionObject1.comparison_value_type = 'boolean'

    const conditionObject2 = {}
    conditionObject2.variable = 'sisaltyyko_kaavoitettua'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = true
    conditionObject2.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject1, then_branch : 'asemakaava ja' }
    const condition2 = { condition: conditionObject2, then_branch : 'asemakaavan muuttaminen' }

    field.autofill_rule =[condition, condition2]

    const formValues = {
      sisaltyyko_kaavoittamatonta: false,
      sisaltyyko_kaavoitettua: false
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(undefined)
  })
  it('Autofill rule succeeds combine rule with variables (boolean) 1', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'sisaltyyko_kaavoittamatonta'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = true
    conditionObject1.comparison_value_type = 'boolean'

    const conditionObject2 = {}
    conditionObject2.variable = 'sisaltyyko_kaavoitettua'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = true
    conditionObject2.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject1, then_branch : 'asemakaava ja', variables: ['projektin_nimi'] }
    const condition2 = { condition: conditionObject2, then_branch : 'asemakaavan muuttaminen' , variables: ['projektin_nimi'] }

    field.autofill_rule =[condition, condition2]

    const formValues = {
      sisaltyyko_kaavoittamatonta: true,
      sisaltyyko_kaavoitettua: true,
      projektin_nimi: 'testiprojekti'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe('testiprojekti asemakaava ja asemakaavan muuttaminen')
  })
  it('Autofill rule succeeds combine rule with variables (boolean) 2', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'sisaltyyko_kaavoittamatonta'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = true
    conditionObject1.comparison_value_type = 'boolean'

    const conditionObject2 = {}
    conditionObject2.variable = 'sisaltyyko_kaavoitettua'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = true
    conditionObject2.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject1, then_branch : 'asemakaava ja', variables: ['projektin_nimi'] }
    const condition2 = { condition: conditionObject2, then_branch : 'asemakaavan muuttaminen', variables: ['projektin_nimi'] }
    const variables = { variables: ['projektin_nimi'] }
    field.autofill_rule =[condition, condition2, variables]

    const formValues = {
      sisaltyyko_kaavoittamatonta: false,
      sisaltyyko_kaavoitettua: true,
      projektin_nimi: 'testiprojekti'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe('testiprojekti asemakaavan muuttaminen')
  })
  it('Autofill rule succeeds combine rule with variables (boolean) 3', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'sisaltyyko_kaavoittamatonta'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = true
    conditionObject1.comparison_value_type = 'boolean'

    const conditionObject2 = {}
    conditionObject2.variable = 'sisaltyyko_kaavoitettua'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = true
    conditionObject2.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject1, then_branch : 'asemakaava ja', variables: ['projektin_nimi'] }
    const condition2 = { condition: conditionObject2, then_branch : 'asemakaavan muuttaminen', variables: ['projektin_nimi'] }

    field.autofill_rule =[condition, condition2]

    const formValues = {
      sisaltyyko_kaavoittamatonta: true,
      sisaltyyko_kaavoitettua: false,
      projektin_nimi: 'testiprojekti'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe('testiprojekti asemakaava ja')
  })
  it('Autofill rule succeeds combine rule with variables (boolean) 4', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'sisaltyyko_kaavoittamatonta'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = true
    conditionObject1.comparison_value_type = 'boolean'

    const conditionObject2 = {}
    conditionObject2.variable = 'sisaltyyko_kaavoitettua'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = true
    conditionObject2.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject1, then_branch : 'asemakaava ja', variables: ['projektin_nimi'] }
    const condition2 = { condition: conditionObject2, then_branch : 'asemakaavan muuttaminen', variables: ['projektin_nimi'] }
    field.autofill_rule =[condition, condition2]

    const formValues = {
      sisaltyyko_kaavoittamatonta: false,
      sisaltyyko_kaavoitettua: false,
      projektin_nimi: 'testiprojekti'
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe('testiprojekti')
  })
  it('Autofill rule succeeds combine rule with variables (boolean) 5', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'sisaltyyko_kaavoittamatonta'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = true
    conditionObject1.comparison_value_type = 'boolean'

    const conditionObject2 = {}
    conditionObject2.variable = 'sisaltyyko_kaavoitettua'
    conditionObject2.operator = '=='
    conditionObject2.comparison_value = true
    conditionObject2.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject1, then_branch : 'asemakaava ja', variables: ['projektin_nimi'] }
    const condition2 = { condition: conditionObject2, then_branch : 'asemakaavan muuttaminen', variables: ['projektin_nimi'] }
    field.autofill_rule =[condition, condition2]

    const formValues = {
      sisaltyyko_kaavoittamatonta: true,
      sisaltyyko_kaavoitettua: true
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(' asemakaava ja asemakaavan muuttaminen')
  })
  it('Autofill rule fails boolean if/else', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'maanomistus_yksityinen'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = true
    conditionObject1.comparison_value_type = 'boolean'

    const conditionObject2 = {}
    conditionObject2.variable = 'maanomistus_yksityinen'
    conditionObject2.operator = '!='
    conditionObject2.comparison_value = true
    conditionObject2.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject1, then_branch : 'True' }
    const condition2 = { condition: conditionObject2, then_branch : 'False' }

    field.autofill_rule =[condition, condition2]

    const formValues = {
      maanomistus_yksityinen: false
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(false)
  })
  it('Autofill rule succeeds boolean if/else', () => {
    const field = {}
    const conditionObject1 = {}
    conditionObject1.variable = 'maanomistus_yksityinen'
    conditionObject1.operator = '=='
    conditionObject1.comparison_value = true
    conditionObject1.comparison_value_type = 'boolean'

    const conditionObject2 = {}
    conditionObject2.variable = 'maanomistus_yksityinen'
    conditionObject2.operator = '!='
    conditionObject2.comparison_value = true
    conditionObject2.comparison_value_type = 'boolean'

    const condition = { condition: conditionObject1, then_branch : 'True' }
    const condition2 = { condition: conditionObject2, then_branch : 'False' }

    field.autofill_rule =[condition, condition2]

    const formValues = {
      maanomistus_yksityinen: true
    }
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(true)
  })
})
