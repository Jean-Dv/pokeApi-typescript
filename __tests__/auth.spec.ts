import request from 'supertest';

import { appServer, server, routerPrefix } from '../app';
import { UserController } from '../apiServices/auth/auth.controller';
import { TeamsController } from '../apiServices/teams/teams.controller';
import { getUri, connect, closeDb } from '../services/mongoDb/index';

const userController = new UserController();
const teamsController = new TeamsController();

jest.mock('../apiServices/auth/auth.service');

beforeEach(async()=>{
	await userController.registerUser('admin@admin.com', '1234')
})

afterEach(async () => {
	await userController.cleanUpUsers();
	await teamsController.cleanUpTeam();
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
	test('should return 200 when jwt is valid', async () => {
		const res = await request(appServer)
		.post(`${routerPrefix}/auth/login`)
		.set('Accept', 'application/json')
		.send({email: 'admin@admin.com', password: '1234'});
		expect(res.statusCode).toBe(200);
		const resTeams = await request(appServer)
		.get(`${routerPrefix}/teams`)
		.set('Authorization', `JWT ${res.body.token}`)
		expect(resTeams.statusCode).toBe(200);
	})
})

afterAll(async () => {
	server.close();
	await closeDb();
}) 
