# Weather API

## Installation

- Install packages with `npm install`

## How to use it

### Locally 

- Start the server running `npm run dev`.
- Open your browser and visit `http://localhost:5000`
- Check the routes available in `server.js`
- Test `POST DELETE PATCH` methods with [Postman](https://postman.com)
- `Ctrl + C` to stop the server

### Remotely

- `GET` requests only
- Visit [this](https://weather-api-backend-only.herokuapp.com/) website and check routes

## Technical information

- Simple server built with [Express](https://expressjs.com/)
- Unit-testing with [Jest](https://jestjs.io/docs/getting-started) and [supertest](https://www.npmjs.com/package/supertest)
- Server is deployed to [Heroku](https://heroku.com)
- Mock data provided in `data.js`

## Requests
- `GET` request to retrieve the whole database
- `GET` request to retrieve a single element of the database
- `POST` request to add a new element
- `PATCH` request to add new features to an existing element
- `DELETE` request to delete an element

## Test

- Make sure you are in `server` directory.
- Run the test with `npm run test`
- Check test coverage with `npm run cov`
- 100% coverage
- Press "q" to exit testing

