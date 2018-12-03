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

app.get('/:id', (req, res, next) => {
   queries.getById(req.params.id).then(student => res.send(student))
})

app.post('/', (req, res, next) => {
   queries.createStudent(req.body).then(student=> res.send(student[0]))
})

app.delete('/:id', (req, res, next) => {
   queries.deleteStudent(req.params.id).then(res.status(204).send({message: "done!"}))
})

app.put('/:id', (req, res, next) => {
   queries.updateStudent(req.params.id, req.body).then(data => res.send(data))
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


