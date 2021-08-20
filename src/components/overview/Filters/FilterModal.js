import React from 'react'
import { OVERVIEW_FILTERS_FORM } from '../../../constants';
import { reduxForm, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { Button, Accordion } from 'hds-react';
import { useTranslation } from 'react-i18next'
 



function FilterModal(props) {

    const {t} = useTranslation()

    return (
        <Modal
        className="filter-modal"
        size="tiny"
        onClose={props.handleClose}
        open={props.open}
        closeIcon
      >
        <Modal.Header className="filter-modal-header">Suodata</Modal.Header>
        <Modal.Content className="filter-modal-content">
          <Accordion heading="Yksikkö" >
              Yksikkö
          </Accordion> 

          <Accordion heading="Hankkeen vaihe" >
              Yksikkö
          </Accordion> 
          <Accordion heading="Kaavaprosessi" >
              Yksikkö
          </Accordion> 
          <Accordion heading="Maankäyttösopimus" >
              Yksikkö
          </Accordion> 
          <Accordion heading="Hanketyyppi" >
              Yksikkö
          </Accordion> 
          <Accordion heading="Henkilö" >
              Yksikkö
          </Accordion> 

        
        </Modal.Content>
        <Modal.Actions className="filter-modal-actions">
            <Button type="button" variant="primary" onClick={props.handleClose}>
              {t('common.save')}
            </Button>
          </Modal.Actions>
      </Modal>
    )
}

const mapStateToProps = state => ({
    formValues: getFormValues(OVERVIEW_FILTERS_FORM)(state)
  })
  
  const decoratedForm = reduxForm({
    form: OVERVIEW_FILTERS_FORM,
    initialValues: {}
  })(FilterModal)
  
  export default connect(mapStateToProps, () => ({}))(decoratedForm)
