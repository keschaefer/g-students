const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const queries = require('./queries')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

app.get('/', (req, res, next) => {
   queries.listAll().then(students => res.send(students))
})





app.use((req, res, next) => {
   res.status(404).json({ error: { message: 'data not found' }})
 })

app.use((err, req, res, next) => {
   const status = err.status || 500
   res.status(status).json({ error: err})
 })

const listener = () => `Listening on port ${port}!`
app.listen(port, listener)


module.exports = app


