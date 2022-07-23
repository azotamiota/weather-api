const root = "https://weather-api-backend-only.herokuapp.com"
const localRoot = 'http://localhost:5000'
const mainGrid = document.getElementById('main-grid')

const fetchInitialData = () => {

    mainGrid.textContent = 'Loading...'

    fetch(root)
        .then(res => res.json())
        .then(data => {
            displayData(data)
        }).catch(err => {
            mainGrid.textContent = 'Error while fetching data, try again later.';
            console.log(err)
        })
}

fetchInitialData()

const displayData = (data) => {
    mainGrid.textContent = '';

    for (let elem in data) {
        console.log('data[elem]: ', data[elem])
        const createGridElement = document.createElement('div')
        createGridElement.setAttribute('id', `grid-elem-${elem}`)
        mainGrid.appendChild(createGridElement)
        const gridElem = document.querySelector(`#grid-elem-${elem}`)
        gridElem.setAttribute('class', 'grid-elem')
        const createCity = document.createElement('h3')
        gridElem.appendChild(createCity)
        createCity.textContent = data[elem]['city']
        const createTemp = document.createElement('h4')
        gridElem.appendChild(createTemp)
        createTemp.textContent = `Celsius: ${data[elem]['Celsius']}, Fahrenheit: ${data[elem]['Fahrenheit']}`
        const createAddons = document.createElement('h5')
        gridElem.appendChild(createAddons)
        createAddons.textContent = (data[elem]['wind'] ? 'windy' : '') + (data[elem]['rain'] ? ' rainy' : '')

        // const checkedValue = document.querySelector('.messageCheckbox:checked').value; // later to check checkboxes if checked
    }

}
