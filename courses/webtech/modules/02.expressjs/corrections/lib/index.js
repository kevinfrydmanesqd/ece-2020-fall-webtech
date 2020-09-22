const express = require('express')
const app = express()
const config = {
  port: 3000
}
const db = {
  channels: [{
    id: '1',
    name: 'Channel 1',
  },{
    id: '2',
    name: 'Channel 2',
  },{
    id: '3',
    name: 'Channel 3',
  }]
}

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>',
    '<p><a href="/channels">channels</a></p>'
  ].join(''))
})

app.get('/channels', (req, res) => {
  html = [
    '<h1>Channels</h1>',
    '<ul>',
    ...db.channels.map( channel => `<li><a href="/channel/${channel.id}">${channel.name}</a></li>`),
    '</ul>',
  ].join('')
  res.send(html)
})

app.get('/channel/:id', (req, res) => {
  res.send([
    '<h1>',
    db.channels.find( channel => channel.id === req.params.id ).name,
    '</h1>',
  ].join(''))
})

app.listen(config.port, () => {
  console.log(`Chat is waiting for you at http://localhost:${config.port}`)
})
