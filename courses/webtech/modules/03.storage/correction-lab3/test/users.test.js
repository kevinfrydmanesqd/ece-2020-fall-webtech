const app = require('../app');
const db = require('../db_config');
const request = require('supertest');

describe('user api tests', () => {
	beforeEach(async () => {
		await db.clear(); //on va clean la base de données
	});

	it('list empty', async () => {
		// Return an empty user list by default
		await request(app)
			.get('/api/v1/users')
			.expect(200, []);
	});

	it('list one element', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.get('/api/v1/users')
			.expect(200, [{
				id: '123',
				name: 'name',
			}]);
	});

	it('create new user body missing', async () => {
		await request(app)
			.post('/api/v1/users')
			.expect(400, {message: 'Le nom est obligatoire.'});
	});

	it('create new user name missing', async () => {
		await request(app)
			.post('/api/v1/users')
			.send({name: ''})
			.expect(400, {message: 'Le nom est obligatoire.'});
	});

	it('create new user email missing', async () => {
		await request(app)
			.post('/api/v1/users')
			.send({name: 'name', password: 'secret'})
			.expect(400, {message: 'L\'email est obligatoire.'});
	});

	it('create new user', async () => {
		const {body} = await request(app)
			.post('/api/v1/users')
			.send({name: 'user 1', email: 'test@test.com', password: 'secret'})
			.expect(201);

		body.should.match({
			id: /^\w+-\w+-\w+-\w+-\w+$/, //on utilise une regex pour dire que notre id correspond bien à un uui
			name: 'user 1',
			email: 'test@test.com',
			password: 'secret',
		});
	});

	it('show user', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.get('/api/v1/users/123')
			.expect(200, {
				id: '123',
				name: 'name',
			});
	});

	it('show user who does not exist', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.get('/api/v1/users/1234')
			.expect(404, {
				message: 'resource_not_found',
			});
	});

	it('update user request body missing', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.put('/api/v1/users/123')
			.expect(400, {
				message: 'Le nom est obligatoire.',
			});
	});

	it('update user request name missing', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.put('/api/v1/users/123')
			.send({name: ''})
			.expect(400, {
				message: 'Le nom est obligatoire.',
			});
	});

	it('update user user does not exist', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.put('/api/v1/users/1234')
			.send({name: 'new_name', password: 'new_secret'})
			.expect(404, {
				message: 'resource_not_found',
			});
	});

	it('update user', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
			email: 'test@test.com',
			password: 'secret',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.put('/api/v1/users/123')
			.send({name: 'new_name', password: 'new_secret'})
			.expect(200, {
				id: '123',
				name: 'new_name',
				email: 'test@test.com',
				password: 'new_secret',
			});
	});

	it('delete user who does not exist', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.delete('/api/v1/users/1234')
			.expect(404, {
				message: 'resource_not_found',
			});
	});

	it('delete user', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.delete('/api/v1/users/123')
			.expect(204);
	});
});
