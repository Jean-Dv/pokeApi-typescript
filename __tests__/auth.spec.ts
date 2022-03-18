import request from 'supertest';

import { appServer, server, routerPrefix } from '../app';
import { UserController } from '../apiServices/auth/auth.controller';

beforeAll(() => {
	registerUser('admin@admin.com', '1234')
})

afterAll(() => {
	server.close();
}) 
describe(`POST ${routerPrefix}`, () => {
	test('should return 401 when no jwt token available', async () => {
		const res = await request(appServer)
		.get(`${routerPrefix}/teams`);
		expect(res.statusCode).toBe(401);
	})
	test('should return 400 when no data is provided', async () => {
		const res = await request(appServer)
		.post(`${routerPrefix}/auth/login`)
		.send();
		expect(res.statusCode).toBe(400);
	})
	test('should return 200 and token for successfull login', async () => {
		const res = await request(appServer)
		.post(`${routerPrefix}/auth/login`)
		.set('Accept', 'application/json')
		.send({email: 'admin@admin.com', password: '1234'});
		expect(res.statusCode).toBe(200);
		expect(res.body.token).toBeDefined();
	})
})

