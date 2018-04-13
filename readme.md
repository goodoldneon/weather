# Demo

https://aaronharper.net/weather

# Getting Started

1. Install dependencies
    1. `yarn install`
    1. `cd client`
    1. `yarn install`

1. Run `yarn dev:start` to start development environment.

# API Keys

* Getting your own API keys:
    * [Darksky](https://darksky.net/dev) (for weather)
    * [Google Geocoding](https://developers.google.com/maps/documentation/geocoding/get-api-key) (for location)

* Put your keys in `.env`.
    * Note that `.env` will not override existing environment variables. For example, `export DARKSKY_API_KEY=abcdef` will override `.env`.

# Development

* With prettier:
    * `yarn dev`
* With static weather data, found in `/test/weather.json`:
    * `USE_STATIC_WEATHER=true yarn dev:start`
