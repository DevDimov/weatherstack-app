const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 8080

const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
  res.sendFile(publicDirPath + '/html/index.html')
});

app.use(express.static(publicDirPath, {extensions: ['html', 'css', 'js', 'svg']}))

app.use(function(req, res) {
    res.status(404).sendFile(publicDirPath + '/html/404.html');
  });

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})