import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Form } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import projectUtils from '../../utils/projectUtils'
import './FormModal.scss'
import { connect } from 'react-redux'
import { NEW_PROJECT_FORM } from '../../constants'
import { newProjectSubtypeSelector } from '../../selectors/formSelector'
import FormField from '../input/FormField'

class FormModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.submitting && this.props.submitSucceeded) {
      this.handleClose()
    } else if (prevProps.submitting && this.props.submitFailed && !this.props.submitSucceeded && this.state.loading) {
      this.setState({ loading: false })
    }
  }

  formatUsers = () => {
    return this.props.users.map((user) => {
      return {
        value: user.id,
        label: projectUtils.formatUsersName(user)
      }
    })
  }

  handleSubmit = () => {
    this.setState({ loading: true })
    this.props.handleSubmit()
  }

  handleClose = () => {
    this.props.reset()
    this.props.handleClose()
    this.setState({ loading: false })
  }

  render() {
    const { loading } = this.state
    const { selectedSubType } = this.props
    const showXLProjectOptions = selectedSubType === 5

    return (
      <Modal className="form-modal" size={'small'} onClose={this.props.handleClose}  open={this.props.open} closeIcon>
        <Modal.Header>Luo uusi hanke</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <FormField field={{ name: 'name', type: 'text', label: 'Hankkeen nimi' }} />
              <FormField className="ui fluid input" field={{ name: 'user', label: 'Vastuuhenkilö', type: 'select', choices: this.formatUsers() }} />
            </Form.Group>
            <FormField field={{ name:'public', label: 'Luodaanko hanke julkiseksi', type: 'boolean', double: true }} double />
            <div className="subtype-input-container">
              <FormField field={{ name:'subtype', label: 'Valitse prosessin koko', type: 'radio', options: [
                { value: 1, label: 'XS' },
                { value: 2, label: 'S' },
                { value: 3, label: 'M' },
                { value: 4, label: 'L' },
                { value: 5, label: 'XL' }
              ] }} />
            </div>
            {showXLProjectOptions && (
              <>
                <h3>Valitse, laaditaanko</h3>
                <FormField field={{ name:'create_principles', label: 'Suunnitteluperiaatteet', type: 'toggle' }} />
                <FormField field={{ name:'create_draft', label: 'Kaavaluonnos', type: 'toggle' }} />
              </>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button secondary disabled={loading} onClick={this.handleClose}>Peruuta</Button>
          <Button primary disabled={loading} type="submit" onClick={this.handleSubmit}>Luo hanke</Button>
        </Modal.Actions>
      </Modal>

    )
  }
}

FormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  selectedSubType: newProjectSubtypeSelector(state)
})

const decoratedForm = reduxForm({
  form: NEW_PROJECT_FORM,
  initialValues: { public: true }
})(FormModal)

export default connect(mapStateToProps, () => {})(decoratedForm)
