// https://mochajs.org/
const supertest = require('supertest') //supertest : https://github.com/visionmedia/supertest
const app = require('../lib/app') //on a  besoin d'avoir nos routes pour les appeler durant les tests
const db = require('../lib/db')

describe('channels', () => {
  //Avant chaque test, on va clean la base de données afin de ne pas gener les tests
  beforeEach( async () => {
    await db.admin.clear()
  })

  it('list empty', async () => {
    // Return an empty channel list by default
    const {body: channels} = await supertest(app)
    .get('/channels')
    .expect(200)
    channels.should.match([]) //Ce test par définition doit nous retourner "rien" -> tableau vide
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
