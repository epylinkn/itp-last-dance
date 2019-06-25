//== Express setup
let port = process.env.PORT || 8000
let express = require('express')
let app = express()
let server = require('http')
  .createServer(app)
  .listen(port, function() {
    console.log('Server listening at port: ', port)
  })

app.use(express.static('public'))
app.use('/scripts', express.static(__dirname + '/node_modules/'))
