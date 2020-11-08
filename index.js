const express = require('express')
const app = express()
const port = 3000
const request = require('request-promise')

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lab3'
})

connection.connect()

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//     if (err) throw err
//
//     console.log('The solution is: ', rows[0].solution)
// })

app.get('/weather/city', (req, res) => { //q?Moscow
    const options = {
        method: 'GET',
        uri: `https://api.openweathermap.org/data/2.5/forecast?cnt=1&units=metric&q=${req.query.q}&APPID=32b02a634c5c7d86825705458b818411`
    }

    request(options)
        .then(function (response) {
            res.send(response)
        })
        .catch(function (err) {
            res.status(500).send({ error: 'Something failed!' });
        })
})

app.get('/weather/coordinates', (req, res) => {
    const options = {
        method: 'GET',
        uri: `https://api.openweathermap.org/data/2.5/forecast?cnt=1&units=metric&lat=${req.query.lat}&lon=${req.query.lon}&APPID=32b02a634c5c7d86825705458b818411`
    }

    request(options)
        .then(function (response) {
            res.send(response)
        })
        .catch(function (err) {
            res.status(500).send({ error: 'Something failed!' });
        })
})

// //db
// app.get('/favourites', (request, response) => {
//     //getAll
// })
// app.post('/favourites', (request, response) => {
//     //addNew
// })
// app.delete('/favourites', (request, response) => {
//     //delete
// })

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})