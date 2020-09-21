
const db = require('./db')
const express = require('express')
const app = express()

app.use(require('body-parser').json())

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})

app.get('/channels', (req, res) => {
  const channels = db.channels.list()
  res.json(channels)
})

app.post('/channel', (req, res) => {
  const channel = db.channels.create(req.body)
  res.status(201).json(channel)
})

app.get('/channel/:id', (req, res) => {
  const channel = db.channels.get(req.body)
  res.json(channel)
})

app.put('/channel/:id', (req, res) => {
  const channel = db.channels.update(req.body)
  res.json(channel)
})

module.exports = app
