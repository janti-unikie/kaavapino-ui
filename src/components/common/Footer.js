import React, { Component } from 'react'
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

class Footer extends Component {
  state = {
    isOpen: false,
    linkGroupData: {}
  }

  componentDidMount() {
    this.setState({ linkGroupData: {
      'Hyödylliset linkit': {
        'Rekisteriseloste':'https://www.hel.fi/static/liitteet/kanslia/rekisteriselosteet/Kymp/Kymp-EU-Kaavoitus-poikkeamismenettely-suunnittelutarveratkaisu-rakennuskielto-prosessien-rekisteri.pdf',
        'Asemakaavoituksen ohjeet':'http://helmi.hel.fi/kymp/maka/suunnitteluportaali/asemakaavoituksen-ohjeet/Sivut/default.aspx',
        'Kympin toimintasääntö':'https://www.hel.fi/helsinki/fi/kaupunki-ja-hallinto/hallinto/organisaatio/hallintosaanto-ja-toimintasaannot/kaupunkiymparisto-toimintasaanto/kaupunkiymparisto-toimintasaanto'
      },
      'Group 2': {
        'Link 1':'Link 1',
        'Link 2':'Link 2',
        'Link 3':'Link 3',
        'Link 4':'Link 4'
      },
      'Group 3': {
        'Link 1':'Link 1',
        'Link 2':'Link 2',
        'Link 3':'Link 3',
        'Link 4':'Link 4'
      },
      'Group 4': {
        'Link 1':'Link 1',
        'Link 2':'Link 2',
        'Link 3':'Link 3',
        'Link 4':'Link 4'
      }
    } })
  }

  render() {
    const { linkGroupData } = this.state

    let linkColumns = []
    for (let key in linkGroupData) {
      let values = []
      for (let [key2, value] of Object.entries(linkGroupData[key])) {
        let regex = new RegExp(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi)
        if (value.match(regex)) {
          values.push(
            <List.Item as={'a'} href={value}>{key2}</List.Item>
          )
        } else {
          values.push(
            <List.Item as={Link} to={value}>{key2}</List.Item>
          )
        }
      }
      linkColumns.push(
        <Grid.Column className='footer-link-group' width={ 3 }>
          <Header as='h4' content={key}/>
          <List link>
            {values}
          </List>
        </Grid.Column>
      )
    }

    return (
      <Segment className='footer-container borderless' style={ { margin: '5em 0em 0em', padding: '5em 0em' } }>
        <Container textAlign='center'>
          <Grid divided inverted stackable>
            <Grid.Column className='footer-logo-column' width={ 4 }>
              <a href='https://www.hel.fi/helsinki/fi'><img className='footer-image' alt='Helsinki'
                src='/helsinki.svg'/></a>
              <Header as='h4' content='Kaupunkiympäristö'/>
              <List>
                <List.Item>Asemakaavoitus</List.Item>
                <List.Item>PL 58212 (käyntiosoite Työpajankatu 8)</List.Item>
              </List>
            </Grid.Column>
            {linkColumns}
          </Grid>

          <Divider section/>
          <Grid>
            <Grid.Column className='footer-copyright' floated='left' width={ 7 }>
              <p>© Copyright 2017 • Kaikki oikeudet pidätetään • <Link
                to='/terms'><span>Sivuston Käyttöehdot</span></Link></p>
            </Grid.Column>
            <Responsive as={Grid.Column} minWidth={800} className='footer-feedback' floated='right' width={ 2 }>
              <a href='mailto: name@domain'>
                <span>Anna palautetta</span>
              </a>
            </Responsive>
          </Grid>
        </Container>
      </Segment>
    )
  }
}

export default Footer