# kaavapino-ui
[![Build Status](https://travis-ci.com/City-of-Helsinki/kaavapino-ui.svg?branch=master)](https://travis-ci.com/City-of-Helsinki/kaavapino-ui)
[![codecov](https://codecov.io/gh/City-of-Helsinki/kaavapino-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/City-of-Helsinki/kaavapino-ui)

UI for editing city planning projects in [Kaavapino API](https://github.com/City-of-Helsinki/kaavapino)

### How to run
Before running, make sure that you have created a .env file to the project root with the following environmental variables:
`REACT_APP_OPENID_CONNECT_CLIENT_ID=X`
`REACT_APP_OPENID_AUDIENCE=X`
`REACT_APP_BASE_URL=X` (only needed in production, locally uses proxy, which is defined in `package.json`)
`REACT_APP_SENTRY_URL=X` (only needed in production)

1. `yarn install`
2. `yarn start`


## Developing with fake login (tmporary solution)
To generate token:
- fire up backend
- create superuser (docker-compose -f ./docker-compose.yml exec api ./manage.py createsuperuser) for your username and email
- add token for the same username (docker-compose -f ./docker-compose.yml exec api ./manage.py create_api_token <username>)
- Add generated token to frontend .env as REACT_APP_API_TOKEN

