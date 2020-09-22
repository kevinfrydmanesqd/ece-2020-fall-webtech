
const supertest = require('supertest')
const app = require('../lib/app')

describe('users', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  it.skip('list empty', async () => {
    // Return an empty user list by default
    const {body: users} = await supertest(app)
    .get('/users')
    .expect(200)
    users.should.match([])
  })
  
  it.skip('list one element', async () => {
    // Create a user
    await supertest(app)
    .post('/channel')
    .send({username: 'user_1'})
    // Ensure we list the users correctly
    const {body: users} = await supertest(app)
    .get('/users')
    .expect(200)
    users.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      username: 'user_1'
    }])
  })
  
  it.skip('add one element', async () => {
    // Create a user
    const {body: user} = await supertest(app)
    .post('/channel')
    .send({username: 'user_1'})
    .expect(201)
    // Check its return value
    // Check it was correctly inserted
    const {body: users} = await supertest(app)
    .get('/users')
    users.length.should.eql(1)
  })
  
})
