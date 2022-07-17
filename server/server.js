const express = require('express')
const app = express()
const weather = require('./data')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).send(weather)
})

app.get('/:city', (req, res) => {
    const city = req.params.city
    const currentCity = weather.filter(c => {
        return Object.keys(c)[0] === city
    })
    console.log('currentCity: ', currentCity)
    res.status(200).json({currentCity})
})

module.exports = app
