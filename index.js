const express = require('express')
const fs = require('fs')
const app = express()

const geocode = require('./modules/geocode')
const weather = require('./modules/weather')

app.set('port', process.env.PORT || 60001)

// Allow CORS (cross-origin resource sharing).
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/'), (req, res) => {
    
}

app.get('/api', async (req, res) => {
    const zip = req.query.zip
    const shouldGetCached = true
    let location
    let weatherData

    if (shouldGetCached) {
        location = JSON.parse(fs.readFileSync('./data/location.json'))
        weatherData = JSON.parse(fs.readFileSync('./data/weather.json'))
    } else {
        location = await geocode.getPointFromZip(zip)
    }

    if (location.error) {
        console.log(location.error.msg)
        return res.status(500).send({
            error: location.error
        })
    }

    if (!shouldGetCached) {
        weatherData = await weather.getData(location.lat, location.lng)
    }

    fs.writeFileSync('./data/location.json', JSON.stringify(location) , 'utf-8')
    fs.writeFileSync('./data/weather.json', JSON.stringify(weatherData) , 'utf-8')

    res.status(200).send({
        location: {
            name: location.name,
        },
        current: weatherData.current,
        days: weatherData.days,
        hours: weatherData.hours,
    })
})

app.listen(app.get('port'), () => console.log(`Weather API is listening on port ${app.get('port')}`))