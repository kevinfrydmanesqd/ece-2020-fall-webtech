
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('channels', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  it('list empty', async () => {
    // Return an empty channel list by default
    const {body: channels} = await supertest(app)
    .get('/channels')
    .expect(200)
    channels.should.eql([])
  })
  
  it('list one element', async () => {
    // Create a channel
    await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Ensure we list the channels correctly
    const {body: channels} = await supertest(app)
    .get('/channels')
    .expect(200)
    channels.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      // id: /^channels:\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1'
    }])
  })
  
  it('add one element', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    .expect(201)
    // Check its return value
    channel.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1'
    })
    // Check it was correctly inserted
    const {body: channels} = await supertest(app)
    .get('/channels')
    channels.length.should.eql(1)
  })
  
})
