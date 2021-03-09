const app = require('../app');
const db = require('../db_config');
const request = require('supertest');
const {getUTCFromNow} = require('../app/services/utils');

describe('message api tests', () => {
	beforeEach(async () => {
		await db.clear(); //on va clean la base de données
	});

	it('list channel does not exist', async () => {
		await request(app)
			.get('/api/v1/channels/123/messages')
			.expect(404, {
				message: 'resource_not_found',
			});
	});

	it('list empty', async () => {
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Return an empty message list by default
		await request(app)
			.get('/api/v1/channels/123/messages')
			.expect(200, []);
	});

	it('list one element', async () => {
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Create a message
		const message = {
			id: '1234',
			content: 'content',
			created_at: getUTCFromNow(),
		};
		await db.put(`channels:${channel.id}:messages:${message.id}`, JSON.stringify(message));

		// Ensure we list the messages correctly
		await request(app)
			.get('/api/v1/channels/123/messages')
			.expect(200, [{
				id: '1234',
				content: 'content',
				created_at: getUTCFromNow(),
			}]);
	});

	it('create new message body missing', async () => {
		await request(app)
			.post('/api/v1/messages')
			.expect(400, {message: 'Le contenu du message est obligatoire.'});
	});

	it('create new message content missing', async () => {
		await request(app)
			.post('/api/v1/messages')
			.send({content: ''})
			.expect(400, {message: 'Le contenu du message est obligatoire.'});
	});

	it('create new message channel Id missing', async () => {
		await request(app)
			.post('/api/v1/messages')
			.send({content: 'the message blabla', channel_id: ''})
			.expect(400, {message: 'Un message doit etre associé à un channel.'});
	});

	it('create new message channel Id wrong', async () => {
		await request(app)
			.post('/api/v1/messages')
			.send({content: 'the message blabla', channel_id: '123456789'})
			.expect(404, {message: 'resource_not_found'});
	});

	it('create new message', async () => {
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		const {body} = await request(app)
			.post('/api/v1/messages')
			.send({content: 'the message blabla', channel_id: '123'})
			.expect(201);

		//À cause de la date (qui ne sont pas égaux), on va valider champ par champ

		body.id.should.match(/^\w+-\w+-\w+-\w+-\w+$/);
		body.content.should.equal('the message blabla');

		body.created_at.should.be.approximately(getUTCFromNow(), 1000);
	});

	it('update message body missing', async () => {
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Create a message
		const message = {
			id: '1234',
			content: 'name',
			created_at: getUTCFromNow(),
		};
		await db.put(`channels:${channel.id}:messages:${message.id}`, JSON.stringify(message));
		await db.put(`messages:${message.id}`, JSON.stringify({
			id: '1234',
			channel_id: '123',
		}));

		await request(app)
			.put('/api/v1/messages/1234')
			.expect(400, {
				message: 'Le contenu du message est obligatoire.',
			});
	});

	it('update message content missing', async () => {
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Create a message
		const message = {
			id: '1234',
			content: 'name',
			created_at: getUTCFromNow(),
		};
		await db.put(`channels:${channel.id}:messages:${message.id}`, JSON.stringify(message));
		await db.put(`messages:${message.id}`, JSON.stringify({
			id: '1234',
			channel_id: '123',
		}));

		await request(app)
			.put('/api/v1/messages/1234')
			.send({content: ''})
			.expect(400, {
				message: 'Le contenu du message est obligatoire.',
			});
	});

	it('update message message does not exist', async () => {
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Create a message
		const message = {
			id: '1234',
			content: 'name',
			created_at: getUTCFromNow(),
		};
		await db.put(`channels:${channel.id}:messages:${message.id}`, JSON.stringify(message));
		await db.put(`messages:${message.id}`, JSON.stringify({
			id: '1234',
			channel_id: '123',
		}));

		await request(app)
			.put('/api/v1/messages/123')
			.send({content: 'update_message'})
			.expect(404, {
				message: 'resource_not_found',
			});
	});

	it('update message', async () => {
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Create a message
		const message = {
			id: '1234',
			content: 'name',
			created_at: getUTCFromNow(),
		};
		await db.put(`channels:${channel.id}:messages:${message.id}`, JSON.stringify(message));
		await db.put(`messages:${message.id}`, JSON.stringify({
			id: '1234',
			channel_id: '123',
		}));

		await request(app)
			.put('/api/v1/messages/1234')
			.send({content: 'update_message'})
			.expect(200, {
				id: '1234',
				content: 'update_message',
				created_at: getUTCFromNow(),
			});
	});

	it('delete message who does not exist', async () => {
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Create a message
		const message = {
			id: '1234',
			content: 'name',
			created_at: getUTCFromNow(),
		};
		await db.put(`channels:${channel.id}:messages:${message.id}`, JSON.stringify(message));
		await db.put(`messages:${message.id}`, JSON.stringify({
			id: '1234',
			channel_id: '123',
		}));

		await request(app)
			.delete('/api/v1/messages/123')
			.send({content: 'update_message'})
			.expect(404, {
				message: 'resource_not_found',
			});
	});

	it('delete message', async () => {
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Create a message
		const message = {
			id: '1234',
			content: 'name',
			created_at: getUTCFromNow(),
		};
		await db.put(`channels:${channel.id}:messages:${message.id}`, JSON.stringify(message));
		await db.put(`messages:${message.id}`, JSON.stringify({
			id: '1234',
			channel_id: '123',
		}));

		await request(app)
			.delete('/api/v1/messages/1234')
			.send({content: 'update_message'})
			.expect(204);
	});
});
