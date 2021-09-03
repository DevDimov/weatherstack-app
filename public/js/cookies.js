const setCookie = function(cName, cValue, expDays) {
    let date = new Date()
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000))
    const expires = "expires=" + date.toUTCString()
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/"
}

const delCookies = function() {
    let cName = ''
    for (i=1; i<=3; i++) {
        cName = 'location-' + i
        document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
    }
}

const getCookies = function() {
    const cDecoded = decodeURIComponent(document.cookie)
    const cArr = cDecoded.split('; ')
    let res = []
    cArr.forEach(cookie => {
        res.push(cookie.split('=')[1])
    })
    return res;
}