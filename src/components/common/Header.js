import React from 'react'
import { Navigation, IconSignout } from 'hds-react'
import { ReactComponent as HistogramMobileIcon } from '../../assets/histogram-mobile.svg'
import { ReactComponent as ChecklistMobile } from '../../assets/checklist-mobile.svg'
import { ReactComponent as PagesMobile } from '../../assets/pages-mobile.svg'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Header = props => {
  const navigateToProjects = () => {
    props.history.push('../projects')
  }

  const navigateToHome = () => {
    props.history.push('../')
  }

  const navigateToReports = () => {
    props.history.push('../reports')
  }

  const logout = () => {
    props.history.push('../Logout')
  }
  const { user } = props

  const { t } = useTranslation()

  return (
    <Navigation
      logoLanguage="fi"
      menuToggleAriaLabel={t('header.choices-label')}
      title={t('title')}
      titleAriaLabel={t('title')}
      titleUrl="./"
      className="header"
      theme={{
        '--header-background-color': 'var(--color-fog-light)',
        '--header-color': 'var(--color-black-90)',
        '--header-divider-color': 'var(--color-black-20)',
        '--header-focus-outline-color': 'var(--color-black)',
        '--mobile-menu-background-color': 'var(--color-white)',
        '--mobile-menu-color': 'var(--color-black-90)',
        '--navigation-row-background-color': 'var(--color-white)',
        '--navigation-row-color': 'var(--color-black-90)',
        '--navigation-row-focus-outline-color': 'var(--color-coat-of-arms)'
      }}
    >
      <Navigation.Row variant="inline">
        <Navigation.Item
          as="a"
          label={t('header.overview')}
          onClick={navigateToHome}
          icon={<HistogramMobileIcon />}
        />
        <Navigation.Item
          as="a"
          label={t('header.projects')}
          onClick={navigateToProjects}
          icon={<ChecklistMobile />}
        />
        <Navigation.Item
          as="a"
          label={t('header.reports')}
          icon={<PagesMobile />}
          onClick={navigateToReports}
        />
      </Navigation.Row>
      <Navigation.Actions>
        <Navigation.User authenticated={true}>
          <Navigation.Item
            label={user && user.profile.name}
            href="/"
            target="_blank"
            variant="primary"
          />
          <Navigation.Item
            href="#"
            icon={<IconSignout aria-hidden />}
            label={t('header.sign-out')}
            onClick={logout}
            variant="supplementary"
          />
        </Navigation.User>
      </Navigation.Actions>
    </Navigation>
  )
}

export default withRouter(Header)
