// window.addEventListener('load', () => {  
//     if (document.cookie.length == 0) {
//         displayForecast('Leeds, United Kingdom')
//     } else {
//         let locations = getCookies()
//         console.log(locations)
//         locations.forEach((location) => {
//             if (location != '') {
//                 displayForecast(location)
//             }
//         })
//     }
// })

const removeLocation = function() {
    document.getElementById('root').removeChild(window.event.target.parentElement.parentElement)
    createAddContainer()
}

const createAddContainer = function() {
    const root = document.getElementById('root')
    const last = root.children.length-1

    if (root.childElementCount < 3 && root.children[last].className !== 'empty-container') {
        let html = `
            <div class="empty-container">
                <img class="plus-icon" src="../images/add-location.svg" onclick="showInputBox()" alt="Add location icon"></img>
                <h4>Add location</h4>
                <input type="search" id="search-box" name="location-search" maxlength="50">
                <p> </p>
            </div>`
            
        root.children[last].insertAdjacentHTML('afterend', html)
    }
}

const showInputBox = function() {
    document.querySelector('.empty-container > h4').style.display = 'none'
    
    let searchbox = document.getElementById('search-box')
    searchbox.style.opacity = '1'
    searchbox.focus()
    
    let icon = document.querySelector('.plus-icon')
    icon.src = "../images/add-location-submit.svg"
    icon.addEventListener('click', () => displayForecast(searchbox.value.trim()))
}

const showOnMouseEnter = function() {
    window.event.target.children[0].style.opacity = '1'
}

const hideOnMouseLeave = function() {
    window.event.target.children[0].style.opacity = '0'
}

const showLocationDetails = function() {
    let details_container = window.event.target.parentElement
    details_container.classList.toggle('slideup')
    details_container.children[0].classList.toggle('rotate180')
    
    let container = details_container.parentElement.children[0]
    container.classList.toggle('slidedown')
}

// window.addEventListener("beforeunload", () => {
//     let containers = document.getElementsByClassName('container')
//     let cName = ''
//     if (containers != null) {
//         l = containers.length;
//         for (i = 0; i < l; i++) {
//             cName = 'location-' + (i + 1)
//             cValue = containers[i].querySelector('h2').innerHTML
//             setCookie(cName, cValue, 14)
//         }
//     } else {
//         delCookies()
//     }
// })