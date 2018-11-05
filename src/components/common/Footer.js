import React from 'react'

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-image-container'>
        <a href='https://www.hel.fi/helsinki/fi'><img alt='Helsinki' src='/helsinki.svg'/></a>
      </div>
      <div className='footer-info-container'>
        <div className='footer-info-items-container'>
          <span className='footer-info-title'>Kaavapino</span>
          <a href='/'><span className='footer-info'>Tietoa palvelusta</span></a>
        </div>
      </div>
      <div className='footer-footer-container'>
        <a href='https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/hallinto/organisaatio/rekisteriselosteet'>Rekisteriseloste</a> |
        <span> 2018 Helsingin Kaupunki</span>
      </div>
    </div>
  )
}

export default Footer