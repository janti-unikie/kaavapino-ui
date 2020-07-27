import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { currentProjectSelector } from '../../selectors/projectSelector'

const ConfirmModal = ({ open, callback, currentProject }) => {
  return (
    <Modal open={open} centered={false} size={'tiny'}>
      <Modal.Header>Lopeta vaihe</Modal.Header>
      <Modal.Content>
        <div>
          Siirrytäänkö seuraavaan vaiheeseen? Vaihetta ei voi enää vaihtaa takaisin.
        </div>
        {currentProject && !currentProject.public && (
          <div>
            <br />
            Huom. Aiemmin ei-näkyväksi merkityn projektin tiedot muuttuvat näkyviksi
            kaikille Kaavapinon käyttäjille.
          </div>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button secondary onClick={() => callback(false)}>
          Peruuta
        </Button>
        <Button primary onClick={() => callback(true)}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = state => ({
  currentProject: currentProjectSelector(state)
})

export default connect(mapStateToProps, null)(ConfirmModal)
