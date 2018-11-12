import React from 'react'
import { Modal, Button } from 'semantic-ui-react'

const ConfirmModal = ({ open, callback }) => {
  return (
    <Modal open={open} centered={false} basic size={'small'}>
      <Modal.Header>Lopeta vaihe</Modal.Header>
      <Modal.Content>
        Siirrytäänkö seuraavaan vaiheeseen? Vaihetta ei voi enää vaihtaa takaisin.
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => callback(false)}>Peruuta</Button>
        <Button onClick={() => callback(true)} color='green'>OK</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ConfirmModal