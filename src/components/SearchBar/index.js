import React, { Component } from 'react'
import './SearchBar.scss'
import { IconCross, IconSearch, SearchInput, Button } from 'hds-react'

class SearchBar extends Component {
  onSubmit = value => {
    const { buttonAction } = this.props
    buttonAction(value)
  }

  onReset = () => {
    const { buttonAction, toggleSearch } = this.props

    toggleSearch(false)

    if ( buttonAction ) {
    buttonAction('')
    }
  }
  render() {
    const { searchOpen, toggleSearch } = this.props

    return (
      <span className="search-bar">
        {!searchOpen ? (
          <Button
            variant="supplementary"
            className="search-action-icon"
            iconLeft={<IconSearch size="l" />}
            onClick={() => toggleSearch(true)}
            aria-label="Hae"
          />
        ) : (
          <>
            <SearchInput
              clearButtonAriaLabel="Clear"
              onSubmit={value => this.onSubmit(value)}
              aria-label="Tyhjennä"
            />
            <Button
              variant="supplementary"
              iconLeft={<IconCross size="l"  />}
              onClick={this.onReset}
              aria-label="Poista"

            />
          </>
        )}
      </span>
    )
  }
}

export default SearchBar
