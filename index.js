const express = require('express')
const app = express()
const port = 3000
const request = require('request-promise')
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors())


var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lab3'
})

connection.connect();

app.get('/weather/city', (req, res) => {
    const options = {
        method: 'GET',
        uri: `https://api.openweathermap.org/data/2.5/forecast?cnt=1&units=metric&q=${req.query.q}&APPID=32b02a634c5c7d86825705458b818411`
    }

    request(options)
        .then(function (response) {
            res.send(response)
        })
        .catch(function (err) {
            res.status(500).send({error: 'Something failed!'});
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
            res.status(500).send({error: 'Something failed!'});
        })
})

// //db
app.get('/favourites', (request, response) => {
    connection.query('SELECT name from favourites', function (err, rows, fields) {
        if (err) throw err
        response.json(rows);
    })
})

app.post('/favourites', (request, response) => {
    connection.query(`insert into favourites(name) values('${request.body.name}')`, function (err, rows, fields) {
        if (err) {
            response.status(500).send();
        } else {
            console.log('insertID: ', rows.insertId)
            response.status(201).send(rows);
        }
    })
})

app.delete('/favourites', (request, response) => {
    connection.query(`delete from favourites where name='${request.body.name}'`, function (err, rows, fields) {
        if (err) throw err
        response.status(201).send();
    })
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})