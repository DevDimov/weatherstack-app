const toFahrenheit = function() {
    let temperature = window.event.target;
    let len = temperature.innerHTML.length
    let tempC = Number(temperature.innerHTML.substring(0, len-1))
    let tempF = ((tempC * 9/5) + 32).toFixed(0)
    temperature.innerHTML = tempF + '°F'
    temperature.onclick = toCelcius
}

const toCelcius = function() {
    let temperature = window.event.target;
    let len = temperature.innerHTML.length
    let tempF = Number(temperature.innerHTML.substring(0, len-2))
    let tempC = ((tempF - 32) * 5/9).toFixed(0)
    temperature.innerHTML = tempC + '°'
    temperature.onclick = toFahrenheit
}

const toMilesPerHour = function() {
    let speed = window.event.target;
    let len = speed.innerHTML.length
    let speedKMH = Number(speed.innerHTML.substring(0, len-4))
    let speedMPH = (speedKMH / 1.609).toFixed(0)
    speed.innerHTML = speedMPH + ' mph'
    speed.onclick = toKilometersPerHour
}

const toKilometersPerHour = function() {
    let speed = window.event.target;
    let len = speed.innerHTML.length
    let speedMPH = Number(speed.innerHTML.substring(0, len-4))
    let speedKMH = (speedMPH * 1.609).toFixed(0)
    speed.innerHTML = speedKMH + ' kmh'
    speed.onclick = toMilesPerHour
}