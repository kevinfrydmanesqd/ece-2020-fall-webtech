const should = require('should');
const app = require('../app');
const db = require('../db_config');
const request = require('supertest');
const {getUTCFromNow} = require('../app/services/utils');

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

	it('create new channel body missing', async () => {
		await request(app)
			.post('/api/v1/channels')
			.expect(400, {message: 'Le nom est obligatoire.'});
	});

	it('create new channel name missing', async () => {
		await request(app)
			.post('/api/v1/channels')
			.send({name: ''})
			.expect(400, {message: 'Le nom est obligatoire.'});
	});

	it('create new channel', async () => {
		const {body} = await request(app)
			.post('/api/v1/channels')
			.send({name: 'channel 1'})
			.expect(201);

		body.should.match({
			id: /^\w+-\w+-\w+-\w+-\w+$/, //on utilise une regex pour dire que notre id correspond bien à un uui
			name: 'channel 1',
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

	it('show channel who does not exist', async () => {
		// Create a channel
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Ensure we list the channels correctly
		await request(app)
			.get('/api/v1/channels/1234')
			.expect(404, {
				message: 'resource_not_found',
			});
	});

	it('update channel request body missing', async () => {
		// Create a channel
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Ensure we list the channels correctly
		await request(app)
			.put('/api/v1/channels/123')
			.expect(400, {
				message: 'Le nom est obligatoire.',
			});
	});

	it('update channel request name missing', async () => {
		// Create a channel
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Ensure we list the channels correctly
		await request(app)
			.put('/api/v1/channels/123')
			.send({name: ''})
			.expect(400, {
				message: 'Le nom est obligatoire.',
			});
	});

	it('update channel channel does not exist', async () => {
		// Create a channel
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Ensure we list the channels correctly
		await request(app)
			.put('/api/v1/channels/1234')
			.send({name: 'new_name'})
			.expect(404, {
				message: 'resource_not_found',
			});
	});

	it('update channel', async () => {
		// Create a channel
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Ensure we list the channels correctly
		await request(app)
			.put('/api/v1/channels/123')
			.send({name: 'new_name'})
			.expect(200, {
				id: '123',
				name: 'new_name',
			});
	});

	it('delete channel who does not exist', async () => {
		// Create a channel
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Ensure we list the channels correctly
		await request(app)
			.delete('/api/v1/channels/1234')
			.expect(404, {
				message: 'resource_not_found',
			});
	});

	it('delete channel without messages', async () => {
		// Create a channel
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		// Ensure we list the channels correctly
		await request(app)
			.delete('/api/v1/channels/123')
			.expect(204);
	});

	it('delete channel with messages', async () => {
		// Create a channel
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		const message1 = {
			id: '1234',
			content: 'name',
			created_at: getUTCFromNow(),
		};
		await db.put(`channels:${channel.id}:messages:${message1.id}`, JSON.stringify(message1));
		await db.put(`messages:${message1.id}`, JSON.stringify({
			id: message1.id,
			channel_id: '123',
		}));

		const message2 = {
			id: '12345',
			content: 'name',
			created_at: getUTCFromNow(),
		};
		await db.put(`channels:${channel.id}:messages:${message2.id}`, JSON.stringify(message2));
		await db.put(`messages:${message2.id}`, JSON.stringify({
			id: message2.id,
			channel_id: '123',
		}));

		const message3 = {
			id: '123456',
			content: 'name',
			created_at: getUTCFromNow(),
		};
		await db.put(`channels:${channel.id}:messages:${message3.id}`, JSON.stringify(message3));
		await db.put(`messages:${message3.id}`, JSON.stringify({
			id: message3.id,
			channel_id: '123',
		}));

		// Ensure we list the channels correctly
		await request(app)
			.delete('/api/v1/channels/123')
			.expect(204);

		//On va vérifier en requetant dans la db si ce qu'on a fait fonctionne vraiment ...
		//Dans l'idéal, il faut faire ça sur tous les tests !

		try {
			await db.get(`channels:${channel.id}`);
		} catch(err) {
			err.notFound.should.equal(true);
		}

		try {
			await db.get(`channels:${channel.id}:messages:${message1.id}`);
		} catch(err) {
			err.notFound.should.equal(true);
		}

		try {
			await db.get(`channels:${channel.id}:messages:${message2.id}`);
		} catch(err) {
			err.notFound.should.equal(true);
		}

		try {
			await db.get(`channels:${channel.id}:messages:${message3.id}`);
		} catch(err) {
			err.notFound.should.equal(true);
		}

		try {
			await db.get(`messages:${message1.id}`);
		} catch(err) {
			err.notFound.should.equal(true);
		}

		try {
			await db.get(`messages:${message2.id}`);
		} catch(err) {
			err.notFound.should.equal(true);
		}

		try {
			await db.get(`messages:${message3.id}`);
		} catch(err) {
			err.notFound.should.equal(true);
		}
	});

});
