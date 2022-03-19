import request from 'supertest';

import { appServer, server, routerPrefix } from '../app';
import { UserController } from '../apiServices/auth/auth.controller';

beforeAll(() => {
	const userController = new UserController();
	userController.registerUser('admin@admin.com', '1234')
})

describe('Suite of test teams', () => {
	test('should return the team of the given user', async () => {
		let team = [{name: 'Charizard'}, {name: 'Blastoise'}, {name: 'Picachu'}];
		const responseLogin = await request(appServer)
		.post(`${routerPrefix}/auth/login`)
		.set('Accept', 'application/json')
		.send({email: 'admin@admin.com', password: '1234'});
		let token = responseLogin.body.token;
		expect(responseLogin.statusCode).toBe(200);
		const responsePutTeam = await request(appServer)
		.put(`${routerPrefix}/teams`)
		.set('Authorization', `JWT ${token}`)
		.send({ team: team });
		expect(responsePutTeam.statusCode).toBe(200);
		const responseGetTeam = await request(appServer)
		.get(`${routerPrefix}/teams`)
		.set('Authorization', `JWT ${token}`);
		expect(responseGetTeam.statusCode).toBe(200);
		expect(responseGetTeam.body.trainer).toContain('admin@admin.com');
		expect(responseGetTeam.body.team.length).toBe(team.length);
		expect(responseGetTeam.body.team[0].name).toContain(team[0].name);
		expect(responseGetTeam.body.team[1].name).toContain(team[1].name);
	})
})

afterAll(() => {
	server.close();
})
