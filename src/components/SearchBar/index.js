import React, { Component } from 'react'
import './SearchBar.scss'
import { Button, Input, Form } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactComponent as MagnifierIcon } from '../../assets/icons/magnifier-icon.svg'

class SearchBar extends Component {
  render() {
    const { setFilter, searchOpen, toggleSearch, buttonAction } = this.props

    return (
      <div className="search-bar">
        {!searchOpen ? (
          <MagnifierIcon className="magnifier-icon" onClick={() => toggleSearch(true)} />
        ) : (
          <div className="search-bar-bar">
            <Form>
              <Input
                autoFocus
                onChange={e => setFilter(e.target.value)}
                type="text"
                fluid
                placeholder="Hae"
                action={
                  (
                  <Button onClick={buttonAction} primary>
                    Hae
                  </Button>
                  )
                }
              />
            </Form>
            <MagnifierIcon className="magnifier-icon" />
            <FontAwesomeIcon onClick={() => toggleSearch(false)} icon="times" />
          </div>
        )}
      </div>
    )
  }
}

export default SearchBar
