
const supertest = require('supertest')
const app = require('../lib/app')

describe('messages', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  it.skip('list empty', async () => {
    // Create a channel
    await supertest(app)
    .post('/channel')
    .send({name: 'channel 1'})
    // Get messages
    const {body: messages} = await supertest(app)
    .get('/channel/1/messages')
    .expect(200)
    messages.should.match([])
  })
  
  it.skip('list one message', async () => {
    // Create a channel
    await supertest(app)
    .post('/channel')
    .send({name: 'channel 1'})
    // and a message inside it
    await supertest(app)
    .post('/channel/1/messages')
    .send({content: 'Hello ECE'})
    // Get messages
    const {body: messages} = await supertest(app)
    .get('/channel/1/messages')
    .expect(200)
    messages.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      content: 'Hello ECE'
    }])
  })
  
  it.skip('add one element', async () => {
    // Create a channel
    await supertest(app)
    .post('/channel')
    .send({name: 'channel 1'})
    // Create a message inside it
    const {body: message} = await supertest(app)
    .post('/channel/1/messages')
    .send({content: 'Hello ECE'})
    .expect(201)
    message.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      content: 'Hello ECE'
    })
    // Check it was correctly inserted
    const {body: messages} = await supertest(app)
    .get('/channel/1/messages')
    messages.length.should.eql(1)
  })
  
})
