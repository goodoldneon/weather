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

    // const location = {
    //     name: 'Ann Arbor, MI 48105, USA'
    // }

    // const data = {
    //     currently: {
    //         temperature: 9.35
    //     }
    // }

    const location = JSON.parse(fs.readFileSync('./data/location.json'))
    const weatherData = JSON.parse(fs.readFileSync('./data/weather.json'))

    // const location = await geocode.getPointFromZip(zip)
    // const weatherData = await weather.getData(location.lat, location.lng)

    // console.log(data)

    const output = {
        location: {
            name: location.name,
        },
        current: weatherData.current,
        forecast: weatherData.forecast,
    }

    // fs.writeFileSync('./data/location.json', JSON.stringify(location) , 'utf-8')
    // fs.writeFileSync('./data/weather.json', JSON.stringify(weatherData) , 'utf-8')

    res.status(200).send(output)
})

app.listen(app.get('port'), () => console.log(`Weather API is listening on port ${app.get('port')}`))