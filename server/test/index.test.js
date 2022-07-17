const request = require('supertest');
const server = require('../server')

describe('API test', () => {
    let api;
    let testCity = {Berlin : {Celsius: 21, Fahrenheit: 70, wind:false, rain:false}}

    beforeAll(() => {
        api = server.listen(8080, () => {
            console.log('Server listening on port 8080')
        })
    })

    afterAll((done) => {
        console.log('Gracefully stopping test server');
        api.close(done)
    })

    it('retrieve status 200 at "/"', (done) => {
        request(api).get('/')
        .expect(200, done)
        }
    )

    it('retrieve full database at "/"', (done) => {
        request(api).get('/')
        .expect((error, data) => {
            console.log('res.body in test: ', data)
            expect(data.body).toEqual([
                {
                    "London": {
                        "Celsius": 19,
                        "Fahrenheit": 66,
                        "wind": true,
                        "rain": true
                    }
                },
                {
                    "Madrid": {
                        "Celsius": 28,
                        "Fahrenheit": 82,
                        "wind": false,
                        "rain": false
                    }
                },
                {
                    "Rome": {
                        "Celsius": 27,
                        "Fahrenheit": 80,
                        "wind": true,
                        "rain": false
                    }
                },
                {
                    "Oslo": {
                        "Celsius": 12,
                        "Fahrenheit": 53,
                        "wind": false,
                        "rain": true
                    }
                }
            ])
        }).end(done)
    })
})


