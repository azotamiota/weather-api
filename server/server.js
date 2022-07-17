const express = require('express')
const app = express()
let weather = require('./data')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).send(weather)
})

app.get('/cities/:city', (req, res) => {
    const city = req.params.city.toUpperCase()
    const currentCity = weather.filter(c => {
        return Object.keys(c).includes(city)
    })
    console.log(currentCity)
    if(currentCity.length > 0) {
        res.status(200).send(currentCity[0])
    } else {
        res.status(404).send(`<h1>404 Not found <br> ${req.params.city} is not in the database</h1>`)
    }
})

app.post('/cities', (req, res) => {
    const newCity = req.body
    const newID = weather.length + 1
    weather.push({id: newID, ...newCity})
    res.status(201).json({id: newID, ...newCity}) // .end(`${newCity} has been saved successfully with an id of ${newID} to the database`)
})

app.patch('/cities/:city', (req, res) => {
    const city = req.params.city.toUpperCase()
    const currentCity = weather.filter(c => {
        return Object.keys(c).includes(city)
    })
    weather = weather.filter(c => {
        return !Object.keys(c).includes(city)
    })
    console.log('weather: ', weather)
    if(currentCity.length < 1) {
        res.status(404).send(`<h1>404 Not found <br> ${req.params.city} is not in the database</h1>`)
    } else {
        // console.log('city: ', city, '\nObject.keys(req.body)[0]: ', Object.keys(req.body)[0], '\nObject.values(req.body)[0]: ', Object.values(req.body)[0])
        currentCity[0][city][Object.keys(req.body)[0]] = Object.values(req.body)[0]
        // console.log('currentCity: ', currentCity)
        weather.push(currentCity[0])
        res.status(202).send(currentCity[0])
    }
})

module.exports = app
