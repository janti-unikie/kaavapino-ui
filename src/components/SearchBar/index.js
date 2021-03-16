import React, { Component } from 'react'
import './SearchBar.scss'
import { IconCross, IconSearch, SearchInput } from 'hds-react'

class SearchBar extends Component {

  onSubmit = value => {
    const { buttonAction } = this.props
    buttonAction(value)
  }

  onReset = () => {
    const { buttonAction, toggleSearch } = this.props

    toggleSearch(false)
    buttonAction('')
  }
  render() {
    const { searchOpen, toggleSearch } = this.props

    return (
      <span className="search-bar">
        {!searchOpen ? (
          <IconSearch className="search-action-icon" size='m' onClick={() => toggleSearch(true)} />
        ) : (
          <>
              <SearchInput
                clearButtonAriaLabel="Clear"
                onSubmit={ value => this.onSubmit( value )}
              />
            <IconCross className="search-action-icon" size='m' onClick={this.onReset} />
            </>
        )}
      </span>
    )
  }
}

export default SearchBar