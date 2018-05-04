# Demo

https://weather-gon.herokuapp.com/

# Getting Started

1. Install dependencies
    1. `yarn install`
    1. `cd client`
    1. `yarn install`

1. Run `yarn dev:start` to start development environment.

# API Keys

* Getting your own API keys:
    * [Darksky](https://darksky.net/dev) (for weather)
    * [Google Place](https://developers.google.com/places/web-service/get-api-key) (for location)

* Put your keys in `.env`.
    * Note that `.env` will not override existing environment variables. For example, `export DARKSKY_API_KEY=abcdef` will override `.env`.

# Development

* With prettier:
    * `yarn dev`

* With static weather data, found in `/test/weather.json`:
    * `USE_STATIC_WEATHER=true yarn dev:start`

# Production

1. Set your production host url.
    * `client/package.json`
    * `client/.env.production`

1. Run `yarn build:client`.
