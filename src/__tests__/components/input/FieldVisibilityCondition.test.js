import { showField } from '../../../utils/projectVisibilityUtils'
describe('VisibilityCondition tests', () => {

  it('Shows field with == rule (boolean)', () => {
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
  it('Does not show field with == rule with undefined (boolean)', () => {
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
  it('Does not show field with == rule with wrong type (boolean)', () => {
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
  it('Does not show field with == rule (boolean)', () => {
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
  it('Show field with multiple == rule (boolean)', () => {
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
  it('Show field with multiple == rule all true (boolean)', () => {
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
  it('Does not show field with != rule multiple values all true (boolean)', () => {
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
  it('Shows field with != rule multiple values (boolean)', () => {
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
  it('Shows field with != rule multiple values all false (boolean)', () => {
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
  it('Shows field with != rule multiple values with undefined (boolean)', () => {
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
  it('Shows field with != rule multiple values with wrong value type (boolean)', () => {
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
  it('Shows field with == rule success (string)', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '==',
        comparison_value: 'kaavapino',
        comparison_value_type: 'string'
      }]

    const formValues = {
      a: 'kaavapino'
    }
    expect(showField(field, formValues)).toBe(true)
  })
  it('Shows field with == rule fail (string)', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '==',
        comparison_value: 'jokumuu',
        comparison_value_type: 'string'
      }]

    const formValues = {
      a: 'kaavapino'
    }
    expect(showField(field, formValues)).toBe(false)
  })
  it('Shows field with != rule success (string)', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '!=',
        comparison_value: 'jokumuu',
        comparison_value_type: 'string'
      }]

    const formValues = {
      a: 'kaavapino'
    }
    expect(showField(field, formValues)).toBe(true)
  })
  it('Shows field with != rule (string)', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '!=',
        comparison_value: 'kaavapino',
        comparison_value_type: 'string'
      }]

    const formValues = {
      a: 'kaavapino'
    }
    expect(showField(field, formValues)).toBe(false)
  })
  it('Shows field with == rule (number)', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '==',
        comparison_value: '1',
        comparison_value_type: 'number'
      }]

    const formValues = {
      a: 1
    }
    expect(showField(field, formValues)).toBe(true)
  })
  it('Shows field with == rule fails (number)', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '==',
        comparison_value: '2',
        comparison_value_type: 'number'
      }]

    const formValues = {
      a: 1
    }
    expect(showField(field, formValues)).toBe(false)
  })
  it('Shows field with != rule (number)', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '!=',
        comparison_value: '2',
        comparison_value_type: 'number'
      }]

    const formValues = {
      a: 1
    }
    expect(showField(field, formValues)).toBe(true)
  })
  it('Shows field with != rule fails (number)', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: '!=',
        comparison_value: '1',
        comparison_value_type: 'number'
      }]

    const formValues = {
      a: 1
    }
    expect(showField(field, formValues)).toBe(false)
  }),
  it('Shows field with in rule (list)', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: 'in',
        comparison_value: 'test',
        comparison_value_type: 'list<string>'
      }]

    const formValues = {
      a: ['atest', 'btest', 'test', 'dtest']
    }
    expect(showField(field, formValues)).toBe(false)
  })
  it('Shows field with in rule (list) not found', () => {
    const field = {}
    field.visibility_conditions = [{
        variable: 'a',
        operator: 'in',
        comparison_value: 'teste',
        comparison_value_type: 'list<string>'
      }]

    const formValues = {
      a: ['atest', 'btest', 'test', 'dtest']
    }
    expect(showField(field, formValues)).toBe(false)
  })
})
