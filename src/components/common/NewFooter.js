import React from 'react'
import { Footer, IconInstagram, IconYoutube, IconLinkedin, IconFacebook, IconTwitter }  from 'hds-react'

export default function NewFooter() {
  return (
    <Footer
      footerProps={{
        lang: 'fi'
      }}
      korosType="basic"
      logoLanguage="fi"
      theme="light"
      title="Kaupunkiympäristö"
    >

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
