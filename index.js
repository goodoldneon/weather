const express = require('express')
const app = express()

const geocode = require('./modules/geocode')
const weather = require('./modules/weather')

app.set('port', process.env.PORT || 60001)

app.get('/zip/:zip', async (req, res) => {
    const zip = req.params.zip
    const point = await geocode.getPointFromZip(zip)

    const forecast = await weather.getForecast(point.lat, point.lng)

    console.log(forecast.currently)

    res.send(`
        <div>${point.name}</div>
        <div>${forecast.currently.temperature}&deg;F</div>
    `)
})

app.listen(app.get('port'), () => console.log(`Weather API is listening on port ${app.get('port')}`))