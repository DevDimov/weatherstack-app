require('dotenv').config({path: 'config/.env'})
const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8080

const publicDirPath = path.join(__dirname, '../public')
app.use(cors())
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
  res.sendFile(publicDirPath + '/html/index.html')
});

app.use(express.static(publicDirPath, {extensions: ['html', 'css', 'js', 'svg']}))

app.get("/api/search", async (req, res) => {
    try {
        const location = req.query.q
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${process.env.WS_API_KEY}&query=${location}`)
        const data = await response.json()
        return res.status(200).json(data)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err.message)
    }
})

app.use(function(req, res) {
    res.status(404).sendFile(publicDirPath + '/html/404.html');
});

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})