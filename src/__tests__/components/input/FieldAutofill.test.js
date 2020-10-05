import { getFieldAutofillValue } from '../../../utils/projectAutofillUtils'
describe('Autofill tests', () => {

  it('Autofill rule succeeds', () => {
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
  it('Autofill rule not succeeds', () => {
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
  it('Autofill rule succeeds boolean', () => {
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
  it('Autofill rule not succeeds boolean', () => {
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
    expect(getFieldAutofillValue(field.autofill_rule, formValues)).toBe(false)
  })
 it('Autofill rule succeeds multiple', () => {
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
  it('Autofill rule succeeds multiple', () => {
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
  it('Autofill rule not succeeds multiple', () => {
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
  it('Autofill rule succeeds multiple', () => {
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
})
