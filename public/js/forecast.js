const fetchForecast = async function(location) {
    // const WS_URL = 'http://localhost:3000/api/search?q='
    const WS_URL = 'https://weatherstack-app.herokuapp.com/api/search&q='

    const url = WS_URL + location
    try {
        let response = await fetch(url)
        let data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        showError(JSON.parse(error).error.type)
    }
}

const displayForecast = async function(userInput) {
    if (userInput.length < 2) {
        return showError('Missing location')
    }
    showStatus('Loading...')
    let data = await fetchForecast(userInput);

    if (data.hasOwnProperty('error')) {
        console.log(data)
        showError(data.error.type)
        return
    }

    const observation = data.current.weather_descriptions.join('. ')
    const iconPath = await fetchIcon(observation)

    let html = 
        `<div class="container">
            <div class="content slidedown" onmouseenter="showOnMouseEnter()" onmouseleave="hideOnMouseLeave()">
                <img id="cross" onclick="removeLocation()" src="../images/cross.svg"></img>
                <h2>${data.location.name}</h2>
                <div class="flex-row">
                    <h1 onclick="toFahrenheit()">${data.current.temperature}°</h1>
                    <img class="weather-icon" src="${iconPath}" alt="Weather icon"></img>
                </div>
                <h3>${observation}</h3>
            </div>
            <div class="details-container">
                <img id="chevron" src="../images/chevron.svg" onclick="showLocationDetails()"></img>
                <div>
                    <span>Last updated</span>
                    <span>${data.current.observation_time}</span>
                </div>
                <div>
                    <span>Temperature feels like</span>
                    <span id="feelslike" onclick="toFahrenheit()">${data.current.feelslike}°</span>
                </div>
                <div>
                    <span>Chance of rain</span>
                    <span>${data.current.precip}%</span>
                </div>
                <div>
                    <span>Wind speed</span>
                    <span id="wind-speed" onclick="toMilesPerHour()">${data.current.wind_speed} kmh</span>
                </div>
                <div>
                    <span>Cloud cover</span>
                    <span>${data.current.cloudcover}%</span>
                </div>
                <div>
                    <span>UV index</span>
                    <span>${data.current.uv_index}</span>
                </div>
            </div>
        </div>`

    insertHTML(html)
    createAddContainer()
}

const insertHTML = function(html) {
    const emptyContainer = document.querySelector('.empty-container')
    emptyContainer.insertAdjacentHTML('beforebegin', html)

    const root = document.querySelector('#root')
    root.removeChild(emptyContainer)
    if (root.childElementCount < 3) {
        createAddContainer()
    }
}

const showError = function(error) {
    document.querySelector('.empty-container > p').innerHTML = 'Unable to find location. <br> Error: ' + error
}

const showStatus = function(status) {
    document.querySelector('.empty-container > p').innerHTML = status
}

const fetchIcon = async function(str) {
    if (/[Rr]ain/.test(str) || /[Ss]hower/.test(str)) {
        return '../images/rain-cloud.svg'
    }
    if (/[Cc]loud/.test(str) && !/[Rr]ain/.test(str) && !/[Ss]un/.test(str)) {
        return '../images/cloud.svg'
    }
    if (/[Ss]un/.test(str) && !/[Cc]loud/.test(str)) {
        return '../images/sunshine.svg'
    }
    if (/[Ss]un/.test(str) && /[Cc]loud/.test(str)) {
        return '../images/sunny-cloud.svg'
    }
    return '../images/cloud.svg'
}