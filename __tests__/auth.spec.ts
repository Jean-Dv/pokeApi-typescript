import request from 'supertest';

import { appServer, server, routerPrefix } from '../app';

afterAll(() => {
	server.close();
}) 
describe(`POST ${routerPrefix}`, () => {
	test('should return 401 when no jwt token available', async () => {
		const res = await request(appServer)
		.get(`${routerPrefix}/teams`);
		expect(res.statusCode).toBe(401);
	})
})

