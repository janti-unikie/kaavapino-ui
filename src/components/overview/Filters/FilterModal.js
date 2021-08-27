import React, { useState } from 'react'
import { OVERVIEW_FILTERS_FORM } from '../../../constants'
import { reduxForm, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { Button, Accordion } from 'hds-react'
import { useTranslation } from 'react-i18next'
import MobileFilterList from './MobileFilterList'

function FilterModal({ filters, handleClose, open }) {
  const { t } = useTranslation()

  const [selectedFilters, setSelectedFilters] = useState({})

  const onFilterChange = (value, name) => {
    setSelectedFilters({ ...selectedFilters, [name]: value } )
  }

  const renderFilters = () => {
    return filters.map(filter => {
      let amountSelected = 0

    
       if ( selectedFilters && selectedFilters[filter.parameter]) {
        const currentFilters = Object.keys( selectedFilters[filter.parameter] ) 
        if ( currentFilters ) {
            amountSelected = currentFilters.length
        }
    
      }

      return (
        <Accordion
          theme={{
            '--background-color': 'var(--color-white)',
            '--button-border-color-hover': 'var(--color-coat-of-arms)',
            '--button-size': '28px',
            '--content-font-color': 'var(--color-black-90)',
            '--content-font-size': 'var(--fontsize-body-xs)',
            '--content-line-height': 'var(--lineheight-xs)',
            '--header-font-color': 'var(--color-black-90)',
            '--header-font-size': 'var(--fontsize-heading-xs)',
            '--header-line-height': 'var(--lineheight-xs)',
            '--padding-horizontal': 'var(--spacing-xs)',
            '--padding-vertical': 'var(--spacing-xs)'
          }}
          style={{ fontSize: '14px' }}
          headingLevel={5}
          key={filter.name}
          heading={filter.name + amountSelected}
        >
          <MobileFilterList
            filter={filter}
            onChange={onFilterChange}
            selectedFilters={selectedFilters[filter.parameter]}
            onUserFilterChange={onFilterChange}
          />
        </Accordion>
      )
    })
  }

  console.log(selectedFilters)

  return (
    <Modal
      className="filter-modal"
      size="tiny"
      onClose={handleClose}
      open={open}
      closeIcon
    >
      <Modal.Header className="filter-modal-header">Suodata</Modal.Header>
      <Modal.Content className="filter-modal-content">{renderFilters()}</Modal.Content>
      <Modal.Actions className="filter-modal-actions">
        <Button type="button" variant="primary" onClick={handleClose}>
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
