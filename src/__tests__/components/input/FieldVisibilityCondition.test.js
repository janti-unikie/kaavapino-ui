import { showField } from '../../../utils/projectVisibilityUtils'
describe('VisibilityCondition tests', () => {

  it('Shows field with == rule', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '==',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
      a: true
    }
    expect(showField(field, formValues)).toBe(true)
  })
  it('Does not show field with == rule with undefined', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '==',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
    }
    expect(showField(field, formValues)).toBe(false)
  })
  it('Does not show field with == rule with wrong type', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '==',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
      a:'kaavapino'
    }
    expect(showField(field, formValues)).toBe(false)
  })
  it('Does not show field with == rule', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '==',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
      a: false
    }
    expect(showField(field, formValues)).toBe(false)
  })
  it('Show field with multiple == rule', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '==',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      },
      {
        variable: 'b',
        operator: '==',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
      a: false,
      b: true
    }
    expect(showField(field, formValues)).toBe(true)
  })
  it('Show field with multiple == rule all true', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '==',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      },
      {
        variable: 'b',
        operator: '==',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
      a: true,
      b: true
    }
    expect(showField(field, formValues)).toBe(true)
  })
  it('Show field with != rule', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
      a: false
    }
    expect(showField(field, formValues)).toBe(true)
  })
  it('Does not show field with != rule multiple values all true', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      },
      {
        variable: 'b',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      },
      {
        variable: 'c',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
      a: true,
      b: true,
      c: true
    }
    expect(showField(field, formValues)).toBe(false)
  })
  it('Shows field with != rule multiple values', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      },
      {
        variable: 'b',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      },
      {
        variable: 'c',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
      a: true,
      b: false,
      c: true
    }
    expect(showField(field, formValues)).toBe(true)
  })
  it('Shows field with != rule multiple values all false', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      },
      {
        variable: 'b',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      },
      {
        variable: 'c',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
      a: false,
      b: false,
      c: false
    }
    expect(showField(field, formValues)).toBe(true)
  })
  it('Shows field with != rule multiple values with undefined', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      },
      {
        variable: 'b',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      },
      {
        variable: 'c',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
    }
    expect(showField(field, formValues)).toBe(true)
  })
  it('Shows field with != rule multiple values with wrong value type', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '!=',
        comparison_value: 'True',
        comparison_value_type: 'boolean'
      }]

    const formValues = {
      a: 'kaavapino'
    }
    expect(showField(field, formValues)).toBe(true)
  })
})
