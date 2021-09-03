const fetchForecast = async function(location) {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WS_API_KEY + '&query=' + location
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
        displayError(JSON.parse(error).error.type)
    }
}

const displayForecast = async function(userInput) {
    showLoading()
    if (userInput.length < 2) {
        return displayError('Missing location')
    }
    let data = await fetchForecast(userInput);
    if (data.hasOwnProperty('error')) {
        console.log(data);
        displayError(data.error.type)
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

    console.log(data)
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

const displayError = function(error) {
    document.querySelector('.empty-container > p').innerHTML = 'Unable to find location. <br> Error: ' + error
}

const showLoading = function() {
    let html = `<p>Loading...</p>`
    document.querySelector('.empty-container').innerHTML += html;
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