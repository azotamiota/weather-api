const root = "http://localhost:5000"
const mainGrid = document.getElementById('main-grid')

const fetchInitialData = () => {

    // mainGrid.textContent = 'Loading...'

    fetch(root)
        .then(res => res.json())
        .then(data => {
            displayData(data)
        }).catch(err => {
            // mainGrid.textContent = 'Error while fetching data, try again later.';
            console.log(err)
        })
}

fetchInitialData()

const displayData = (data) => {
    
    // createCity.setAttribute('class', 'grid-elem')
    
    const createAddons = document.createElement('h5')
    // mainGrid.textContent = '';

    for (let elem in data) {
        console.log('data[elem]: ', data[elem])
        const createGridElement = document.createElement('div')
        createGridElement.setAttribute('id', `grid-elem-${elem}`)
        mainGrid.appendChild(createGridElement)
        const gridElem = document.querySelector(`#grid-elem-${elem}`)
        const createCity = document.createElement('h3')
        gridElem.appendChild(createCity)
        createCity.textContent = data[elem]['city']
        const createTemp = document.createElement('h4')
        gridElem.append(createTemp)
        createTemp.textContent = `Celsius: ${data[elem]['Celsius']}, Fahrenheit: ${data[elem]['Fahrenheit']}`
    }

}
