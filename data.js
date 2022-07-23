const weather = [
    {id : 1, LONDON : {Celsius: 19,
                Fahrenheit: 66,
                wind: true,
            rain: true}},
    {id : 2, MADRID : {Celsius: 28,
                Fahrenheit: 82,
                wind: false,
            rain: false}}, 
    {id : 3, ROME : {Celsius: 27,
                Fahrenheit: 80,
                wind: true,
            rain: false}},
    {id : 4, OSLO : {Celsius: 12,
                Fahrenheit: 53,
                wind: false,
            rain: true}},   
]

const weatherJ = {
    "1": {"city": "LONDON",
    "Celsius": 19,
    "Fahrenheit": 66,
    "wind": true,
    "rain": true},

    "2" : {
    "city": "MADRID",
    "Celsius": 28,
    "Fahrenheit": 82,
    "wind": false,
    "rain": false}, 

    "3" : {
    "city": "ROME",
    "Celsius": 27,
    "Fahrenheit": 80,
    "wind": true,
    "rain": false},

    "4" : {
    "city": "OSLO",
    "Celsius": 12,
    "Fahrenheit": 53,
    "wind": false,
    "rain": true}  
    }

module.exports = weather
