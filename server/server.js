const express = require('express')
const app = express()
let weather = require('./data')

app.use(express.json())
// app.use(express.urlencoded({extended: false}))  // uncomment when connected with frontend form

app.get('/', (req, res) => {
    res.status(200).send(weather)
})

app.get('/cities/:city', (req, res) => {
    const city = req.params.city.toUpperCase()
    const currentCity = weather.filter(c => {
        return Object.keys(c).includes(city)
    })
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
    res.status(201).json({id: newID, ...newCity})
})

app.patch('/cities/:city', (req, res) => {
    const city = req.params.city.toUpperCase()
    const currentCity = weather.filter(c => {
        return Object.keys(c).includes(city)
    })
    weather = weather.filter(c => {
        return !Object.keys(c).includes(city)
    })
    if(currentCity.length < 1) {
        res.status(404).send(`<h1>404 Not found <br> ${req.params.city} is not in the database</h1>`)
    } else {
        currentCity[0][city][Object.keys(req.body)[0]] = Object.values(req.body)[0]
        weather.push(currentCity[0])
        res.status(202).send(currentCity[0])
    }
})

app.delete('/cities/:city', (req, res) => {
    const city = req.params.city.toUpperCase()
    const citiesInDB = weather.map(c => Object.keys(c)).map(entry => entry[1])

    if(citiesInDB.includes(city)) {
        weather = weather.filter(c => {
            return !Object.keys(c).includes(city)
        })
        res.status(201).send(`${req.params.city} has been deleted`)
    } else {
        res.status(404).send(String(`${req.params.city} is not in database`))
    }
})

console.log('lets try again and again')
module.exports = app
