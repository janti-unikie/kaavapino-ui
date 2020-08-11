import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Divider,
  Grid,
  Header,
  List,
  Responsive,
  Segment
} from 'semantic-ui-react'
import Link from 'react-router-dom/Link'
import { fetchFooter } from '../../actions/footerActions'
import { footerSelector } from '../../selectors/footerSelector'

class Footer extends Component {
  state = {
    isOpen: false
  }

  componentDidMount() {
    this.props.fetchFooter()
  }

  render() {
    const { footer } = this.props
    const footerData = footer || {}
    let linkColumns = []
    for (let key in footerData) {
      let values = []
      for (let key2 in footerData[key].links) {
        let regex = new RegExp(
          /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi
        )
        if (footerData[key].links[key2].url.match(regex)) {
          values.push(
            <List.Item as={'a'} href={footerData[key].links[key2].url} key={`${key}-${key2}`}>
              {footerData[key].links[key2].link_text}
            </List.Item>
          )
        } else {
          values.push(
            <List.Item as={Link} to={footerData[key].links[key2].url} key={`${key}-${key2}`}>
              {footerData[key].links[key2].link_text}
            </List.Item>
          )
        }
      }
      linkColumns.push(
        <Grid.Column className="footer-link-group" width={3} key={key}>
          <Header as="h4" content={footerData[key].title} />
          <List link>{values}</List>
        </Grid.Column>
      )
    }

    return (
      <Segment
        className="footer-container borderless"
        style={{ margin: '60px 0px 0px', padding: '60px 0px' }}
      >
        <Container textAlign="center">
          <Grid divided inverted stackable>
            <Grid.Column className="footer-logo-column" width={4}>
              <a href="https://www.hel.fi/helsinki/fi">
                <img className="footer-image" alt="Helsinki" src="/helsinki.svg" />
              </a>
              <Header as="h4" content="Kaupunkiympäristö" />
              <List>
                <List.Item>Asemakaavoitus</List.Item>
                <List.Item>PL 58212 (käyntiosoite Työpajankatu 8)</List.Item>
              </List>
            </Grid.Column>
            {linkColumns}
          </Grid>

          <Divider section />
          <Grid>
            <Grid.Column className="footer-copyright" floated="left" width={7}>
              <p>
                © Copyright 2017 • Kaikki oikeudet pidätetään •{' '}
                <Link to="/terms">
                  <span>Sivuston Käyttöehdot</span>
                </Link>
              </p>
            </Grid.Column>
            <Responsive
              as={Grid.Column}
              minWidth={800}
              className="footer-feedback"
              floated="right"
              width={2}
            >
              <a href="mailto: name@domain">
                <span>Anna palautetta</span>
              </a>
            </Responsive>
          </Grid>
        </Container>
      </Segment>
    )
  }
}

const mapDispatchToProps = {
  fetchFooter
}

const mapStateToProps = state => {
  return {
    footer: footerSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
