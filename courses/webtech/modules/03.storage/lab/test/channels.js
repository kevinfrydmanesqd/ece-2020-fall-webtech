const app = require('../app');
const db = require('../db_config');
const request = require('supertest');

describe('channel api tests', () => {
	beforeEach(async () => {
		await db.clear(); //on va clean la base de données
	});

	it('list empty', async () => {
		// Return an empty channel list by default
		await request(app)
			.get('/api/v1/channels')
			.expect(200, []);
	});

	it('list one element', async () => {
		// Create a channel
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Ensure we list the channels correctly
		await request(app)
			.get('/api/v1/channels')
			.expect(200, [{
				id: '123',
				name: 'name',
			}]);
	});

	it('create new channel name not given', async () => {
		await request(app)
			.post('/api/v1/channels')
			.expect(400, {name: 'Name is required.'});
	});

	it('create new channel', async () => {
		const {body} = await request(app)
			.post('/api/v1/channels')
			.send({name: 'channel 1'})
			.expect(201);

		body.should.match({
			id: /^\w+-\w+-\w+-\w+-\w+$/, //on utilise une regex pour dire que notre id correspond bien à un uui
			name: 'channel 1'
		});
	});

	it('show channel', async () => {
		// Create a channel
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Ensure we list the channels correctly
		await request(app)
			.get('/api/v1/channels/123')
			.expect(200, {
				id: '123',
				name: 'name',
			});
	});

	//TODO show channel with id who does not exist

	//TODO update channel with all cases

	//TODO delete channel with all cases
});
