# Demo

https://aaronharper.net/weather

# Getting Started

1. Install dependencies
    1. `yarn install`
    1. `cd client`
    1. `yarn install`

1. Get API keys
    1. Darksky (for weather) -- https://darksky.net/dev
    1. Google Geocoding (for location) -- https://developers.google.com/maps/documentation/geocoding/get-api-key

1. Environment variables
    * If you'd like to use a `.env` file, rename `.env.example` to `.env`.
    * Make sure `DARKSKY_API_KEY` is your Darksky API key, and `GOOGLE_API_KEY` is your Google Geocoding API key.

# Development

* `yarn dev`
* `USE_STATIC_WEATHER=true yarn dev`
    * Use static weather data, found in `/test/weather.json`.
