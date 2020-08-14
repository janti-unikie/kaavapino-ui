import React, { Component } from 'react'
import './SearchBar.scss'
import { Button, Input } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactComponent as MagnifierIcon } from '../../assets/icons/magnifier-icon.svg'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchOpen: false
    }
  }

  render() {
    const { onChangeValue, searchOpen, toggleSearch } = this.props

    return (
      <div className="search-bar">
        {!searchOpen ? (
          <MagnifierIcon className="magnifier-icon" onClick={() => toggleSearch(true)} />
        ) : (
          <div className="search-bar-bar">
            <Input
              autoFocus
              onChange={(e) => onChangeValue(e.target.value)}
              type="text"
              fluid
              placeholder="Hae"
              action={<Button primary>Hae</Button>}
            />
            <MagnifierIcon className="magnifier-icon" />
            <FontAwesomeIcon onClick={() => toggleSearch(false)} icon="times" />
          </div>
        )}
      </div>
    )
  }
}

export default SearchBar
