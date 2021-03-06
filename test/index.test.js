const supertest = require('supertest');
const server = require('../server')

describe('API test', () => {
    let api;
    let testCity = {"BERLIN" : {"Celsius": 21, "Fahrenheit": 70, "wind": false, "rain": false}}
    let testUpdate = {"sunrise" : "07:45"}

    beforeAll(() => {
        api = server.listen(8080, () => {
            console.log('Server listening on port 8080')
        })
    })

    afterAll((done) => {
        console.log('Gracefully stopping test server');
        api.close(done)
    })

    it('1. Retrieve status 200 at "/"', (done) => {
        supertest(api).get('/')
        .expect(200, done)
        }
    )

    it('2. Retrieve status 200 at "/cities/:city"', (done) => {
        supertest(api).get('/cities/Madrid').expect(200, done)
        }
    )

    it('3. Retrieve status 404 and error message at /cities/:city when desired city is not in API', async () => {
        const response = await supertest(api).get('/cities/Non-existing-city')
        expect(response.status).toBe(404)
        expect(response.error.text).toMatch(/Not found/)
    })

    it('4. Retrieve local weather at /cities/:city', async () => {
        const response = await supertest(api).get('/cities/Oslo').set('Accept', 'application/json')
        console.log('res body: ', response.body)
        expect(response.body.id).toBe(4)
    })


    it('5. Add a new city with POST request at /cities', (done) => {
        supertest(api).post('/cities')
            .send(testCity)
            .set('Accept', 'application/json')
            .expect(201)
            .expect({id: 5, ...testCity}, done)
    })

    it("6. Update an existing city's weather by adding a new element", (done) => {
        supertest(api).patch('/cities/Rome')
            .send(testUpdate)
            .set('Accept', 'application/json')
            .expect(202)
            .expect({id: 3, ROME : 
                {Celsius: 27,
                Fahrenheit: 80,
                wind: true,
                rain: false,
                "sunrise" : "07:45"}}, done)
    })

    it("7. Retrieve error message when trying to update non-existing city's weather", (done) => {
        supertest(api).patch('/cities/No such a city')
            .expect(404, done)
    })

    it("8. Retrieve status 204 on DELETE at /cities/:city", (done) => {
        supertest(api).delete('/cities/Madrid')
            .expect(201, done)
    })

    it("9. Retrieve 404 on DELETE if city is not in database", (done) => {
        supertest(api).delete('/cities/City not in database')
            .expect(404, done)
            .expect('Content-Type', /text/)
    })
})
