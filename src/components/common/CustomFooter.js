import React, { Component } from 'react'
import {
  Footer,
  IconInstagram,
  IconYoutube,
  IconLinkedin,
  IconFacebook,
  IconTwitter
} from 'hds-react'
import { connect } from 'react-redux'
import { fetchFooter } from '../../actions/footerActions'
import { footerSelector } from '../../selectors/footerSelector'
import { isArray } from 'lodash'

class CustomFooter extends Component {
  componentDidMount() {
    this.props.fetchFooter()
  }

  renderHeader = header => {
     return (
        <div className="align-left">
        <Footer.Item
          as="span"
          label={header.title}
          onClick={function noRefCheck() {}}
        />
        {this.renderFooterLinks(header.links)}
      </div>
    )
  }
  renderFooterLinks = links => {
    const returnValue = []
    links.forEach( link => {
      returnValue.push(
        <Footer.Item
          as="a"
          href={link.url}
          label={link.link_text}
          onClick={function noRefCheck() {}}
          subItem
          key={link.url}
        />

      )
    })
    return returnValue
  }

  renderAllNavigation = () => {
    const returnValue = []

    if ( !this.props.footerData || !isArray( this.props.footerData )) {
        return null
    }
   this.props.footerData.forEach(current => {
      returnValue.push(
          <Footer.ItemGroup key={current.title}>{this.renderHeader(current)}</Footer.ItemGroup>
      )
    })

    return returnValue
  }

  renderTitle = () => {
    return (
      <>
        <div>Kaupunkiympäristö</div>
        <div>Asemakaavoitus</div>
        <div>PL 58212 (käyntiosoite Työpajankatu 8)</div>
      </>
    )
  }

  render() {
    return (
      <Footer
        footerProps={{
          lang: 'fi'
        }}
        korosType="basic"
        logoLanguage="fi"
        title={this.renderTitle()}
      >
        <Footer.Navigation
          navigationAriaLabel="Footer navigation items"
          variant="minimal"
        >
          {this.renderAllNavigation()}
        </Footer.Navigation>
        <Footer.Utilities backToTopLabel="Sivun alkuun">
          <Footer.SoMe
            soMeSectionProps={{
              'aria-label': 'Helsinki sosiaalisessa mediassa'
            }}
          >
            <Footer.Item
              aria-label="Helsingin kaupungin Facebook-tili"
              as="a"
              href="https://facebook.com/helsinginkaupunki/"
              icon={<IconFacebook aria-hidden="true" />}
              title="Helsingin kaupungin Facebook-tili"
            />
            <Footer.Item
              aria-label="Helsingin kaupungin Twitter-tili"
              as="a"
              href="https://twitter.com/helsinki"
              icon={<IconTwitter aria-hidden="true" />}
              title="Helsingin kaupungin Twitter-tili"
            />
            <Footer.Item
              aria-label="Helsingin kaupungin Instagram-tili"
              as="a"
              href="https://instagram.com/helsinki/"
              icon={<IconInstagram aria-hidden="true" />}
              title="Helsingin kaupungin Instagram-tili"
            />
            <Footer.Item
              aria-label="Helsingin kaupungin LinkedIn-tili"
              as="a"
              href="https://linkedin.com/company/city-of-helsinki"
              icon={<IconLinkedin aria-hidden="true" />}
              title="Helsingin kaupungin LinkedIn-tili"
            />
            <Footer.Item
              aria-label="Helsingin kaupungin Youtube-tili"
              as="a"
              href="https://youtube.com/channel/UCzJFvpjRB62oRoep4oRgwjg"
              icon={<IconYoutube aria-hidden="true" />}
              title="Helsingin kaupungin Youtube-tili"
            />
          </Footer.SoMe>
          <Footer.Item
            as="a"
            href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/ota-yhteytta/ota-yhteytta"
            label="Yhteystiedot"
          />
          <Footer.Item
            as="a"
            href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/osallistu-ja-vaikuta/palaute/anna-palautetta"
            label="Anna ja lue palautetta"
          />
          <Footer.Item
            as="a"
            href="https://hel.fi/kanslia/neuvonta-fi"
            label="Chat-neuvonta"
          />
        </Footer.Utilities>
        <Footer.Base
          copyrightHolder="Helsingin kaupunki"
          copyrightText="Kaikki oikeudet pidetään"
        >
          <Footer.Item
            as="a"
            href="https://hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/tietoa-hel-fista/"
            label="Tietoa palvelusta"
          />
          <Footer.Item
            as="a"
            href="https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/tietoa-helsingista/saavutettavuus/saavutettavuus-helfi-sivustolla/"
            label="Saavutettavuusseloste"
          />
        </Footer.Base>
      </Footer>
    )
  }
}

const mapDispatchToProps = {
  fetchFooter
}

const mapStateToProps = state => {
  return {
    footerData: footerSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomFooter)
